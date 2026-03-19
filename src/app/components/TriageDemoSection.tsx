import { useState } from "react";
import { CheckCircle, RotateCcw, Loader2, ClipboardList, AlertTriangle, ChevronRight, Activity } from "lucide-react";

type DemoState = "category_select" | "questions" | "analyzing" | "result";

// 10 ta asosiy shikoyat bo'yicha tibbiy mantiq bazasi
const triageDatabase: Record<string, any> = {
  "Bosh og'rig'i": {
    questions: [
      { id: "q1", text: "Og'riq tez-tez yoki juda kuchli bo'lyaptimi?", options: ["Ha", "Yo'q, oddiy holat"] },
      { id: "q2", text: "Hushdan ketish, ko'ngil aynishi yoki ko'rishda o'zgarish bormi?", options: ["Ha", "Yo'q"] }
    ],
    evaluate: (ans: any) => {
      if (ans.q2 === "Ha") return { doc: "Shoshilinch yordam (103)", room: "Tez yordam", isUrgent: true, ticket: "SH" };
      if (ans.q1 === "Ha") return { doc: "Nevrolog", room: "5-xona", isUrgent: false, ticket: "N" };
      return { doc: "Terapevt", room: "12-xona", isUrgent: false, ticket: "T" };
    }
  },
  "Tomoq og'rig'i": {
    questions: [
      { id: "q1", text: "Nafas qisilishi kuzatilyaptimi?", options: ["Ha", "Yo'q"] },
      { id: "q2", text: "Bemor yosh bolami (18 yoshgacha)?", options: ["Ha", "Yo'q"] }
    ],
    evaluate: (ans: any) => {
      if (ans.q1 === "Ha") return { doc: "Shoshilinch yordam (103)", room: "Tez yordam", isUrgent: true, ticket: "SH" };
      if (ans.q2 === "Ha") return { doc: "Pediatr", room: "2-xona", isUrgent: false, ticket: "P" };
      return { doc: "LOR (Otolaringolog)", room: "8-xona", isUrgent: false, ticket: "L" };
    }
  },
  "Qorin og'rig'i": {
    questions: [
      { id: "q1", text: "Og'riq qayerda? (Aynan o'ng pastki qismdami?)", options: ["Ha, o'ng pastda", "Boshqa joyda"] },
      { id: "q2", text: "Chidab bo'lmas kuchli og'riq yoki qusish bormi?", options: ["Ha", "Yo'q"] },
      { id: "q3", text: "Bemor yosh bolami?", options: ["Ha", "Yo'q"] }
    ],
    evaluate: (ans: any) => {
      if (ans.q2 === "Ha") return { doc: "Shoshilinch yordam (103)", room: "Tez yordam", isUrgent: true, ticket: "SH" };
      if (ans.q1 === "Ha, o'ng pastda") return { doc: "Jarroh (Xirurg)", room: "14-xona", isUrgent: false, ticket: "X" };
      if (ans.q3 === "Ha") return { doc: "Pediatr", room: "2-xona", isUrgent: false, ticket: "P" };
      return { doc: "Terapevt", room: "12-xona", isUrgent: false, ticket: "T" };
    }
  },
  "Ko'krak og'rig'i": {
    questions: [
      { id: "q1", text: "Nafas qisilishi bormi?", options: ["Ha", "Yo'q"] },
      { id: "q2", text: "Og'riq chap qo'lga yoki kurakka tarqalyaptimi?", options: ["Ha", "Yo'q"] }
    ],
    evaluate: (ans: any) => {
      if (ans.q1 === "Ha" || ans.q2 === "Ha") return { doc: "Shoshilinch yordam (103)", room: "Tez yordam", isUrgent: true, ticket: "SH" };
      return { doc: "Kardiolog", room: "6-xona", isUrgent: false, ticket: "K" };
    }
  },
  "Yo'tal": {
    questions: [
      { id: "q1", text: "Nafas qisilishi kuzatilyaptimi?", options: ["Ha", "Yo'q"] },
      { id: "q2", text: "Bemor yosh bolami?", options: ["Ha", "Yo'q"] }
    ],
    evaluate: (ans: any) => {
      if (ans.q1 === "Ha") return { doc: "Shoshilinch yordam (103)", room: "Tez yordam", isUrgent: true, ticket: "SH" };
      if (ans.q2 === "Ha") return { doc: "Pediatr", room: "2-xona", isUrgent: false, ticket: "P" };
      return { doc: "Terapevt", room: "12-xona", isUrgent: false, ticket: "T" };
    }
  },
  "Isitma": {
    questions: [
      { id: "q1", text: "Harorat juda yuqorimi va dori ichganda ham tushmayaptimi?", options: ["Ha", "Yo'q"] },
      { id: "q2", text: "Bemor yosh bolami?", options: ["Ha", "Yo'q"] }
    ],
    evaluate: (ans: any) => {
      if (ans.q1 === "Ha") return { doc: "Shoshilinch yordam (103)", room: "Tez yordam", isUrgent: true, ticket: "SH" };
      if (ans.q2 === "Ha") return { doc: "Pediatr", room: "2-xona", isUrgent: false, ticket: "P" };
      return { doc: "Terapevt", room: "12-xona", isUrgent: false, ticket: "T" };
    }
  },
  "Nafas qisilishi": {
    questions: [
      { id: "q1", text: "Gapirganda yoki yurganda qattiq qiynalasizmi?", options: ["Ha", "Yo'q"] },
      { id: "q2", text: "Ko'krakda og'riq bormi?", options: ["Ha", "Yo'q"] }
    ],
    evaluate: (ans: any) => {
      return { doc: "Shoshilinch yordam (103)", room: "Tez yordam", isUrgent: true, ticket: "SH" };
    }
  },
  "Quloq og'rig'i": {
    questions: [
      { id: "q1", text: "Isitma bormi?", options: ["Ha", "Yo'q"] },
      { id: "q2", text: "Quloqdan yiring yoki ajralma kelyaptimi?", options: ["Ha", "Yo'q"] }
    ],
    evaluate: (ans: any) => {
      return { doc: "LOR (Otolaringolog)", room: "8-xona", isUrgent: false, ticket: "L" };
    }
  },
  "Bel og'rig'i": {
    questions: [
      { id: "q1", text: "Og'riq oyoqqa qarab tarqalyaptimi?", options: ["Ha", "Yo'q"] },
      { id: "q2", text: "Harakatlanganda og'riq kuchayadimi?", options: ["Ha", "Yo'q"] }
    ],
    evaluate: (ans: any) => {
      if (ans.q1 === "Ha") return { doc: "Nevrolog", room: "5-xona", isUrgent: false, ticket: "N" };
      return { doc: "Terapevt", room: "12-xona", isUrgent: false, ticket: "T" };
    }
  },
  "Qusish": {
    questions: [
      { id: "q1", text: "Suvsizlanish bormi (suv icha olyapsizmi)?", options: ["Ha, kuchli suvsizlanish", "Yo'q, suv ichyapman"] },
      { id: "q2", text: "Qorin sohasida og'riq bormi?", options: ["Ha", "Yo'q"] }
    ],
    evaluate: (ans: any) => {
      if (ans.q1 === "Ha, kuchli suvsizlanish") return { doc: "Shoshilinch yordam (103)", room: "Tez yordam", isUrgent: true, ticket: "SH" };
      return { doc: "Gastroenterolog", room: "4-xona", isUrgent: false, ticket: "G" };
    }
  }
};

