import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Plans } from "@/components/Plans";
import { Features } from "@/components/Features";
import { Video } from "@/components/Video";
import { UseCases } from "@/components/UseCases";
import { FAQ } from "@/components/FAQ";
import { FinalLogo } from "@/components/FinalLogo";
import { Footer } from "@/components/Footer";
import { ScrollDepthTracker } from "@/components/ScrollDepthTracker";

export default function Home() {
  return (
    <main className="min-h-screen bg-claw-green">
      <ScrollDepthTracker />
      <Navbar />
      <Hero />
      <Stats />
      <Plans />
      <Features />
      <Video />
      <UseCases />
      <FAQ />
      <FinalLogo />
      <Footer />
    </main>
  );
}
