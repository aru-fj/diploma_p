import { Suspense } from "react";
import { PublicHomePage } from "@/components/mediahire/public/public-home-page";

function HomePageContent() {
  return <PublicHomePage />;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  );
}
