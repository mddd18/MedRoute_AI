import { Activity } from "lucide-react";

interface HeroSectionProps {
  onStartClick: () => void;
}

export function HeroSection({ onStartClick }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="bg-[#0056D2] p-6 rounded-3xl shadow-lg">
            <Activity className="w-20 h-20 text-white" strokeWidth={2.5} />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
          MedRoute AI
        </h1>
        
        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-700 mb-6 leading-snug">
          Bemorlarni aqlli yo'naltirish tizimi
        </p>
        
        <p className="text-2xl md:text-3xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
          Sun'iy intellekt yordamida shikoyatingizni tahlil qilamiz va sizni darhol to'g'ri shifokorga yo'naltiramiz.
        </p>
        
        <button
          onClick={onStartClick}
          className="bg-[#0056D2] hover:bg-[#004bb8] text-white text-4xl md:text-5xl px-20 py-8 rounded-3xl shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Boshlash
        </button>
      </div>
    </section>
  );
}
