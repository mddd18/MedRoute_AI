import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Menu, X, Home, MonitorSmartphone, CalendarDays, Search } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  // Mobil menyuni ochish/yopish uchun state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Kompyuter uchun faol sahifa stili
  const isDesktopActive = (path: string) => {
    return location.pathname === path 
      ? "text-[#0056D2] font-semibold" 
      : "text-gray-600 hover:text-[#0056D2] transition-colors";
  };

  // Telefon uchun faol sahifa stili
  const isMobileActive = (path: string) => {
    return location.pathname === path 
      ? "bg-[#0056D2] text-white shadow-md" 
      : "text-gray-600 hover:bg-gray-100 transition-colors";
  };

  // Menyuni yopish funksiyasi
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logotip */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-[#0056D2] to-blue-400 p-2 rounded-xl shadow-sm group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
              MedRoute
            </span>
          </Link>
          
          {/* Kompyuter uchun menyu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-base ${isDesktopActive("/")}`}>Asosiy</Link>
            <Link to="/kiosk" className={`text-base ${isDesktopActive("/kiosk")}`}>Kiosk</Link>
            <Link to="/tablo" className={`text-base ${isDesktopActive("/tablo")}`}>Tablo</Link>
            <Link to="/dorixona" className={`text-base ${isDesktopActive("/dorixona")}`}>Dorixona</Link>
          </div>

          {/* Telefon uchun Hamburger tugmasi */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Telefon uchun ochiladigan menyu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 pb-4 pt-2 border-t border-gray-100 animate-in slide-in-from-top-2 fade-in duration-200">
            <Link to="/" onClick={closeMenu} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${isMobileActive("/")}`}>
              <Home className="w-5 h-5" /> 
              Asosiy sahifa
            </Link>
            <Link to="/kiosk" onClick={closeMenu} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${isMobileActive("/kiosk")}`}>
              <MonitorSmartphone className="w-5 h-5" /> 
              Kiosk (AI Saralash)
            </Link>
            <Link to="/tablo" onClick={closeMenu} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${isMobileActive("/tablo")}`}>
              <CalendarDays className="w-5 h-5" /> 
              Shifokorlar tablosi
            </Link>
            <Link to="/dorixona" onClick={closeMenu} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${isMobileActive("/dorixona")}`}>
              <Search className="w-5 h-5" /> 
              Dorixona izlash
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
