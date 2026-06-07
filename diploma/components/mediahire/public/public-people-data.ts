import {
  getStoredJobSeekerProfile,
  type JobSeekerProfile,
} from "../account-settings/profile-store";
import { getResumeData, getSettings } from "../shared/user-state";

export type PublicPerson = {
    slug: string;
    name: string;
    role: string;
    category: string;
    location: string;
    experience: string;
    projectsCount: number;
    rating: number;
    availability: string;
    avatar: string;
    coverImage: string;
    skills: string[];
    shortBio: string;
    about: string;
    languages: string[];
    featuredWorkSlugs: string[];
  };
  
  export const publicPeople: PublicPerson[] = [
    {
      slug: "amina-saparova",
      name: "Amina Saparova",
      role: "Marketing Specialist",
      category: "Marketing",
      location: "Astana, Kazakhstan",
      experience: "3+ years of experience",
      projectsCount: 1,
      rating: 4.8,
      availability: "Available for Freelance",
      avatar:
        "/photo/amina-saparova/aminasaparova.jpg",
      coverImage:
        "/photo/amina-saparova/amina-saparova-1.png",
      skills: [
        "Digital Marketing",
        "Content Strategy",
        "SMM",
        "Brand Promotion",
        "Market Research",
        "Campaign Planning",
        "Copywriting",
      ],
      shortBio:
        "Marketing specialist focused on social media promotion, campaign planning, and brand communication.",
      about:
        "Marketing specialist with experience in social media promotion, campaign planning, and brand communication. Amina helps companies build clear marketing strategies, improve online visibility, and create content that connects with the target audience.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["fashion-brand-campaign"],
    },
    {
      slug: "dimash-karim",
      name: "Dimash Hasenov",
      role: "Videographer",
      category: "Videography",
      location: "Astana, Kazakhstan",
      experience: "5+ years of experience",
      projectsCount: 1,
      rating: 4.9,
      availability: "Available for Freelance",
      avatar:
        "/photo/dimash-hasenov/dimashhasenov.jpg",
      coverImage:
        "/photo/dimash-hasenov/dimash-hasenov-1.png",
      skills: [
        "Videography",
        "Camera Operation",
        "Lighting Setup",
        "Color Grading",
        "Storytelling",
        "Event Shooting",
        "Commercial Video",
      ],
      shortBio:
        "Videographer creating cinematic music videos, event videos, interviews, brand commercials, and social media content.",
      about:
        "Videographer with experience in music videos, events, interviews, brand commercials, and social media content. Dimash focuses on cinematic visuals, clean composition, natural lighting, and storytelling through camera movement.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["music-video-production"],
    },
    {
      slug: "madina-omar",
      name: "Madina Omar",
      role: "Screenwriter",
      category: "Screenwriting",
      location: "Almaty, Kazakhstan",
      experience: "4+ years of experience",
      projectsCount: 1,
      rating: 4.9,
      availability: "Available for Freelance",
      avatar:
        "/photo/madina-omar/madinaomar.jpg",
      coverImage:
        "/photo/madina-omar/madina-omar-1.png",
      skills: [
        "Screenwriting",
        "Story Development",
        "Dialogue Writing",
        "Script Editing",
        "Creative Writing",
        "Narrative Structure",
        "Character Development",
      ],
      shortBio:
        "Screenwriter specializing in short films, commercial scripts, documentary narration, and digital video concepts.",
      about:
        "Screenwriter specializing in short films, commercial scripts, documentary narration, and digital video concepts. Madina focuses on clear storytelling, natural dialogue, strong structure, and emotionally engaging ideas.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["ford-commercial-video-script"],
    },
    {
      slug: "ruslan-aitov",
      name: "Ruslan Aitov",
      role: "Producer",
      category: "Production",
      location: "Almaty, Kazakhstan",
      experience: "7+ years of experience",
      projectsCount: 1,
      rating: 4.9,
      availability: "Available for Freelance",
      avatar:
        "/photo/ruslan-aitov/ruslanaitov.jpg",
      coverImage:
        "/photo/ruslan-aitov/ruslan-aitov-1.png",
      skills: [
        "Project Management",
        "Production Planning",
        "Budget Control",
        "Team Coordination",
        "Casting",
        "Location Management",
        "Creative Direction",
      ],
      shortBio:
        "Producer focused on video productions, commercial shoots, events, and creative media projects.",
      about:
        "Producer with experience in organizing video productions, commercial shoots, events, and creative media projects. Ruslan manages teams, schedules, budgets, locations, and communication between clients and creative specialists.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["festival-of-light"],
    },
    {
      slug: "aruzhan-kanatkyzy",
      name: "Aruzhan Kanatkyzy",
      role: "3D Animator",
      category: "3D / Animation",
      location: "Astana, Kazakhstan",
      experience: "3+ years of experience",
      projectsCount: 1,
      rating: 5,
      availability: "Available for Freelance",
      avatar:
        "/photo/aruzhan-kanatkyzy/aruzhankanatkyzy.jpg",
      coverImage:
        "/photo/aruzhan-kanatkyzy/aruzhan-kanatkyzy-1.png",
      skills: [
        "3D Animation",
        "Character Animation",
        "3D Modeling",
        "Storyboarding",
        "Rigging",
        "Lighting",
        "Rendering",
      ],
      shortBio:
        "3D animator focused on character movement, product animation, and stylized visual storytelling.",
      about:
        "3D animator focused on character movement, product animation, and stylized visual storytelling. Aruzhan creates animated scenes for advertising, games, short videos, and digital campaigns using modern 3D tools and cinematic composition.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["chubby-characters"],
    },
    {
      slug: "alina-karimova",
      name: "Alina Karimova",
      role: "Motion Designer",
      category: "Motion Design",
      location: "Almaty, Kazakhstan",
      experience: "4+ years of experience",
      projectsCount: 1,
      rating: 4.8,
      availability: "Available for Freelance",
      avatar:
        "/photo/alina-karimova/alinakarimova.jpg",
      coverImage:
        "/photo/alina-karimova/alina-karimova-1.png",
      skills: [
        "Motion Design",
        "2D Animation",
        "Animated Typography",
        "Logo Animation",
        "Social Media Motion",
        "Storyboarding",
        "Visual Effects",
      ],
      shortBio:
        "Motion designer creating animated graphics, logo animations, typography motion, and short promotional videos.",
      about:
        "Motion designer specializing in animated graphics, logo animation, typography, and short promotional videos. Alina creates motion content for brands, social media, events, applications, and digital campaigns.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["motion-poster"],
    },
    {
      slug: "amir-tulegenov",
      name: "Amir Tulegenov",
      role: "Photographer / Cinematographer",
      category: "Photography / Cinematography",
      location: "Astana, Kazakhstan",
      experience: "6+ years of experience",
      projectsCount: 1,
      rating: 4.9,
      availability: "Available for Freelance",
      avatar:
        "/photo/amir-tulegenov/amirtulegenov.jpg",
      coverImage:
        "/photo/amir-tulegenov/amir-tulegenov-1.png",
      skills: [
        "Photography",
        "Cinematography",
        "Portrait Shooting",
        "Product Photography",
        "Lighting",
        "Color Correction",
        "Composition",
      ],
      shortBio:
        "Photographer and cinematographer creating portraits, product photos, fashion visuals, and cinematic content.",
      about:
        "Photographer and cinematographer specializing in portraits, product photography, fashion lookbooks, and cinematic visual content. Amir focuses on atmosphere, natural composition, clean lighting, and strong visual identity.",
      languages: ["Russian", "English", "Kazakh"],
      featuredWorkSlugs: ["tales-from-the-river"],
    },
    {
      slug: "dana-murat",
      name: "Dana Muhtarova",
      role: "Graphic Designer",
      category: "Graphic Design",
      location: "Astana, Kazakhstan",
      experience: "4+ years of experience",
      projectsCount: 2,
      rating: 4.8,
      availability: "Available for Freelance",
      avatar: "/photo/dana-muhtarova/danamuhtarova.jpg",
      coverImage: "/photo/dana-muhtarova/dana-muhtarova-1.png",
      skills: [
        "UI/UX Design",
        "Illustration",
        "Print Design",
        "Motion Design",
        "Branding",
        "Photo Editing",
        "Creative Thinking",
      ],
      shortBio:
        "Graphic designer creating brand identities, packaging, social media visuals, and clean digital layouts.",
      about:
        "Creative and detail-oriented graphic designer with a passion for visual storytelling and clean functional design. Dana specializes in brand identity, digital design, social media visuals, packaging, and media content that helps businesses communicate clearly and effectively.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["soz-mocktails", "gourmay"],
    },
    {
      slug: "arman-nurlan",
      name: "Arman Nurlan",
      role: "Video Editor",
      category: "Video Editing",
      location: "Astana, Kazakhstan",
      experience: "4+ years of experience",
      projectsCount: 1,
      rating: 4.8,
      availability: "Available for Freelance",
      avatar:
        "/photo/arman-nurlan/armannurlan.jpg",
      coverImage:
        "/photo/arman-nurlan/arman-nurlan-1.png",
      skills: [
        "Video Editing",
        "Color Correction",
        "Sound Sync",
        "Reels Editing",
        "Storytelling",
        "Transitions",
        "Post-production",
      ],
      shortBio:
        "Video editor focused on dynamic storytelling, clean pacing, social media formats, and professional post-production.",
      about:
        "Video editor focused on dynamic storytelling, clean pacing, social media formats, and professional post-production. Arman edits videos for brands, events, YouTube, Instagram, interviews, and commercial projects.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["event-highlight-edit"],
    },
    {
      slug: "timur-saten",
      name: "Timur Saten",
      role: "Director",
      category: "Directing",
      location: "Almaty, Kazakhstan",
      experience: "6+ years of experience",
      projectsCount: 1,
      rating: 4.9,
      availability: "Available for Freelance",
      avatar:
        "/photo/timur-saten/timursaten.jpg",
      coverImage:
        "/photo/timur-saten/timur-saten-1.png",
      skills: [
        "Directing",
        "Creative Direction",
        "Storytelling",
        "Scene Planning",
        "Actor Direction",
        "Shot Composition",
        "Visual Concept Development",
      ],
      shortBio:
        "Director creating short films, music videos, commercials, and cinematic brand storytelling.",
      about:
        "Director with experience in short films, music videos, commercials, and branded storytelling. Timur focuses on visual concept, mood, actor direction, scene structure, and cinematic communication.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["brand-story-video"],
    },
  ];

  function createPersonSlug(value: string) {
    return (
      value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "jobseeker"
    );
  }

  function createCurrentJobSeekerPerson(
    profile: JobSeekerProfile,
  ): PublicPerson | null {
    const name = profile.fullName.trim();

    if (!name) {
      return null;
    }

    const role = profile.role || profile.jobTitle || "Creative Specialist";
    const location =
      profile.location || profile.city || profile.country || "Location not added";
    const experience = profile.experienceYears
      ? `${profile.experienceYears} years of experience`
      : "Experience not added";
    const skills = (profile.skills || "")
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    const resume = getResumeData();
    const about =
      profile.bio ||
      resume.about ||
      "This profile is visible because the job seeker enabled Profile Visibility.";

    return {
      slug: createPersonSlug(name),
      name,
      role,
      category: role,
      location,
      experience,
      projectsCount: 0,
      rating: 0,
      availability: profile.preferredWorkType || "Available for Freelance",
      avatar: profile.avatarPreview,
      coverImage: profile.avatarPreview,
      skills,
      shortBio: about,
      about,
      languages: (resume.languages || "")
        .split(",")
        .map((language) => language.trim())
        .filter(Boolean),
      featuredWorkSlugs: [],
    };
  }

  export function getAllPublicPeople() {
    if (typeof window === "undefined") {
      return publicPeople;
    }

    const settings = getSettings();

    if (!settings.profileVisibility) {
      return publicPeople;
    }

    const currentPerson = createCurrentJobSeekerPerson(
      getStoredJobSeekerProfile(),
    );

    if (!currentPerson) {
      return publicPeople;
    }

    return [
      currentPerson,
      ...publicPeople.filter((person) => person.slug !== currentPerson.slug),
    ];
  }

  export function getPublicPersonBySlug(slug: string) {
    return publicPeople.find((person) => person.slug === slug);
  }
