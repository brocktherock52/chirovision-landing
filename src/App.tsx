import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyTrialBar } from "@/components/shared/StickyTrialBar";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import LandingPage from "@/pages/LandingPage";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollProgressBar />
      <Header />
      <main className="flex-1">
        <LandingPage />
      </main>
      <Footer />
      <StickyTrialBar />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
