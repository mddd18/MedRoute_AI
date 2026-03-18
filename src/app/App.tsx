import { useRef } from "react";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { TriageDemoSection } from "./components/TriageDemoSection";
import { BenefitsSection } from "./components/BenefitsSection";

export default function App() {
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="size-full bg-white">
      {/* Hero Section */}
      <HeroSection onStartClick={scrollToDemo} />
      
      {/* About Section */}
      <AboutSection />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Triage Demo Section */}
      <div ref={demoRef}>
        <TriageDemoSection />
      </div>
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Footer */}
      <footer className="bg-[#0056D2] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-2xl md:text-3xl mb-2">
            MedRoute AI © 2026
          </p>
          <p className="text-xl md:text-2xl text-blue-200">
            Oilaviy poliklinikalar uchun sun'iy intellekt yechimi
          </p>
        </div>
      </footer>
    </div>
  );
}
