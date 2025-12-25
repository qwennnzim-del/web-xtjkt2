
import React, { useState } from 'react';
import { 
  ShieldCheck, Camera, Zap, Users, ArrowRight, 
  Activity, Network, Edit2, Megaphone, Target, Search, RefreshCw, Music, Link, Info
} from 'lucide-react';

interface MainViewProps {
  isAdmin: boolean;
  members: any[];
  setMembers: (m: any) => void;
  announcement: string;
  setAnnouncement: (a: string) => void;
  systemStatus: string;
  setSystemStatus: (s: string) => void;
  currentTrack: { title: string; url: string };
  setTrack: (t: { title: string; url: string }) => void;
  userProfile: any;
}

const MainView = ({ isAdmin, members, setMembers, announcement, setAnnouncement, systemStatus, setSystemStatus, currentTrack, setTrack, userProfile }: MainViewProps) => {
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [isEditingAnnounce, setIsEditingAnnounce] = useState(false);
  const [isEditingVibe, setIsEditingVibe] = useState(false);
  const [vibeData, setVibeData] = useState(currentTrack);

  const getStatusColor = () => {
    if (systemStatus === 'Emergency') return 'text-red-500';
    if (systemStatus === 'Maintenance') return 'text-amber-500';
    return 'text-accent';
  };

  const handleUpdateVibe = () => {
    if (!vibeData.url.startsWith('http')) {
      alert("Gunakan URL yang valid (dimulai dengan http:// atau https://)");
      return;
    }
    setTrack(vibeData);
    setIsEditingVibe(false);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Broadcast Banner */}
      <div className="fixed top-24 md:top-28 left-0 w-full z-40 px-5 md:px-10 pointer-events-none">
        <div className="container mx-auto max-w-7xl">
          <div className="glass p-4 md:p-6 rounded-[32px] border-accent/20 bg-accent/10 pointer-events-auto flex flex-col md:flex-row items-center gap-4 md:gap-8 animate-in slide-in-from-top-10 duration-700">
            <div className="flex items-center gap-3">
              <Megaphone size={18} className={`${getStatusColor()} animate-bounce`} />
              <span className={`text-[10px] font-tech ${getStatusColor()} uppercase tracking-widest font-bold`}>BROADCAST:</span>
            </div>
            {isEditingAnnounce ? (
              <div className="flex-1 flex flex-wrap md:flex-nowrap gap-3 w-full">
                <input className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs font-tech outline-none focus:border-accent" value={announcement} onChange={(e) => setAnnouncement(e.target.value)} />
                <select className="bg-black/40 border border-white/10 rounded-xl px-3 text-white text-[10px] font-tech py-2" value={systemStatus} onChange={(e) => setSystemStatus(e.target.value)}>
                  <option value="Optimal">Optimal</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Emergency">Emergency</option>
                </select>
                <button onClick={() => setIsEditingAnnounce(false)} className="px-6 py-2 bg-accent text-white text-[10px] font-tech rounded-xl">SAVE</button>
              </div>
            ) : (
              <div className="flex-1 text-xs font-tech text-white italic truncate">{announcement}</div>
            )}
            {isAdmin && <button onClick={() => setIsEditingAnnounce(!isEditingAnnounce)} className="p-2 text-slate-500 hover:text-white transition-colors"><Edit2 size={14}/></button>}
          </div>
        </div>
      </div>

      <section className="min-h-screen flex flex-col justify-center pt-52 pb-16 px-5 md:px-10 relative">
        <div className="container mx-auto max-w-7xl">
          <h1 className="hero-text font-serif italic text-white mb-8">
            The New <br />
            <span className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">Standard of</span> <br />
            X TJKT 2
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button onClick={() => document.getElementById('squad')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-white text-black font-tech font-bold text-[11px] tracking-widest rounded-full hover:bg-accent hover:text-white transition-all uppercase flex items-center gap-3">Explore <ArrowRight size={16}/></button>
            <div className="flex items-center gap-3 text-slate-600 font-tech text-[9px] uppercase tracking-widest bg-white/5 px-5 py-2 rounded-full border border-white/5">
              <Activity size={14} className={`${getStatusColor()} animate-pulse`} /> Status: {systemStatus}
            </div>
          </div>
        </div>
      </section>

      {/* Admin Vibe Control Panel */}
      {isAdmin && (
        <section className="py-20 px-5 md:px-10 bg-[#080808]">
          <div className="container mx-auto max-w-7xl">
            <div className="glass p-10 md:p-16 rounded-[50px] border-accent/10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <p className="text-accent font-tech text-[10px] tracking-[0.4em] uppercase mb-4">Acoustic Terminal</p>
                <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-6">Class Vibe Control</h2>
                <p className="text-slate-500 font-tech text-xs tracking-widest uppercase mb-8">Ganti suasana kelas secara instan dengan memasukkan stream audio global.</p>
                
                {isEditingVibe ? (
                  <div className="space-y-4 max-w-md animate-in fade-in zoom-in duration-300">
                    <div className="relative">
                      <Music className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16}/>
                      <input className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-xs font-tech" placeholder="Judul Lagu..." value={vibeData.title} onChange={e => setVibeData({...vibeData, title: e.target.value})}/>
                    </div>
                    <div className="relative">
                      <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16}/>
                      <input className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-xs font-tech" placeholder="Direct MP3 Link URL..." value={vibeData.url} onChange={e => setVibeData({...vibeData, url: e.target.value})}/>
                    </div>
                    
                    {/* Helper Text for Admin */}
                    <div className="p-4 bg-accent/5 border border-accent/10 rounded-2xl flex gap-3 items-start">
                      <Info size={16} className="text-accent shrink-0 mt-0.5" />
                      <p className="text-[10px] font-tech text-slate-400 leading-relaxed uppercase tracking-wider">
                        Tips: Gunakan link langsung berakhiran <span className="text-white">.mp3</span>. Upload lagu ke <span className="text-accent underline">catbox.moe</span> atau <span className="text-accent underline">discord</span> lalu copy link file-nya.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={handleUpdateVibe} className="flex-1 py-4 bg-accent text-white font-tech font-bold text-[10px] rounded-xl shadow-lg shadow-accent/20">BROADCAST VIBE</button>
                      <button onClick={() => setIsEditingVibe(false)} className="px-6 py-4 bg-white/5 text-slate-500 font-tech text-[10px] rounded-xl hover:text-white transition-colors">CANCEL</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setIsEditingVibe(true)} className="px-10 py-5 border border-accent/30 text-accent font-tech font-bold text-[11px] tracking-widest rounded-2xl hover:bg-accent hover:text-white transition-all">CONFIGURE AUDIO</button>
                )}
              </div>
              <div className="w-full md:w-80 aspect-square glass rounded-[40px] flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                    <Music size={120} className="text-accent animate-spin-slow"/>
                 </div>
                 <div className="text-center p-8">
                    <div className="flex justify-center gap-1 mb-4 h-8 items-end">
                       {[0.4, 0.7, 1, 0.5, 0.9, 0.3].map((h, i) => (
                         <div key={i} className="w-1 bg-accent rounded-full animate-bounce" style={{ height: `${h * 100}%`, animationDelay: `${i * 100}ms` }}></div>
                       ))}
                    </div>
                    <span className="text-[10px] font-tech text-slate-500 uppercase block mb-1">Current Vibe</span>
                    <p className="text-white font-serif italic text-xl truncate px-4">{currentTrack.title}</p>
                 </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skuad Section */}
      <section id="squad" className="py-24 md:py-32 px-5 md:px-10 bg-[#030303]">
        <div className="container mx-auto max-w-7xl text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-serif italic text-white mb-6">Skuad Kami</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.slice(0, showAllMembers ? members.length : 8).map((m, i) => (
            <div key={i} className={`glass p-8 rounded-[32px] border-l-[3px] transition-all hover:bg-white/[0.05] ${m.priority ? 'border-accent' : 'border-transparent'}`}>
              <h3 className="text-xl font-serif italic text-white mb-2">{m.name}</h3>
              <p className="text-[9px] font-tech uppercase tracking-widest text-slate-500">{m.role}</p>
            </div>
          ))}
        </div>
        {!showAllMembers && members.length > 8 && (
          <div className="text-center mt-12">
            <button onClick={() => setShowAllMembers(true)} className="text-accent font-tech text-[10px] tracking-widest uppercase hover:underline">Lihat Semua Anggota</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default MainView;
