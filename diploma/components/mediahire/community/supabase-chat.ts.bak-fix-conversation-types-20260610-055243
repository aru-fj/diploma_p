import { supabase } from "@/lib/supabase-client";
import type { Conversation, ChatMessage } from "./community-data";

type ProfileRow = {
  id?: string | null;
  user_id?: string | null;
  public_slug?: string | null;
  full_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
  role?: string | null;
};

type ConversationRow = {
  id: string;
  participant_a: string;
  participant_b: string;
  participant_a_role?: string | null;
  participant_b_role?: string | null;
  participant_a_profile_slug?: string | null;
  participant_b_profile_slug?: string | null;
  participant_a_name?: string | null;
  participant_b_name?: string | null;
  participant_a_avatar?: string | null;
  participant_b_avatar?: string | null;
  subject_type?: string | null;
  subject_id?: string | null;
  subject_title?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type MessageRow = {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  body: string;
  read_at?: string | null;
  created_at?: string | null;
};

function getProfileName(profile?: ProfileRow | null) {
  if (!profile) return "MediaHire user";

  return (
    profile.full_name ||
    [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
    profile.email?.split("@")[0] ||
    "MediaHire user"
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatTime(value?: string | null) {
  if (!value) return "Now";

  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

function orderedParticipants(firstId: string, secondId: string) {
  return [firstId, secondId].sort();
}

async function getCurrentAuthUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

async function findProfileBy(field: string, value?: string | null) {
  if (!value) return null;

  const { data } = await supabase
    .from("profiles")
    .select(
      "id,user_id,public_slug,full_name,first_name,last_name,email,avatar_url,role",
    )
    .eq(field, value)
    .maybeSingle();

  return (data || null) as ProfileRow | null;
}

async function findCurrentProfile() {
  const user = await getCurrentAuthUser();

  if (!user) return null;

  return (
    (await findProfileBy("user_id", user.id)) ||
    (await findProfileBy("id", user.id)) ||
    (await findProfileBy("email", user.email || ""))
  );
}

export async function findProfileByPublicSlug(slug: string) {
  return (
    (await findProfileBy("public_slug", slug)) ||
    (await findProfileBy("user_id", slug)) ||
    (await findProfileBy("id", slug))
  );
}

export async function startSupabaseConversationWithProfile(
  targetSlug: string,
  options?: {
    subjectType?: "profile" | "project";
    subjectId?: string;
    subjectTitle?: string;
  },
) {
  const user = await getCurrentAuthUser();
  const currentProfile = await findCurrentProfile();
  const targetProfile = await findProfileByPublicSlug(targetSlug);

  if (!user || !currentProfile || !targetProfile?.user_id) {
    return null;
  }

  if (targetProfile.user_id === user.id) {
    return null;
  }

  const [participantA, participantB] = orderedParticipants(user.id, targetProfile.user_id);

  const participantAProfile =
    participantA === user.id ? currentProfile : targetProfile;
  const participantBProfile =
    participantB === user.id ? currentProfile : targetProfile;

  const existing = await supabase
    .from("mediahire_conversations")
    .select("*")
    .eq("participant_a", participantA)
    .eq("participant_b", participantB)
    .maybeSingle();

  if (existing.data) {
    return existing.data as ConversationRow;
  }

  const { data, error } = await supabase
    .from("mediahire_conversations")
    .insert({
      participant_a: participantA,
      participant_b: participantB,
      participant_a_role: participantAProfile.role || "jobseeker",
      participant_b_role: participantBProfile.role || "jobseeker",
      participant_a_profile_slug:
        participantAProfile.public_slug || participantAProfile.user_id,
      participant_b_profile_slug:
        participantBProfile.public_slug || participantBProfile.user_id,
      participant_a_name: getProfileName(participantAProfile),
      participant_b_name: getProfileName(participantBProfile),
      participant_a_avatar: participantAProfile.avatar_url,
      participant_b_avatar: participantBProfile.avatar_url,
      subject_type: options?.subjectType || "profile",
      subject_id: options?.subjectId || targetSlug,
      subject_title: options?.subjectTitle || null,
      updated_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) {
    console.error("Could not create MediaHire conversation:", error);
    return null;
  }

  return data as ConversationRow;
}

export async function loadSupabaseConversationsForCurrentUser(
  role: "jobseeker" | "employer",
): Promise<Conversation[]> {
  const user = await getCurrentAuthUser();

  if (!user) return [];

  const { data: conversationRows, error } = await supabase
    .from("mediahire_conversations")
    .select("*")
    .or(`participant_a.eq.${user.id},participant_b.eq.${user.id}`)
    .order("updated_at", { ascending: false });

  if (error || !conversationRows?.length) {
    if (error) console.error("Could not load MediaHire conversations:", error);
    return [];
  }

  const conversationIds = conversationRows.map((item) => item.id);

  const { data: messageRows } = await supabase
    .from("mediahire_messages")
    .select("*")
    .in("conversation_id", conversationIds)
    .order("created_at", { ascending: true });

  const messagesByConversation = new Map<string, MessageRow[]>();

  ((messageRows || []) as MessageRow[]).forEach((message) => {
    const current = messagesByConversation.get(message.conversation_id) || [];
    current.push(message);
    messagesByConversation.set(message.conversation_id, current);
  });

  return (conversationRows as ConversationRow[]).map((conversation) => {
    const currentIsA = conversation.participant_a === user.id;
    const otherId = currentIsA ? conversation.participant_b : conversation.participant_a;

    const otherName = currentIsA
      ? conversation.participant_b_name || "MediaHire user"
      : conversation.participant_a_name || "MediaHire user";

    const otherAvatar = currentIsA
      ? conversation.participant_b_avatar || undefined
      : conversation.participant_a_avatar || undefined;

    const otherSlug = currentIsA
      ? conversation.participant_b_profile_slug || otherId
      : conversation.participant_a_profile_slug || otherId;

    const rows = messagesByConversation.get(conversation.id) || [];
    const last = rows.at(-1);

    const messages = rows.map(
      (message): ChatMessage => ({
        id: message.id,
        sender: message.sender_id === user.id ? "me" : "contact",
        text: message.body,
        time: formatTime(message.created_at),
        type: "text",
      }),
    );

    const unread = rows.filter(
      (message) => message.receiver_id === user.id && !message.read_at,
    ).length;

    return {
      avatar: otherAvatar,
      color: "bg-blue-50 text-blue-700",
      id: conversation.id,
      initials: getInitials(otherName),
      lastSeen: "Online",
      messages,
      name: otherName,
      participantType: "person" as const,
      preview: last?.body || "Start the conversation.",
      profileHref:
        role === "employer"
          ? `/home/employer/people/${otherSlug}`
          : `/home/jobseeker/people/${otherSlug}`,
      time: last ? formatTime(last.created_at) : "Now",
      unread,
    };
  });
}

export async function sendSupabaseMessage(conversationId: string, body: string) {
  const user = await getCurrentAuthUser();

  if (!user || !body.trim()) return null;

  const { data: conversation } = await supabase
    .from("mediahire_conversations")
    .select("*")
    .eq("id", conversationId)
    .maybeSingle();

  const row = conversation as ConversationRow | null;

  if (!row) return null;

  const receiverId =
    row.participant_a === user.id ? row.participant_b : row.participant_a;

  const { data, error } = await supabase
    .from("mediahire_messages")
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      receiver_id: receiverId,
      body: body.trim(),
    })
    .select("*")
    .single();

  await supabase
    .from("mediahire_conversations")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  if (error) {
    console.error("Could not send MediaHire message:", error);
    return null;
  }

  return data as MessageRow;
}

export async function markSupabaseConversationRead(conversationId: string) {
  const user = await getCurrentAuthUser();

  if (!user) return;

  await supabase
    .from("mediahire_messages")
    .update({ read_at: new Date().toISOString() })
    .eq("conversation_id", conversationId)
    .eq("receiver_id", user.id)
    .is("read_at", null);
}
