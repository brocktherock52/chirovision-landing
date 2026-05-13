import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import { useLenis } from "@/lib/useLenis";
import LandingPage from "@/pages/LandingPage";

function App() {
  useLenis();

  return (
    <div className="relative flex min-h-screen flex-col bg-canvas text-ink">
      <ScrollProgressBar />
      <Header />
      <main className="flex-1">
        <LandingPage />
      </main>
      <Footer />
      <Toaster position="top-right" richColors closeButton theme="dark" />
      <Analytics />
    </div>
  );
}

export default App;