export function TriageDemoSection() {
  const [state, setState] = useState<DemoState>("category_select");
  const [activeCategory, setActiveCategory] = useState<string>("Bosh og'rig'i");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [resultData, setResultData] = useState<any>({});

  // 1-Qadam: Tayyor kasalliklardan birini tanlash
  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setState("questions");
  };

  // 2-Qadam: Dinamik savollarga javob berish
  const handleAnswerClick = (answer: string) => {
    const categoryData = triageDatabase[activeCategory];
    const questionId = categoryData.questions[currentQuestionIndex].id;
    
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    
    // Keyingi savolga o'tish yoki natijani chiqarish
    if (currentQuestionIndex < categoryData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finalizeTriage(newAnswers, categoryData);
    }
  };

  // 3-Qadam: AI Tahlili va Natija
  const finalizeTriage = (finalAnswers: Record<string, string>, categoryData: any) => {
    setState("analyzing");
    
    const evalResult = categoryData.evaluate(finalAnswers);
    const finalTicket = `#${evalResult.ticket}-${Math.floor(Math.random() * 50) + 1}`;
    
    setResultData({
      ...evalResult,
      ticketNumber: finalTicket
    });
    
    setTimeout(() => setState("result"), 2500);
  };

  const handleReset = () => {
    setState("category_select");
    setAnswers({});
  };

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-4 md:mb-12">
          3-Bosqichli aqlli saralash
        </h2>
        
        <p className="text-lg md:text-2xl lg:text-3xl text-gray-600 text-center mb-8 md:mb-16">
          Shikoyat → Birlamchi savollar → To'g'ri mutaxassis
        </p>

        {/* Kiosk Container */}
        <div className="bg-gray-100 rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 lg:p-12 shadow-2xl border-4 md:border-8 border-gray-300 relative overflow-hidden">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 min-h-[400px] md:min-h-[600px] flex flex-col justify-center transition-all duration-500">
            
            {/* 1-BOSQICH: KASALLIKNI TANLASH (Tugmalar tarmog'i) */}
            {state === "category_select" && (
              <div className="flex flex-col items-center justify-center flex-1 animate-in fade-in duration-500 w-full">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 md:mb-12 text-center leading-tight">
                  Sizni nima bezovta qilyapti?
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl">
                  {Object.keys(triageDatabase).map((catName) => (
                    <button
                      key={catName}
                      onClick={() => handleCategorySelect(catName)}
                      className="bg-blue-50 hover:bg-[#0056D2] hover:text-white text-[#0056D2] text-xl md:text-2xl font-medium px-6 py-6 md:py-8 rounded-2xl md:rounded-3xl border-2 border-blue-200 hover:border-[#0056D2] transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <Activity className="w-6 h-6 md:w-8 md:h-8 opacity-70" />
                      {catName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2-BOSQICH: DINAMIK SAVOLLAR */}
            {state === "questions" && (
              <div className="flex flex-col justify-center flex-1 animate-in slide-in-from-right-8 duration-500">
                <div className="mb-2 text-[#0056D2] font-semibold text-lg md:text-xl flex items-center gap-2">
                  <span className="bg-blue-100 px-3 py-1 rounded-lg">Shikoyat: {activeCategory}</span>
                  <ChevronRight className="w-5 h-5" />
                  <span>Savol {currentQuestionIndex + 1} / {triageDatabase[activeCategory].questions.length}</span>
                </div>
                
                <div className="mb-6 md:mb-12 mt-4">
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-10 leading-tight">
                    {triageDatabase[activeCategory].questions[currentQuestionIndex].text}
                  </h3>
                  
                  <div className="space-y-4 md:space-y-6">
                    {triageDatabase[activeCategory].questions[currentQuestionIndex].options.map((option: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerClick(option)}
                        className="w-full bg-white hover:bg-blue-50 text-gray-900 text-xl md:text-3xl px-6 py-5 md:px-10 md:py-8 rounded-2xl md:rounded-3xl border-2 md:border-4 border-gray-300 hover:border-[#0056D2] hover:shadow-lg transition-all duration-200 text-left"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAHLIL KUTISH EKRANI */}
            {state === "analyzing" && (
              <div className="flex flex-col items-center justify-center flex-1 animate-in fade-in duration-300">
                <Loader2 className="w-16 h-16 md:w-24 md:h-24 text-[#0056D2] animate-spin mb-6 md:mb-8" strokeWidth={2} />
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 text-center leading-tight">
                  Ma'lumotlar tahlil qilinmoqda...
                </h3>
                <p className="text-base md:text-xl lg:text-2xl text-gray-600 text-center animate-pulse">
                  Javoblaringiz asosida eng mos mutaxassis izlanmoqda
                </p>
              </div>
            )}

            {/* 3-BOSQICH: NATIJA VA SHIFOKOR EKRANI */}
            {state === "result" && (
              <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center flex-1 animate-in zoom-in-95 duration-500">
                
                {/* Chap tomon: Bemor chiptasi */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
                  {resultData.isUrgent ? (
                    <AlertTriangle className="w-20 h-20 md:w-28 md:h-28 text-red-500 mb-4 animate-bounce" strokeWidth={2} />
                  ) : (
                    <CheckCircle className="w-20 h-20 md:w-28 md:h-28 text-[#10b981] mb-4" strokeWidth={2} />
                  )}
                  
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                    Sizning yo'llanmangiz
                  </h3>
                  
                  <div className={`w-full h-full border-2 md:border-4 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden flex flex-col justify-center ${resultData.isUrgent ? 'bg-red-50 border-red-500' : 'bg-green-50 border-[#10b981]'}`}>
                    {resultData.isUrgent && (
                      <div className="absolute top-0 left-0 w-full bg-red-500 text-white text-center py-2 font-bold text-sm md:text-lg animate-pulse uppercase tracking-wider">
                        Shoshilinch Holat
                      </div>
                    )}
                    <div className={`space-y-4 md:space-y-8 relative z-10 ${resultData.isUrgent ? 'mt-6' : ''}`}>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3 md:pb-6">
                        <span className="text-lg md:text-2xl text-gray-700">Mutaxassis:</span>
                        <span className={`text-xl md:text-3xl font-bold text-right ${resultData.isUrgent ? 'text-red-700' : 'text-gray-900'}`}>{resultData.doc}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3 md:pb-6">
                        <span className="text-lg md:text-2xl text-gray-700">Xona:</span>
                        <span className="text-xl md:text-3xl font-bold text-gray-900">{resultData.room}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg md:text-2xl text-gray-700">Navbat:</span>
                        <span className={`text-3xl md:text-5xl font-bold ${resultData.isUrgent ? 'text-red-600' : 'text-[#0056D2]'}`}>{resultData.ticketNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* O'ng tomon: Shifokor ekrani */}
                <div className="w-full lg:w-1/2 bg-gray-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-gray-200 shadow-inner flex flex-col">
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
                    <ClipboardList className="w-8 h-8 md:w-10 md:h-10 text-[#0056D2]" />
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-gray-900">Shifokor ekrani</h4>
                      <p className="text-sm md:text-base text-gray-500">Bemor kirishidan oldingi ma'lumot</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                    <div className="bg-white p-3 md:p-4 rounded-xl border border-gray-200">
                      <p className="text-sm md:text-sm text-gray-500 mb-1">Dastlabki shikoyat:</p>
                      <p className="text-base md:text-xl font-semibold text-gray-900">
                        {activeCategory}
                      </p>
                    </div>
                    
                    {/* Bemordan olingan javoblar */}
                    {triageDatabase[activeCategory].questions.map((q: any) => (
                      <div key={q.id} className="bg-white p-3 md:p-4 rounded-xl border border-gray-200">
                        <p className="text-sm md:text-sm text-gray-500 mb-1">{q.text}</p>
                        <p className={`text-base md:text-lg font-medium ${answers[q.id]?.includes('Ha') && resultData.isUrgent ? 'text-red-600' : 'text-[#0056D2]'}`}>
                          {answers[q.id] || "Javob berilmadi"}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={handleReset}
                    className="mt-6 w-full bg-[#0056D2] hover:bg-[#004bb8] text-white text-lg md:text-2xl px-6 py-4 rounded-xl md:rounded-2xl flex justify-center items-center gap-2 md:gap-4 transition-all duration-200 shadow-lg"
                  >
                    <RotateCcw className="w-6 h-6 md:w-8 md:h-8" />
                    Yangi bemorni qabul qilish
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
