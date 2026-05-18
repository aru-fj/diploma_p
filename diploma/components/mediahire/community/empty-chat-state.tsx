import { MessageCircle } from "lucide-react";
import { mediaHireClassNames } from "../ui/design-system";

export function EmptyChatState() {
  return (
    <div className={`grid h-full min-h-[520px] place-items-center text-center lg:min-h-0 ${mediaHireClassNames.card}`}>
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#eef4ff] text-[#0B63E5]">
          <MessageCircle size={28} />
        </div>
        <p className="mt-5 text-sm font-semibold text-slate-400">
          Select a chat to start messaging
        </p>
      </div>
    </div>
  );
}
