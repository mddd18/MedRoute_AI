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
      ? "bg-white text-[#0056D2] shadow-sm rounded-full" 
      : "text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-full transition-all";
  };

  // Telefon uchun faol sahifa stili
  const isMobileActive = (path: string) => {
    return location.pathname === path 
      ? "bg-[#0056D2] text-white shadow-md" 
      : "text-gray-600 hover:bg-gray-100";
  };

  // Menyudagi biror tugma bosilganda menyuni avtomat yopish
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    {/* "sticky top-0 w-full" orqali eng tepaga yopishib turadi */}
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col w-full">
        
        {/* Tepa qator: Logotip va Menyuni ochish tugmasi */}
        <div className="flex justify-between items-center w-full">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3 px-2 group">
            <div className="bg-gradient-to-tr from-[#0056D2] to-blue-400 p-2 md:p-2.5 rounded-xl md:rounded-full shadow-md group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
              MedRoute
            </span>
          </Link>
          
          {/* Kompyuter uchun menyu (Katta ekranda ko'rinadi) */}
          <div className="hidden md:flex items-center gap-1 p-1.5 bg-gray-100/50 rounded-full border border-gray-200/50">
            <Link to="/" className={`px-5 py-2.5 font-medium text-sm transition-all duration-300 ${isDesktopActive("/")}`}>Asosiy</Link>
            <Link to="/kiosk" className={`px-5 py-2.5 font-medium text-sm transition-all duration-300 ${isDesktopActive("/kiosk")}`}>Kiosk</Link>
            <Link to="/tablo" className={`px-5 py-2.5 font-medium text-sm transition-all duration-300 ${isDesktopActive("/tablo")}`}>Tablo</Link>
            <Link to="/dorixona" className={`px-5 py-2.5 font-medium text-sm transition-all duration-300 ${isDesktopActive("/dorixona")}`}>Dorixona</Link>
          </div>

          {/* Telefon uchun Hamburger tugmasi (Kichik ekranda ko'rinadi) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95 transition-all"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Telefon uchun ochiladigan menyu qismi */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200/60 animate-in slide-in-from-top-4 fade-in duration-300">
            <Link to="/" onClick={closeMenu} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${isMobileActive("/")}`}>
              <Home className="w-5 h-5" /> 
              Asosiy sahifa
            </Link>
            <Link to="/kiosk" onClick={closeMenu} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${isMobileActive("/kiosk")}`}>
              <MonitorSmartphone className="w-5 h-5" /> 
              Kiosk (AI Saralash)
            </Link>
            <Link to="/tablo" onClick={closeMenu} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${isMobileActive("/tablo")}`}>
              <CalendarDays className="w-5 h-5" /> 
              Shifokorlar tablosi
            </Link>
            <Link to="/dorixona" onClick={closeMenu} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${isMobileActive("/dorixona")}`}>
              <Search className="w-5 h-5" /> 
              Dorixona izlash
            </Link>
          </div>
        )}
        
      </div>
    </nav>
  );
}
