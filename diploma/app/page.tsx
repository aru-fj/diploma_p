import { EmployerCta } from "@/components/mediahire/employer-cta";
import { FilterSection } from "@/components/mediahire/filter-section";
import { Footer } from "@/components/mediahire/footer";
import { Header } from "@/components/mediahire/header";
import { HeroSection } from "@/components/mediahire/hero-section";
import { LatestWork } from "@/components/mediahire/latest-work";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <Header />
      <HeroSection />
      <FilterSection />
      <LatestWork />
      <EmployerCta />
      <Footer />
    </main>
  );
}
