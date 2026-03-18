import { useState } from "react";
import { Mic, CheckCircle, RotateCcw } from "lucide-react";

type DemoState = "input" | "questions" | "result";

export function TriageDemoSection() {
  const [state, setState] = useState<DemoState>("input");
  const [complaintInput, setComplaintInput] = useState("");

  const handleSuggestionClick = (suggestion: string) => {
    setComplaintInput(suggestion);
    setTimeout(() => setState("questions"), 300);
  };

  const handleAnswerClick = () => {
    setTimeout(() => setState("result"), 300);
  };

  const handleReset = () => {
    setState("input");
    setComplaintInput("");
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 text-center mb-12">
          Tizimni sinab ko'ring
        </h2>
        
        <p className="text-2xl md:text-3xl text-gray-600 text-center mb-16">
          Quyida kiosk interfeysi namoyish qilingan
        </p>

        {/* Kiosk Container */}
        <div className="bg-gray-100 rounded-[3rem] p-8 md:p-12 shadow-2xl border-8 border-gray-300">
          <div className="bg-white rounded-3xl p-12 md:p-16 min-h-[600px] flex flex-col">
            
            {/* State A: Complaint Input */}
            {state === "input" && (
              <div className="flex flex-col items-center justify-center flex-1">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
                  Sizni nima bezovta qilyapti?
                </h3>
                
                <div className="w-full max-w-3xl mb-10">
                  <div className="relative">
                    <input
                      type="text"
                      value={complaintInput}
                      onChange={(e) => setComplaintInput(e.target.value)}
                      placeholder="Shikoyatingizni kiriting..."
                      className="w-full text-3xl md:text-4xl px-8 py-8 border-4 border-gray-300 rounded-3xl focus:outline-none focus:border-[#0056D2] bg-gray-50"
                    />
                    <button className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-[#0056D2] text-white p-6 rounded-2xl hover:bg-[#004bb8] transition-colors">
                      <Mic className="w-10 h-10" />
                    </button>
                  </div>
                </div>
                
                <p className="text-2xl text-gray-600 mb-8">yoki tanlang:</p>
                
                <div className="flex flex-wrap gap-6 justify-center">
                  <button
                    onClick={() => handleSuggestionClick("Isitma")}
                    className="bg-blue-100 hover:bg-blue-200 text-[#0056D2] text-3xl px-12 py-6 rounded-3xl border-2 border-blue-200 transition-all duration-200 hover:scale-105"
                  >
                    Isitma
                  </button>
                  <button
                    onClick={() => handleSuggestionClick("Bosh og'rig'i")}
                    className="bg-blue-100 hover:bg-blue-200 text-[#0056D2] text-3xl px-12 py-6 rounded-3xl border-2 border-blue-200 transition-all duration-200 hover:scale-105"
                  >
                    Bosh og'rig'i
                  </button>
                </div>
              </div>
            )}

            {/* State B: Follow-up Questions */}
            {state === "questions" && (
              <div className="flex flex-col justify-center flex-1">
                <div className="mb-12">
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10">
                    Isitmangiz necha kundan beri kuzatilyapti?
                  </h3>
                  
                  <div className="space-y-6">
                    <button
                      onClick={handleAnswerClick}
                      className="w-full bg-white hover:bg-blue-50 text-gray-900 text-3xl px-10 py-8 rounded-3xl border-4 border-gray-300 hover:border-[#0056D2] transition-all duration-200"
                    >
                      Bugun boshlandi
                    </button>
                    <button
                      onClick={handleAnswerClick}
                      className="w-full bg-white hover:bg-blue-50 text-gray-900 text-3xl px-10 py-8 rounded-3xl border-4 border-gray-300 hover:border-[#0056D2] transition-all duration-200"
                    >
                      1-2 kun
                    </button>
                    <button
                      onClick={handleAnswerClick}
                      className="w-full bg-white hover:bg-blue-50 text-gray-900 text-3xl px-10 py-8 rounded-3xl border-4 border-gray-300 hover:border-[#0056D2] transition-all duration-200"
                    >
                      3 kundan ortiq
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10">
                    Nafas qisilishi bormi?
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <button
                      onClick={handleAnswerClick}
                      className="bg-white hover:bg-blue-50 text-gray-900 text-3xl px-10 py-8 rounded-3xl border-4 border-gray-300 hover:border-[#0056D2] transition-all duration-200"
                    >
                      Ha
                    </button>
                    <button
                      onClick={handleAnswerClick}
                      className="bg-white hover:bg-blue-50 text-gray-900 text-3xl px-10 py-8 rounded-3xl border-4 border-gray-300 hover:border-[#0056D2] transition-all duration-200"
                    >
                      Yo'q
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* State C: Result Ticket */}
            {state === "result" && (
              <div className="flex flex-col items-center justify-center flex-1">
                <div className="mb-10">
                  <CheckCircle className="w-32 h-32 text-[#10b981]" strokeWidth={2} />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Tahlil tugadi!
                </h3>
                
                <p className="text-3xl text-gray-600 mb-12">
                  Quyidagi yo'naltirish chiptangiz
                </p>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-[#10b981] rounded-3xl p-12 w-full max-w-2xl shadow-xl">
                  <div className="space-y-8">
                    <div className="flex justify-between items-center border-b-2 border-green-200 pb-6">
                      <span className="text-3xl text-gray-700">Mutaxassis:</span>
                      <span className="text-4xl font-bold text-gray-900">Pediatr</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b-2 border-green-200 pb-6">
                      <span className="text-3xl text-gray-700">Xona:</span>
                      <span className="text-4xl font-bold text-gray-900">4-xona</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-3xl text-gray-700">Navbat:</span>
                      <span className="text-5xl font-bold text-[#0056D2]">#A-14</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleReset}
                  className="mt-12 bg-gray-200 hover:bg-gray-300 text-gray-900 text-3xl px-12 py-6 rounded-3xl flex items-center gap-4 transition-all duration-200 hover:scale-105"
                >
                  <RotateCcw className="w-8 h-8" />
                  Qayta urinish
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
