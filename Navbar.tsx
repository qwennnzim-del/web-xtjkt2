
import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X as XIcon, LogOut as LogOutIcon, BadgeCheck as BadgeCheckIcon } from 'lucide-react';

interface NavbarProps {
  view: string;
  setView: (v: any) => void;
  isAdmin: boolean;
  scrolled: boolean;
  onLogout: () => void;
}

const Navbar = ({ view, setView, isAdmin, scrolled, onLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [view]);

  const navItems = [
    { id: 'main', label: 'Beranda' },
    { id: 'schedule', label: 'Jadwal' },
    { id: 'groups', label: 'Matrix' },
    { id: 'gallery', label: 'Galeri' },
    { id: 'profile', label: 'Profil', icon: isAdmin ? <BadgeCheckIcon size={14} className="text-blue-500" /> : null },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 glass border-b shadow-2xl' : 'py-6 md:py-8'}`}>
        <div className="container mx-auto px-5 md:px-10 flex justify-between items-center">
          <div 
            className="group cursor-pointer flex items-center gap-3" 
            onClick={() => setView('main')}
          >
            <div className="relative">
              <div className="w-9 h-9 md:w-11 md:h-11 bg-white text-black font-serif italic font-black text-lg md:text-xl flex items-center justify-center rounded-xl rotate-[-10deg] group-hover:rotate-0 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                X
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-[#050505] z-10"></div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base md:text-xl font-tech font-bold tracking-[0.2em] text-white group-hover:text-blue-500 transition-colors">TJKT</span>
              <span className="text-[8px] md:text-[10px] font-tech text-blue-500 font-bold tracking-[0.4em] mt-1 opacity-80 group-hover:opacity-100 transition-opacity">SERIES 02</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10 text-[11px] font-tech uppercase tracking-[0.2em] font-medium">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => setView(item.id)} 
                className={`flex items-center gap-1.5 transition-all relative py-1 ${view === item.id ? 'text-white' : 'text-slate-500 hover:text-blue-400'}`}
              >
                {item.label} {item.icon}
                {view === item.id && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-500"></span>}
              </button>
            ))}
            <button 
              onClick={onLogout} 
              className="text-red-500 hover:bg-red-500/10 transition-all text-[10px] border border-red-500/20 px-5 py-2 rounded-full flex items-center gap-2"
            >
              LOGOUT <LogOutIcon size={12}/>
            </button>
          </div>

          <button 
            className="md:hidden p-2 glass rounded-xl text-white hover:text-blue-500 transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${isMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-black/80 backdrop-blur-lg transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm glass border-l border-white/10 p-10 transition-transform duration-500 flex flex-col justify-between ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="space-y-12 mt-12">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white text-black font-serif italic font-black text-2xl flex items-center justify-center rounded-xl">X</div>
               <div className="flex flex-col">
                 <span className="text-2xl font-tech font-bold tracking-widest">TJKT 2</span>
                 <span className="text-[10px] font-tech text-blue-500 tracking-[0.3em]">CLASS NETWORK</span>
               </div>
            </div>
            
            <div className="flex flex-col space-y-8">
              {navItems.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => setView(item.id)} 
                  className={`text-4xl font-serif italic text-left transition-all flex items-center gap-4 ${view === item.id ? 'text-blue-500 translate-x-2' : 'text-white hover:text-blue-400'}`}
                >
                  {item.label}
                  {item.id === 'profile' && isAdmin && <BadgeCheckIcon className="text-blue-500" size={24} />}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={onLogout} 
            className="w-full py-5 border border-red-500/30 text-red-500 font-tech text-[10px] tracking-[0.3em] rounded-2xl flex items-center justify-center gap-3 bg-red-500/5 hover:bg-red-500/10 transition-all uppercase font-bold"
          >
            TERMINATE SESSION <LogOutIcon size={16}/>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
