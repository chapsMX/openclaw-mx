import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { UseCases } from "@/components/UseCases";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-claw-green">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <UseCases />
      <FAQ />
      <Footer />
    </main>
  );
}
