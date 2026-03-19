import { Link, useLocation } from "react-router-dom";
import { Activity } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  
  // Faol sahifa uchun chiroyli "kapsula" stili
  const isActive = (path: string) => {
    return location.pathname === path 
      ? "bg-white text-[#0056D2] shadow-sm rounded-full" 
      : "text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-full transition-all";
  };

  return (
    <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full px-4 py-2 flex justify-between items-center w-full max-w-5xl transition-all duration-300">
        
        <Link to="/" className="flex items-center gap-2 px-3 py-2 group">
          <div className="bg-gradient-to-tr from-[#0056D2] to-blue-400 p-2 rounded-full shadow-md group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
            MedRoute
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1 p-1 bg-gray-100/40 rounded-full border border-gray-200/50">
          <Link to="/" className={`px-5 py-2.5 font-medium text-sm transition-all duration-300 ${isActive("/")}`}>Asosiy</Link>
          <Link to="/kiosk" className={`px-5 py-2.5 font-medium text-sm transition-all duration-300 ${isActive("/kiosk")}`}>Kiosk</Link>
          <Link to="/tablo" className={`px-5 py-2.5 font-medium text-sm transition-all duration-300 ${isActive("/tablo")}`}>Tablo</Link>
          <Link to="/dorixona" className={`px-5 py-2.5 font-medium text-sm transition-all duration-300 ${isActive("/dorixona")}`}>Dorixona</Link>
        </div>

        <div className="md:hidden flex gap-2">
          <Link to="/kiosk" className="bg-[#0056D2] text-white px-4 py-2 rounded-full text-sm font-medium">
            Kiosk
          </Link>
        </div>
        
      </nav>
    </div>
  );
}
