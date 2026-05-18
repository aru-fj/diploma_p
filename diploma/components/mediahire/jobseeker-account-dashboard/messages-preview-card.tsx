import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { messagePreviews } from "./dashboard-data";
import { MessagePreviewItem } from "./message-preview-item";
import { fadeInUp, mediaHireClassNames, mediaHireMotion } from "../ui/design-system";

export function MessagesPreviewCard() {
  return (
    <motion.section
      animate="show"
      className={`p-5 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(2)}
      variants={fadeInUp}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-950">Messages</h2>
        <Link
          className="inline-flex items-center gap-1 text-sm font-black text-[#0B63E5] transition hover:gap-2"
          href="/dashboard/jobseeker/community"
        >
          More <ChevronRight size={16} />
        </Link>
      </div>
      <div className="space-y-1">
        {messagePreviews.map((message) => (
          <MessagePreviewItem key={message.id} message={message} />
        ))}
      </div>
    </motion.section>
  );
}
