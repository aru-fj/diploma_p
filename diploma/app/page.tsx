import { Suspense } from "react";
import { EmployerCta } from "@/components/mediahire/employer-cta";
import { Footer } from "@/components/mediahire/footer";
import { Header } from "@/components/mediahire/header";
import { HeroSection } from "@/components/mediahire/hero-section";
import { PublicWorksSection } from "@/components/mediahire/public/public-works-section";

function HomePageContent() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="bg-[#eaf3ff]">
        <Header />
        <HeroSection />
      </div>

      <PublicWorksSection />
      <EmployerCta />
      <Footer />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  );
}
