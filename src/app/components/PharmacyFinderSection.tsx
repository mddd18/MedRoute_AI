import { useState } from "react";
import { QrCode, ScanLine, Loader2, Pill, MapPin, Search, ChevronRight, ShoppingBag } from "lucide-react";

type ScanState = "idle" | "scanning" | "results";

const mockMedicines = [
  { name: "Azitromitsin 500mg", qty: "1 quti" },
  { name: "Paratsetamol 500mg", qty: "2 quti" },
  { name: "Vitamin C 1000mg", qty: "1 quti" }
];

const mockPharmacies = [
  { 
    name: "ArzonApteka", 
    distance: "0.8 km", 
    totalPrice: "42 000 so'm", 
    status: "Barcha dorilar bor", 
    statusColor: "text-green-600", 
    statusBg: "bg-green-100" 
  },
  { 
    name: "OxyMed", 
    distance: "1.2 km", 
    totalPrice: "45 500 so'm", 
    status: "Barcha dorilar bor", 
    statusColor: "text-green-600", 
    statusBg: "bg-green-100" 
  },
  { 
    name: "Dori-Darmon (Davlat)", 
    distance: "0.3 km", 
    totalPrice: "38 000 so'm", 
    status: "1 ta dori qolmagan", 
    statusColor: "text-orange-600", 
    statusBg: "bg-orange-100" 
  }
];

export function PharmacyFinderSection() {
  const [step, setStep] = useState<ScanState>("idle");

  const handleScan = () => {
    setStep("scanning");
    // Skanerlash va ma'lumot qidirish simulyatsiyasi (3 soniya)
    setTimeout(() => {
      setStep("results");
    }, 3000);
  };

  const handleReset = () => {
    setStep("idle");
  };

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-8 md:mb-16">
          <div className="bg-[#0056D2] p-4 rounded-2xl md:rounded-3xl mb-4 md:mb-6 shadow-lg">
            <Search className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center leading-tight mb-4">
            Dorilarni izlash va narxlarni solishtirish
          </h2>
          <p className="text-lg md:text-2xl lg:text-3xl text-gray-600 text-center max-w-4xl">
            Shifokor yozgan elektron chek yoki QR kodni skanerlang. Biz sizga eng yaqin va hamyonbop dorixonalarni topib beramiz.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl border-4 border-white relative overflow-hidden">
          <div className="min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center transition-all duration-500">
            
            {/* 1-QADAM: KUTISH VA SKANERLASH TUGMASI */}
            {step === "idle" && (
              <div className="flex flex-col items-center animate-in fade-in duration-500 w-full">
                <div className="relative mb-8 group cursor-pointer" onClick={handleScan}>
                  <div className="absolute inset-0 bg-blue-100 rounded-[2rem] md:rounded-[3rem] blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white border-4 border-dashed border-blue-300 rounded-[2rem] md:rounded-[3rem] p-12 md:p-16 flex flex-col items-center hover:border-[#0056D2] transition-colors">
                    <QrCode className="w-24 h-24 md:w-32 md:h-32 text-[#0056D2] mb-6" strokeWidth={1.5} />
                    <p className="text-xl md:text-3xl font-medium text-gray-700 text-center">
                      Elektron chekni<br/>shu yerga olib keling
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={handleScan}
                  className="bg-[#0056D2] hover:bg-[#004bb8] text-white text-lg md:text-2xl px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl flex items-center gap-4 transition-all duration-200 hover:scale-105 shadow-xl"
                >
                  <ScanLine className="w-6 h-6 md:w-8 md:h-8" />
                  Kamerani yoqish
                </button>
              </div>
            )}

            {/* 2-QADAM: SKANERLASH ANIMATSIYASI */}
            {step === "scanning" && (
              <div className="flex flex-col items-center animate-in fade-in duration-300">
                <div className="relative mb-8">
                  <ScanLine className="w-24 h-24 md:w-32 md:h-32 text-[#0056D2] animate-pulse" />
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[ping_2s_ease-in-out_infinite]"></div>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Retsept tahlil qilinmoqda...
                </h3>
                <p className="text-lg md:text-2xl text-gray-600 flex items-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-[#0056D2]" />
                  Dorixona bazalari tekshirilmoqda
                </p>
              </div>
            )}

            {/* 3-QADAM: NATIJALAR */}
            {step === "results" && (
              <div className="w-full flex flex-col lg:flex-row gap-8 animate-in slide-in-from-bottom-8 duration-500">
                
                {/* Chap ustun: Dorilar ro'yxati */}
                <div className="w-full lg:w-1/3 bg-blue-50 rounded-2xl md:rounded-3xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Pill className="w-8 h-8 text-[#0056D2]" />
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Yozib berilgan dorilar</h3>
                  </div>
                  <div className="space-y-4">
                    {mockMedicines.map((med, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-gray-100">
                        <span className="text-base md:text-lg font-medium text-gray-800">{med.name}</span>
                        <span className="text-sm md:text-base text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">{med.qty}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={handleReset}
                    className="mt-8 w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2 font-medium"
                  >
                    Boshqa retsept skanerlash
                  </button>
                </div>

                {/* O'ng ustun: Dorixonalar ro'yxati */}
                <div className="w-full lg:w-2/3">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <MapPin className="w-8 h-8 text-[#0056D2]" />
                    Eng qulay dorixonalar
                  </h3>
                  
                  <div className="space-y-4 md:space-y-6">
                    {mockPharmacies.map((pharmacy, idx) => (
                      <div key={idx} className="bg-white border-2 border-gray-100 hover:border-blue-300 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-all group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        
                        <div>
                          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{pharmacy.name}</h4>
                          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base text-gray-600">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Masofa: {pharmacy.distance}</span>
                            <span className={`px-3 py-1 rounded-lg font-medium ${pharmacy.statusBg} ${pharmacy.statusColor}`}>
                              {pharmacy.status}
                            </span>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end w-full sm:w-auto justify-between sm:justify-center gap-3">
                          <div className="text-right">
                            <p className="text-sm md:text-base text-gray-500">Jami narx:</p>
                            <p className="text-2xl md:text-3xl font-bold text-[#0056D2]">{pharmacy.totalPrice}</p>
                          </div>
                          <button className="bg-gray-100 hover:bg-[#0056D2] hover:text-white text-gray-700 p-3 md:p-4 rounded-xl transition-colors">
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
