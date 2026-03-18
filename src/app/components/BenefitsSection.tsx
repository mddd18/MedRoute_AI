import { Clock, Zap, UserCheck } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Kamroq navbat",
    description: "Reduced queues",
    color: "bg-blue-100",
    iconColor: "text-[#0056D2]",
  },
  {
    icon: Zap,
    title: "Yuzaki diagnoz tezligi",
    description: "Faster triage",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: UserCheck,
    title: "To'g'ri shifokor",
    description: "Accurate specialist matching",
    color: "bg-green-100",
    iconColor: "text-green-600",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 text-center mb-20">
          Afzalliklar
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-12 shadow-xl border-2 border-gray-200 hover:border-[#0056D2] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className={`${benefit.color} rounded-3xl p-8 inline-flex mb-8`}>
                  <Icon className={`w-20 h-20 ${benefit.iconColor}`} strokeWidth={2} />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-2xl text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
