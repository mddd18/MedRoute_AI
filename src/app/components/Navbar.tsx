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
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#0056D2] flex items-center gap-2">
          <Activity className="w-8 h-8" />
          MedRoute AI
        </Link>
        <div className="hidden md:flex gap-8 text-lg">
          <Link to="/" className={`py-1 ${isActive("/")}`}>Asosiy</Link>
          <Link to="/kiosk" className={`py-1 ${isActive("/kiosk")}`}>Kiosk</Link>
          <Link to="/tablo" className={`py-1 ${isActive("/tablo")}`}>Tablo</Link>
          <Link to="/dorixona" className={`py-1 ${isActive("/dorixona")}`}>Dorixona</Link>
        </div>
      </div>
    </nav>
  );
}
