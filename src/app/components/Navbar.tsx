import { Link, useLocation } from "react-router-dom";
import { Activity } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  
  // Qaysi sahifadaligiga qarab menyu rangini o'zgartirish
  const isActive = (path: string) => {
    return location.pathname === path 
      ? "text-[#0056D2] font-bold border-b-2 border-[#0056D2]" 
      : "text-gray-600 hover:text-[#0056D2] transition-colors";
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 md:px-6 md:py-4 flex flex-col md:flex-row justify-between items-center gap-3">
        
        {/* Logotip */}
        <Link to="/" className="text-xl md:text-2xl font-bold text-[#0056D2] flex items-center gap-2">
          <Activity className="w-6 h-6 md:w-8 md:h-8" />
          MedRoute AI
        </Link>
        
        {/* Tugmalar qatori (Endi telefonda ham doim ko'rinadi) */}
        <div className="flex gap-4 md:gap-8 text-sm md:text-lg overflow-x-auto w-full md:w-auto justify-center pb-1 md:pb-0 scrollbar-hide">
          <Link to="/" className={`py-1 whitespace-nowrap ${isActive("/")}`}>Asosiy</Link>
          <Link to="/kiosk" className={`py-1 whitespace-nowrap ${isActive("/kiosk")}`}>Kiosk</Link>
          <Link to="/tablo" className={`py-1 whitespace-nowrap ${isActive("/tablo")}`}>Tablo</Link>
          <Link to="/dorixona" className={`py-1 whitespace-nowrap ${isActive("/dorixona")}`}>Dorixona</Link>
        </div>
        
      </div>
    </nav>
  );
}
