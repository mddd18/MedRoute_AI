import { useState } from "react";
import { Mic, CheckCircle, RotateCcw, Loader2 } from "lucide-react";

type DemoState = "input" | "questions" | "analyzing" | "result";

export function TriageDemoSection() {
  const [state, setState] = useState<DemoState>("input");
  const [complaintInput, setComplaintInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSuggestionClick = (suggestion: string) => {
    setComplaintInput(suggestion);
    setTimeout(() => setState("questions"), 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && complaintInput.trim() !== "") {
      setState("questions");
    }
  };

  const handleMicClick = () => {
    setIsListening(true);
    setComplaintInput("");
    setTimeout(() => {
      setIsListening(false);
      setComplaintInput("Qornim qattiq og'riyapti va ko'nglim ayniyapti");
      setTimeout(() => setState("questions"), 800);
    }, 2000);
  };

  const handleAnswerClick = () => {
    setState("analyzing");
    setTimeout(() => setState("result"), 2000); 
  };

  const handleReset = () => {
    setState("input");
    setComplaintInput("");
  };

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-4 md:mb-12">
          Tizimni sinab ko'ring
        </h2>
        
        <p className="text-lg md:text-2xl lg:text-3xl text-gray-600 text-center mb-8 md:mb-16">
          Quyida kiosk interfeysi namoyish qilingan
        </p>

        {/* Kiosk Container */}
        <div className="bg-gray-100 rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 lg:p-12 shadow-2xl border-4 md:border-8 border-gray-300 relative overflow-hidden">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 min-h-[400px] md:min-h-[600px] flex flex-col justify-center transition-all duration-500">
            
            {/* State A: Complaint Input */}
            {state === "input" && (
              <div className="flex flex-col items-center justify-center flex-1 animate-in fade-in duration-500">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-12 text-center leading-tight">
                  Sizni nima bezovta qilyapti?
                </h3>
                
                <div className="w-full max-w-3xl mb-8 md:mb-10">
                  <div className="relative">
                    <input
                      type="text"
                      value={complaintInput}
                      onChange={(e) => setComplaintInput(e.target.value)}
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
                    onClick={() => handleSuggestionClick("Isitma va yo'tal")}
                    className="bg-blue-100 hover:bg-blue-200 text-[#0056D2] text-sm md:text-xl lg:text-3xl px-4 py-2 md:px-8 md:py-4 lg:px-12 lg:py-6 rounded-xl md:rounded-3xl border md:border-2 border-blue-200 transition-all duration-200 hover:scale-105"
                  >
                    Isitma va yo'tal
                  </button>
                  <button
                    onClick={() => handleSuggestionClick("Kuchli bosh og'rig'i")}
                    className="bg-blue-100 hover:bg-blue-200 text-[#0056D2] text-sm md:text-xl lg:text-3xl px-4 py-2 md:px-8 md:py-4 lg:px-12 lg:py-6 rounded-xl md:rounded-3xl border md:border-2 border-blue-200 transition-all duration-200 hover:scale-105"
                  >
                    Bosh og'rig'i
                  </button>
                </div>
              </div>
            )}

            {/* State B: Follow-up Questions */}
            {state === "questions" && (
              <div className="flex flex-col justify-center flex-1 animate-in slide-in-from-right-8 duration-500">
                <div className="mb-6 md:mb-12">
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-10 leading-tight">
                    Holat qachondan beri davom etyapti?
                  </h3>
                  
                  <div className="space-y-3 md:space-y-6">
                    <button
                      onClick={handleAnswerClick}
                      className="w-full bg-white hover:bg-blue-50 text-gray-900 text-lg md:text-2xl lg:text-3xl px-6 py-4 md:px-10 md:py-8 rounded-2xl md:rounded-3xl border-2 md:border-4 border-gray-300 hover:border-[#0056D2] transition-all duration-200 text-left"
                    >
                      Bugun boshlandi
                    </button>
                    <button
                      onClick={handleAnswerClick}
                      className="w-full bg-white hover:bg-blue-50 text-gray-900 text-lg md:text-2xl lg:text-3xl px-6 py-4 md:px-10 md:py-8 rounded-2xl md:rounded-3xl border-2 md:border-4 border-gray-300 hover:border-[#0056D2] transition-all duration-200 text-left"
                    >
                      1-3 kun bo'ldi
                    </button>
                    <button
                      onClick={handleAnswerClick}
                      className="w-full bg-white hover:bg-blue-50 text-gray-900 text-lg md:text-2xl lg:text-3xl px-6 py-4 md:px-10 md:py-8 rounded-2xl md:rounded-3xl border-2 md:border-4 border-gray-300 hover:border-[#0056D2] transition-all duration-200 text-left"
                    >
                      3 kundan ortiq
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* State C: Analyzing */}
            {state === "analyzing" && (
              <div className="flex flex-col items-center justify-center flex-1 animate-in fade-in duration-300">
                <Loader2 className="w-16 h-16 md:w-24 md:h-24 text-[#0056D2] animate-spin mb-6 md:mb-8" strokeWidth={2} />
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 text-center leading-tight">
                  Shikoyatingiz tahlil qilinmoqda...
                </h3>
                <p className="text-base md:text-xl lg:text-2xl text-gray-600 text-center animate-pulse">
                  Sun'iy intellekt ma'lumotlarni qayta ishlamoqda
                </p>
              </div>
            )}

            {/* State D: Result Ticket */}
            {state === "result" && (
              <div className="flex flex-col items-center justify-center flex-1 animate-in zoom-in-95 duration-500">
                <div className="mb-6 md:mb-10">
                  <CheckCircle className="w-20 h-20 md:w-32 md:h-32 text-[#10b981]" strokeWidth={2} />
                </div>
                
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-4 text-center leading-tight">
                  Tahlil muvaffaqiyatli tugadi!
                </h3>
                
                <p className="text-lg md:text-2xl lg:text-3xl text-gray-600 mb-8 md:mb-12 text-center">
                  Sizning yo'naltirish chiptangiz
                </p>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 md:border-4 border-[#10b981] rounded-2xl md:rounded-3xl p-6 md:p-12 w-full max-w-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-[#10b981] opacity-10 rounded-bl-full"></div>
                  <div className="space-y-4 md:space-y-8 relative z-10">
                    <div className="flex justify-between items-center border-b border-green-200 pb-3 md:pb-6">
                      <span className="text-lg md:text-2xl lg:text-3xl text-gray-700">Mutaxassis:</span>
                      <span className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900">Terapevt</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-green-200 pb-3 md:pb-6">
                      <span className="text-lg md:text-2xl lg:text-3xl text-gray-700">Xona:</span>
                      <span className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900">12-xona</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg md:text-2xl lg:text-3xl text-gray-700">Navbat:</span>
                      <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0056D2]">#T-08</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleReset}
                  className="mt-8 md:mt-12 bg-gray-200 hover:bg-gray-300 text-gray-900 text-lg md:text-2xl lg:text-3xl px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-3xl flex items-center gap-2 md:gap-4 transition-all duration-200 hover:scale-105"
                >
                  <RotateCcw className="w-6 h-6 md:w-8 md:h-8" />
                  Yangi bemor
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
