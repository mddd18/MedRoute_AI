import { Target } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <Target className="w-16 h-16 text-[#0056D2] mr-4" />
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            Nega aynan MedRoute AI?
          </h2>
        </div>
        
        <div className="bg-blue-50 rounded-3xl p-12 shadow-lg border-2 border-blue-100">
          <p className="text-3xl md:text-4xl text-gray-700 leading-relaxed text-center">
            Oilaviy poliklinikalarda navbatlarni qisqartirish, vaqtni tejash va bemorlarni adashmasdan kerakli mutaxassisga yo'naltirish uchun zamonaviy yechim.
          </p>
        </div>
      </div>
    </section>
  );
}
