
import React, { useState, useEffect, useRef } from 'react';
import { Menu as MenuIcon, X as XIcon, LogOut as LogOutIcon, BadgeCheck as BadgeCheckIcon, Activity, Volume2, VolumeX, Music } from 'lucide-react';

interface NavbarProps {
  view: string;
  setView: (v: any) => void;
  isAdmin: boolean;
  scrolled: boolean;
  onLogout: () => void;
  systemStatus: string;
  currentTrack: { title: string; url: string };
}

const Navbar = ({ view, setView, isAdmin, scrolled, onLogout, systemStatus, currentTrack }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [view]);

  useEffect(() => {
    if (audioRef.current && currentTrack.url) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed, user interaction needed."));
    }
    setIsPlaying(!isPlaying);
  };

  const navItems = [
    { id: 'main', label: 'Rumah' },
    { id: 'schedule', label: 'Cek Jadwal' },
    { id: 'groups', label: 'Kelompok' },
    { id: 'gallery', label: 'Foto Momen' },
    { id: 'profile', label: 'Profil Saya', icon: isAdmin ? <BadgeCheckIcon size={14} className="text-accent" /> : null },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 glass border-b shadow-2xl' : 'py-6 md:py-8'}`}>
        <div className="container mx-auto px-5 md:px-10 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div 
              className="group cursor-pointer flex items-center gap-3" 
              onClick={() => setView('main')}
            >
              <div className="relative animate-in fade-in slide-in-from-left-10 duration-1000 ease-out">
                <div className="w-9 h-9 md:w-11 md:h-11 bg-white text-black font-serif italic font-black text-lg md:text-xl flex items-center justify-center rounded-xl rotate-[-10deg] group-hover:rotate-0 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  X
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-[#050505] z-10 transition-colors duration-1000"></div>
              </div>
              <div className="flex flex-col leading-none animate-in fade-in slide-in-from-left-5 duration-1000 delay-300 ease-out">
                <span className="text-base md:text-xl font-tech font-bold tracking-[0.2em] text-white group-hover:text-accent transition-colors">TJKT</span>
                <span className="text-[8px] md:text-[10px] font-tech text-accent font-bold tracking-[0.4em] mt-1 opacity-80 group-hover:opacity-100 transition-all duration-1000">ANGKATAN 2</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-white/10">
              <Activity size={12} className={systemStatus === 'Optimal' ? 'text-green-500 animate-pulse' : systemStatus === 'Maintenance' ? 'text-amber-500' : 'text-red-500'} />
              <span className="text-[8px] font-tech text-slate-500 uppercase tracking-[0.2em]">Kondisi: <span className="text-white">{systemStatus === 'Optimal' ? 'Aman' : systemStatus}</span></span>
            </div>
          </div>

          <div className="hidden lg:flex glass px-4 py-2 rounded-full items-center gap-4 border-white/5 mx-4 max-w-[200px] overflow-hidden">
            <button onClick={toggleAudio} className={`p-2 rounded-full transition-all ${isPlaying ? 'bg-accent text-white animate-pulse' : 'bg-white/5 text-slate-500 hover:text-white'}`}>
              {isPlaying ? <Volume2 size={12}/> : <VolumeX size={12}/>}
            </button>
            <div className="flex flex-col overflow-hidden whitespace-nowrap">
              <span className="text-[7px] font-tech text-slate-500 uppercase tracking-widest">Lagi Putar</span>
              <div className={`text-[9px] font-tech text-white uppercase tracking-tighter ${isPlaying ? 'animate-marquee' : ''}`}>
                {currentTrack.title || 'Mencari sinyal lagu...'}
              </div>
            </div>
            <audio ref={audioRef} loop />
          </div>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10 text-[11px] font-tech uppercase tracking-[0.2em] font-medium">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => setView(item.id)} 
                className={`flex items-center gap-1.5 transition-all relative py-1 ${view === item.id ? 'text-white' : 'text-slate-500 hover:text-accent'}`}
              >
                {item.label} {item.icon}
                {view === item.id && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent transition-colors duration-1000"></span>}
              </button>
            ))}
            <button onClick={onLogout} className="text-red-500 transition-all text-[10px] border border-red-500/20 px-4 py-2 rounded-full hover:bg-red-500/10"><LogOutIcon size={12}/></button>
          </div>

          <button className="md:hidden p-2 glass rounded-xl text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}><MenuIcon size={24} /></button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${isMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/80 backdrop-blur-lg transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm glass border-l border-white/10 p-10 transition-transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col justify-between`}>
          <div className="space-y-12 mt-12">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white text-black font-serif italic font-black text-2xl flex items-center justify-center rounded-xl">X</div>
               <div className="flex flex-col">
                 <span className="text-2xl font-tech font-bold">TJKT 2</span>
                 <button onClick={toggleAudio} className="flex items-center gap-2 text-[10px] text-accent mt-1 uppercase tracking-widest font-bold">
                   <Music size={12}/> {isPlaying ? 'Musik: On' : 'Musik: Mati'}
                 </button>
               </div>
            </div>
            <div className="flex flex-col space-y-8">
              {navItems.map(item => (
                <button key={item.id} onClick={() => setView(item.id)} className={`text-4xl font-serif italic text-left ${view === item.id ? 'text-accent' : 'text-white hover:text-accent'}`}>{item.label}</button>
              ))}
            </div>
          </div>
          <button onClick={onLogout} className="w-full py-5 border border-red-500/30 text-red-500 font-tech text-[10px] rounded-2xl flex items-center justify-center gap-3 uppercase font-bold">KELUAR DULU YA <LogOutIcon size={16}/></button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
