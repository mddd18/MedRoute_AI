import { useState } from "react";
import { Mic, CheckCircle, RotateCcw, Loader2, ClipboardList, AlertTriangle } from "lucide-react";

type DemoState = "input" | "q_duration" | "q_pain" | "analyzing" | "result";

// Kengaytirilgan mantiqiy baza
const triageDatabase = [
  {
    keywords: ["yurak", "sanchish", "qon bosimi", "davleniya", "haqillash"],
    doctor: "Kardiolog",
    room: "8-xona",
    ticketPrefix: "K"
  },
  {
    keywords: ["isitma", "yo'tal", "shamollash", "tomog", "tomoq", "gripp"],
    doctor: "Terapevt",
    room: "12-xona",
    ticketPrefix: "T"
  },
  {
    keywords: ["bosh", "aylanishi", "uyqu", "asab", "qaltirash"],
    doctor: "Nevropatolog",
    room: "5-xona",
    ticketPrefix: "N"
  },
  {
    keywords: ["qorin", "ko'ngil aynishi", "qusish", "ich ketishi", "oshqozon"],
    doctor: "Gastroenterolog",
    room: "3-xona",
    ticketPrefix: "G"
  }
];

export function TriageDemoSection() {
  const [state, setState] = useState<DemoState>("input");
  const [isListening, setIsListening] = useState(false);
  
  // Bemor ma'lumotlarini yig'ish uchun state
  const [patientData, setPatientData] = useState({
    complaint: "",
    duration: "",
    painLevel: "",
  });

  const [resultData, setResultData] = useState({ doctor: "Terapevt", room: "1-xona", ticket: "#T-01", isUrgent: false });

  // 1-qadam: Shikoyatni saqlash va keyingi savolga o'tish
  const handleComplaintSubmit = (text: string) => {
    if (!text.trim()) return;
    setPatientData(prev => ({ ...prev, complaint: text }));
    setState("q_duration");
  };

  // 2-qadam: Davomiylikni saqlash
  const handleDurationClick = (duration: string) => {
    setPatientData(prev => ({ ...prev, duration }));
    setState("q_pain");
  };

  // 3-qadam: Og'riq darajasini saqlash va Tahlilni boshlash
  const handlePainClick = (painLevel: string) => {
    setPatientData(prev => ({ ...prev, painLevel }));
    setState("analyzing");
    analyzeComplaint(patientData.complaint, painLevel);
  };

  // Tahlil funksiyasi
  const analyzeComplaint = (text: string, pain: string) => {
    const lowerText = text.toLowerCase();
    let foundMatch = false;
    let urgent = pain === "Chidab bo'lmas (9-10)" || lowerText.includes("yurak");

    for (const category of triageDatabase) {
      if (category.keywords.some(keyword => lowerText.includes(keyword))) {
        setResultData({
          doctor: category.doctor,
          room: category.room,
          ticket: `#${category.ticketPrefix}-${Math.floor(Math.random() * 50) + 1}`,
          isUrgent: urgent
        });
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      setResultData({
        doctor: "Umumiy amaliyot shifokori",
        room: "1-xona",
        ticket: `#U-${Math.floor(Math.random() * 50) + 1}`,
        isUrgent: urgent
      });
    }

    setTimeout(() => setState("result"), 2500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleComplaintSubmit(patientData.complaint);
    }
  };

  const handleMicClick = () => {
    setIsListening(true);
    setPatientData(prev => ({ ...prev, complaint: "" }));
    setTimeout(() => {
      setIsListening(false);
      handleComplaintSubmit("Qornim qattiq sanchib og'riyapti, ko'nglim ayniyapti");
    }, 2500);
  };

  const handleReset = () => {
    setState("input");
    setPatientData({ complaint: "", duration: "", painLevel: "" });
  };

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-4 md:mb-12">
          Tizimni sinab ko'ring
        </h2>
        
        <p className="text-lg md:text-2xl lg:text-3xl text-gray-600 text-center mb-8 md:mb-16">
          Shifokor ishlashini osonlashtiruvchi aqlli so'rovnoma
        </p>

        {/* Kiosk Container */}
        <div className="bg-gray-100 rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 lg:p-12 shadow-2xl border-4 md:border-8 border-gray-300 relative overflow-hidden">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 min-h-[400px] md:min-h-[600px] flex flex-col justify-center transition-all duration-500">
            
            {/* 1-QADAM: SHIKOYAT */}
            {state === "input" && (
              <div className="flex flex-col items-center justify-center flex-1 animate-in fade-in duration-500">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-12 text-center leading-tight">
                  Sizni nima bezovta qilyapti?
                </h3>
                
                <div className="w-full max-w-3xl mb-8 md:mb-10">
                  <div className="relative">
                    <input
                      type="text"
                      value={patientData.complaint}
                      onChange={(e) => setPatientData(prev => ({ ...prev, complaint: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      placeholder={isListening ? "Tinglanmoqda..." : "Shikoyatingizni kiriting..."}
                      className="w-full text-lg md:text-3xl lg:text-4xl px-4 py-4 md:px-8 md:py-8 border-2 md:border-4 border-gray-300 rounded-2xl md:rounded-3xl focus:outline-none focus:border-[#0056D2] bg-gray-50 pr-16 md:pr-24"
                    />
                    <button 
                      onClick={handleMicClick}
                      aria-label="Ovozli yozish"
                      className={`absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 p-3 md:p-6 rounded-xl md:rounded-2xl transition-all duration-300 ${
                        isListening 
                          ? "bg-red-500 animate-pulse text-white scale-110 shadow-lg" 
                          : "bg-[#0056D2] hover:bg-[#004bb8] text-white"
                      }`}
                    >
                      <Mic className="w-6 h-6 md:w-10 md:h-10" />
                    </button>
                  </div>
                </div>
                
                <p className="text-base md:text-xl lg:text-2xl text-gray-600 mb-4 md:mb-8">yoki tezkor tanlang:</p>
                
                <div className="flex flex-wrap gap-3 md:gap-6 justify-center">
                  <button
                    onClick={() => handleComplaintSubmit("Isitma va qattiq yo'tal")}
                    className="bg-blue-100 hover:bg-blue-200 text-[#0056D2] text-sm md:text-xl lg:text-3xl px-4 py-2 md:px-8 md:py-4 lg:px-12 lg:py-6 rounded-xl md:rounded-3xl border md:border-2 border-blue-200 transition-all duration-200 hover:scale-105"
                  >
                    Isitma va yo'tal
                  </button>
                  <button
                    onClick={() => handleComplaintSubmit("Yuragim tez urib, qon bosimim oshdi")}
                    className="bg-red-100 hover:bg-red-200 text-red-700 text-sm md:text-xl lg:text-3xl px-4 py-2 md:px-8 md:py-4 lg:px-12 lg:py-6 rounded-xl md:rounded-3xl border md:border-2 border-red-200 transition-all duration-200 hover:scale-105"
                  >
                    Yurak sanchishi
                  </button>
                </div>
              </div>
            )}

            {/* 2-QADAM: DAVOMIYLIK */}
            {state === "q_duration" && (
              <div className="flex flex-col justify-center flex-1 animate-in slide-in-from-right-8 duration-500">
                <div className="mb-6 md:mb-12">
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-10 leading-tight">
                    Holat qachondan beri davom etyapti?
                  </h3>
                  <div className="space-y-3 md:space-y-6">
                    {["Hozirgina boshlandi", "1-3 kun bo'ldi", "Bir haftadan oshdi"].map((ans, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDurationClick(ans)}
                        className="w-full bg-white hover:bg-blue-50 text-gray-900 text-lg md:text-2xl lg:text-3xl px-6 py-4 md:px-10 md:py-8 rounded-2xl md:rounded-3xl border-2 md:border-4 border-gray-300 hover:border-[#0056D2] transition-all duration-200 text-left"
                      >
                        {ans}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3-QADAM: OG'RIQ DARAJASI */}
            {state === "q_pain" && (
              <div className="flex flex-col justify-center flex-1 animate-in slide-in-from-right-8 duration-500">
                <div className="mb-6 md:mb-12">
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-10 leading-tight">
                    Bezovtalik / og'riq darajasi qanday?
                  </h3>
                  <div className="space-y-3 md:space-y-6">
                    {["Yengil (1-3)", "O'rtacha (4-7)", "Chidab bo'lmas (8-10)"].map((ans, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePainClick(ans)}
                        className="w-full bg-white hover:bg-blue-50 text-gray-900 text-lg md:text-2xl lg:text-3xl px-6 py-4 md:px-10 md:py-8 rounded-2xl md:rounded-3xl border-2 md:border-4 border-gray-300 hover:border-[#0056D2] transition-all duration-200 text-left flex justify-between items-center"
                      >
                        {ans}
                        {idx === 2 && <AlertTriangle className="text-red-500 w-8 h-8 md:w-10 md:h-10" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAHLIL */}
            {state === "analyzing" && (
              <div className="flex flex-col items-center justify-center flex-1 animate-in fade-in duration-300">
                <Loader2 className="w-16 h-16 md:w-24 md:h-24 text-[#0056D2] animate-spin mb-6 md:mb-8" strokeWidth={2} />
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 text-center leading-tight">
                  Birlamchi anamnez tahlil qilinmoqda...
                </h3>
                <p className="text-base md:text-xl lg:text-2xl text-gray-600 text-center animate-pulse">
                  Shifokorga yuborish uchun xulosa tayyorlanmoqda
                </p>
              </div>
            )}

            {/* NATIJA VA SHIFOKOR EKRANI */}
            {state === "result" && (
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-center flex-1 animate-in zoom-in-95 duration-500">
                
                {/* Chap tomon: Bemor chiptasi */}
                <div className="w-full lg:w-1/2 flex flex-col items-center">
                  <CheckCircle className="w-20 h-20 md:w-28 md:h-28 text-[#10b981] mb-6" strokeWidth={2} />
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                    Sizning chiptangiz
                  </h3>
                  
                  <div className={`w-full border-2 md:border-4 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden ${resultData.isUrgent ? 'bg-red-50 border-red-500' : 'bg-green-50 border-[#10b981]'}`}>
                    {resultData.isUrgent && (
                      <div className="absolute top-0 left-0 w-full bg-red-500 text-white text-center py-2 font-bold text-sm md:text-lg animate-pulse">
                        TEZKOR NAVBAT
                      </div>
                    )}
                    <div className={`space-y-4 md:space-y-6 relative z-10 ${resultData.isUrgent ? 'mt-6' : ''}`}>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3 md:pb-6">
                        <span className="text-lg md:text-2xl text-gray-700">Mutaxassis:</span>
                        <span className="text-xl md:text-3xl font-bold text-gray-900">{resultData.doctor}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3 md:pb-6">
                        <span className="text-lg md:text-2xl text-gray-700">Xona:</span>
                        <span className="text-xl md:text-3xl font-bold text-gray-900">{resultData.room}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg md:text-2xl text-gray-700">Navbat:</span>
                        <span className={`text-3xl md:text-5xl font-bold ${resultData.isUrgent ? 'text-red-600' : 'text-[#0056D2]'}`}>{resultData.ticket}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* O'ng tomon: Shifokor kompyuterida nima ko'rinadi? */}
                <div className="w-full lg:w-1/2 bg-gray-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-gray-200 shadow-inner">
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
                    <ClipboardList className="w-8 h-8 md:w-10 md:h-10 text-[#0056D2]" />
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-gray-900">Shifokor ekrani</h4>
                      <p className="text-sm md:text-base text-gray-500">Tayyor anamnez</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <p className="text-sm md:text-lg text-gray-500 mb-1">Asosiy shikoyat:</p>
                      <p className="text-lg md:text-2xl font-semibold text-gray-900 bg-white p-3 md:p-4 rounded-xl border border-gray-100">
                        "{patientData.complaint}"
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm md:text-lg text-gray-500 mb-1">Davomiyligi:</p>
                        <p className="text-base md:text-xl font-medium text-gray-900 bg-white p-3 rounded-xl border border-gray-100">
                          {patientData.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm md:text-lg text-gray-500 mb-1">Og'riq darajasi:</p>
                        <p className={`text-base md:text-xl font-medium p-3 rounded-xl border border-gray-100 ${resultData.isUrgent ? 'bg-red-100 text-red-700' : 'bg-white text-gray-900'}`}>
                          {patientData.painLevel}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleReset}
                    className="mt-8 md:mt-12 w-full bg-[#0056D2] hover:bg-[#004bb8] text-white text-lg md:text-2xl px-8 py-4 rounded-xl md:rounded-2xl flex justify-center items-center gap-2 md:gap-4 transition-all duration-200"
                  >
                    <RotateCcw className="w-6 h-6 md:w-8 md:h-8" />
                    Yangi qabulni boshlash
                  </button>
                </div>
                
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
