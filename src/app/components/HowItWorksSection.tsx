import { MessageSquare, HelpCircle, Zap, Navigation } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Shikoyat yozish",
    description: "Enter complaint",
  },
  {
    icon: HelpCircle,
    title: "Qo'shimcha savollar",
    description: "Answer AI questions",
  },
  {
    icon: Zap,
    title: "Tezkor tahlil",
    description: "AI Analysis",
  },
  {
    icon: Navigation,
    title: "Yo'naltirish",
    description: "Routing & Ticket",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 text-center mb-20">
          Qanday ishlaydi?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-blue-100 hover:border-[#0056D2] transition-all duration-300">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#0056D2] text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold shadow-lg">
                    {index + 1}
                  </div>
                  
                  <div className="mt-8 flex justify-center mb-6">
                    <Icon className="w-20 h-20 text-[#0056D2]" strokeWidth={2} />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 text-center mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-xl text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
