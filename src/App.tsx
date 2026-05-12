import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyTrialBar } from "@/components/shared/StickyTrialBar";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { IntroReveal } from "@/components/shared/IntroReveal";
import { useLenis } from "@/lib/useLenis";
import LandingPage from "@/pages/LandingPage";

function App() {
  useLenis();

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <IntroReveal />
      <CustomCursor />
      <ScrollProgressBar />
      <Header />
      <main className="flex-1">
        <LandingPage />
      </main>
      <Footer />
      <StickyTrialBar />
      <Toaster position="top-right" richColors closeButton />
      <Analytics />

      {/* Page-wide grain overlay */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] grain" />
    </div>
  );
}

export default App;
