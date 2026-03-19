import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { TriageDemoSection } from "./components/TriageDemoSection";
import { DoctorScheduleSection } from "./components/DoctorScheduleSection";
import { PharmacyFinderSection } from "./components/PharmacyFinderSection";
import { BenefitsSection } from "./components/BenefitsSection";

// Asosiy (Landing) sahifa
function HomePage() {
  return (
    <>
      <HeroSection onStartClick={() => window.location.href = '/kiosk'} />
      <AboutSection />
      <HowItWorksSection />
      <BenefitsSection />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="size-full bg-white flex flex-col min-h-screen">
        {/* Tepa menyu barcha sahifalarda ko'rinadi */}
        <Navbar />

        {/* Sahifalar (Marshrutlar) */}
        <div className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kiosk" element={<TriageDemoSection />} />
            <Route path="/tablo" element={<DoctorScheduleSection />} />
            <Route path="/dorixona" element={<PharmacyFinderSection />} />
          </Routes>
        </div>

        {/* Footer barcha sahifalarda eng pastda ko'rinadi */}
        <footer className="bg-[#0056D2] text-white py-12 px-6 mt-auto">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-2xl md:text-3xl mb-2">MedRoute AI © 2026</p>
            <p className="text-xl md:text-2xl text-blue-200">
              Oilaviy poliklinikalar uchun sun'iy intellekt yechimi
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
