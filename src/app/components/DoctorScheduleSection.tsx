import { useState } from "react";
import { Stethoscope, Clock, MapPin, CalendarDays, CheckCircle2, AlertCircle, Search } from "lucide-react";

// Shifokorlar ro'yxati va jadvallari (Mock ma'lumotlar)
const doctorsSchedule = [
  {
    id: 1,
    name: "Dr. Alisher Vahobov",
    specialty: "Kardiolog",
    room: "6-xona",
    days: "Dush - Juma",
    hours: "08:00 - 14:00",
    status: "active", // active, wait, inactive
    statusText: "Hozir qabulda"
  },
  {
    id: 2,
    name: "Dr. Malika Karimova",
    specialty: "Pediatr",
    room: "2-xona",
    days: "Dush - Shanba",
    hours: "08:00 - 16:00",
    status: "active",
    statusText: "Hozir qabulda"
  },
  {
    id: 3,
    name: "Dr. Rustam To'rayev",
    specialty: "Nevrolog",
    room: "5-xona",
    days: "Dush - Juma",
    hours: "14:00 - 20:00",
    status: "wait",
    statusText: "Tushlik vaqtida (13:00-14:00)"
  },
  {
    id: 4,
    name: "Dr. Nilufar Qosimova",
    specialty: "Terapevt",
    room: "12-xona",
    days: "Har kuni",
    hours: "08:00 - 20:00",
    status: "active",
    statusText: "Hozir qabulda"
  },
  {
    id: 5,
    name: "Dr. Sanjarbek Aliyev",
    specialty: "Jarroh (Xirurg)",
    room: "14-xona",
    days: "Sesh - Shanba",
    hours: "09:00 - 15:00",
    status: "inactive",
    statusText: "Ish vaqti tugagan"
  },
  {
    id: 6,
    name: "Dr. Feruza Oripova",
    specialty: "LOR",
    room: "8-xona",
    days: "Dush, Chor, Juma",
    hours: "08:00 - 13:00",
    status: "inactive",
    statusText: "Bugun qabul yo'q"
  }
];

export function DoctorScheduleSection() {
  const [searchTerm, setSearchTerm] = useState("");

  // Shifokorlarni qidiruv bo'yicha filtrlash
  const filteredDoctors = doctorsSchedule.filter(doc => 
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col items-center mb-10 md:mb-16">
          <div className="bg-[#0056D2] p-4 rounded-2xl md:rounded-3xl mb-4 md:mb-6 shadow-lg">
            <CalendarDays className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center leading-tight mb-4">
            Shifokorlar ish jadvali
          </h2>
          <p className="text-lg md:text-2xl lg:text-3xl text-gray-600 text-center max-w-4xl">
            Sizga kerakli mutaxassis ayni vaqtda poliklinikadami yoki yo'q? Barchasini jonli tablodan kuzating.
          </p>
        </div>

        {/* Qidiruv qismi */}
        <div className="mb-8 md:mb-12 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Mutaxassislik yoki shifokor ismini kiriting..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-lg md:text-2xl px-6 py-4 md:px-8 md:py-6 pl-14 md:pl-20 border-2 md:border-4 border-gray-300 rounded-2xl md:rounded-3xl focus:outline-none focus:border-[#0056D2] shadow-sm"
            />
            <Search className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 md:w-8 md:h-8" />
          </div>
        </div>

        {/* Shifokorlar ro'yxati (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-gray-100 shadow-sm hover:shadow-xl transition-all hover:border-blue-200 group">
              
              <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="bg-blue-50 p-4 md:p-5 rounded-xl md:rounded-2xl">
                    <Stethoscope className="w-8 h-8 md:w-10 md:h-10 text-[#0056D2]" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-1">{doc.name}</h3>
                    <p className="text-[#0056D2] font-semibold text-lg md:text-xl">{doc.specialty}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-6 h-6 text-gray-400" />
                  <span className="text-lg md:text-xl">{doc.room}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CalendarDays className="w-6 h-6 text-gray-400" />
                  <span className="text-lg md:text-xl">{doc.days}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-6 h-6 text-gray-400" />
                  <span className="text-lg md:text-xl font-medium">{doc.hours}</span>
                </div>
                
                {/* Status qismi */}
                <div className="flex items-center gap-3">
                  {doc.status === "active" && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                  {doc.status === "wait" && <AlertCircle className="w-6 h-6 text-orange-500" />}
                  {doc.status === "inactive" && <AlertCircle className="w-6 h-6 text-red-500" />}
                  
                  <span className={`text-lg md:text-xl font-bold 
                    ${doc.status === "active" ? "text-green-600" : 
                      doc.status === "wait" ? "text-orange-600" : "text-red-600"}`}>
                    {doc.statusText}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
        
        {/* Qidiruv natija topmasa */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl md:text-3xl text-gray-500">Kechirasiz, bunday shifokor yoki mutaxassislik topilmadi.</p>
          </div>
        )}

      </div>
    </section>
  );
}
