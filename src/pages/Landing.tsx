import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Services } from "@/components/landing/Services";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { WakeBanner } from "@/components/ui/WakeBanner";
import { useWakeBackend } from "@/hooks/useWakeBackend";

export default function Landing() {
  const { backendWaking } = useWakeBackend();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6">
        <WakeBanner visible={backendWaking} />
        <Hero />
        <Features />
        <Services />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
