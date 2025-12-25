
import React, { useState } from 'react';
import { 
  ShieldCheck, Camera, Zap, Globe, Cpu, Users, ArrowRight, 
  Activity, Database, Network, Server, Settings, Wrench, Code, Shield, Plus, ChevronDown
} from 'lucide-react';

interface MainViewProps {
  isAdmin: boolean;
  members: any[];
  setMembers: (m: any) => void;
  userProfile: any;
}

const MainView = ({ isAdmin, members, setMembers, userProfile }: MainViewProps) => {
  const [showAllMembers, setShowAllMembers] = useState(false);

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMembers = [...members];
        newMembers[index].image = reader.result as string;
        setMembers(newMembers);
      };
      reader.readAsDataURL(file);
    }
  };

  const coreValues = [
    { icon: <Network size={22} />, title: 'KONEKTIVITAS', desc: 'Membangun hubungan antar siswa yang stabil tanpa hambatan.' },
    { icon: <ShieldCheck size={22} />, title: 'INTEGRITAS', desc: 'Menjaga keamanan moral dan etika dalam setiap tindakan digital.' },
    { icon: <Zap size={22} />, title: 'EFISIENSI', desc: 'Bekerja cepat dengan hasil maksimal dalam setiap penugasan.' },
    { icon: <Database size={22} />, title: 'KOLABORASI', desc: 'Berbagi resource dan pengetahuan untuk kemajuan bersama.' },
  ];

  const expertiseFields = [
    { icon: <Server size={24} />, title: 'Network Administrator', desc: 'Mengelola infrastruktur jaringan inti dan optimasi bandwidth.' },
    { icon: <Settings size={24} />, title: 'System Administrator', desc: 'Konfigurasi server, otomasi sistem, dan manajemen database.' },
    { icon: <Wrench size={24} />, title: 'Technical IT', desc: 'Troubleshooting hardware dan pemeliharaan infrastruktur komputasi.' },
    { icon: <Activity size={24} />, title: 'Network Engineer', desc: 'Desain arsitektur jaringan kompleks dan switching tingkat lanjut.' },
    { icon: <Shield size={24} />, title: 'Security Specialist', desc: 'Proteksi data, audit keamanan, dan pertahanan siber kelas satu.' },
    { icon: <Code size={24} />, title: 'Web Development', desc: 'Membangun antarmuka modern dan sistem web yang responsif.' },
  ];

  const visibleMembers = showAllMembers ? members : members.slice(0, 8);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center pt-32 pb-16 px-5 md:px-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[90vw] h-[90vw] bg-blue-600/[0.03] blur-[120px] rounded-full -z-10"></div>
        
        <div className="container mx-auto max-w-7xl relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10 md:gap-20">
            <div className="flex-1">
              <p className="font-tech text-slate-500 mb-2 tracking-[0.5em] uppercase text-[9px] md:text-[10px] font-medium opacity-60">
                SMK NURUL ISLAM AFFANDIYAH
              </p>
              <p className="font-tech text-blue-500 mb-6 tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold flex items-center gap-3">
                <span className="w-6 md:w-10 h-[1px] bg-blue-500/50"></span>
                {isAdmin ? 'ADMIN ACCESS GRANTED' : `TERMINAL: ${userProfile.name?.split(' ')[0] || 'GUEST'}`}
              </p>
              <h1 className="hero-text font-serif italic text-white mb-8">
                The New <br />
                <span className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-400">Standard of</span> <br />
                X TJKT 2
              </h1>
              <p className="max-w-xl text-slate-400 leading-relaxed font-light text-base md:text-xl italic border-l border-blue-500/20 pl-6 md:pl-8">
                "{userProfile.bio || 'Membangun masa depan melalui infrastruktur jaringan yang kokoh dan solidaritas tanpa batas.'}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full lg:w-[350px]">
              {[
                { val: '46', label: 'Active Nodes' },
                { val: '99%', label: 'Uptime Solid' },
                { val: '2025', label: 'Release Year' },
                { val: 'TJKT', label: 'Protocol' }
              ].map((stat, i) => (
                <div key={i} className="glass p-5 md:p-6 rounded-[28px] border-white/5 group hover:bg-white/[0.02] transition-colors">
                  <div className="text-2xl md:text-3xl font-serif text-white mb-1 group-hover:text-blue-500 transition-colors">{stat.val}</div>
                  <div className="text-[9px] font-tech text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
            <button 
              onClick={() => document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 bg-white text-black font-tech font-bold text-[11px] tracking-widest rounded-full hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3 uppercase shadow-xl shadow-white/5 active:scale-95"
            >
              Explore Network <ArrowRight size={16} />
            </button>
            <div className="flex items-center gap-3 text-slate-600 font-tech text-[9px] md:text-[10px] uppercase tracking-widest bg-white/5 px-5 py-2 rounded-full border border-white/5">
              <Activity size={14} className="text-blue-500 animate-pulse" /> System status: Optimal
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 md:py-32 px-5 md:px-10 bg-white/[0.005]">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 md:mb-20 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-4 leading-tight">Prinsip Kerja</h2>
            <p className="font-tech text-slate-500 uppercase tracking-[0.3em] text-[10px] md:text-xs">Arsitektur dasar kekuatan X TJKT 2</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {coreValues.map((val, i) => (
              <div key={i} className="glass p-8 md:p-10 rounded-[35px] border-white/5 hover:border-blue-500/20 transition-all group hover:-translate-y-2 duration-500">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 md:mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {val.icon}
                </div>
                <h3 className="text-lg md:text-xl font-tech font-bold text-white mb-3 md:mb-4 tracking-tight">{val.title}</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 md:py-32 px-5 md:px-10 relative overflow-hidden">
        <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-6 leading-none">Bidang Keahlian</h2>
              <p className="text-slate-400 font-tech text-xs md:text-sm uppercase tracking-[0.3em] max-w-md">Spesialisasi teknologi yang dikembangkan di lingkungan X TJKT 2</p>
            </div>
            <div className="hidden lg:block h-[1px] flex-1 mx-12 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseFields.map((field, i) => (
              <div key={i} className="group glass p-8 rounded-[40px] border-white/5 hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/5 blur-2xl rounded-full group-hover:bg-blue-600/20 transition-all"></div>
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
                  {field.icon}
                </div>
                <h3 className="text-2xl font-serif italic text-white mb-4 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                  {field.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light mb-6 opacity-80 group-hover:opacity-100">
                  {field.desc}
                </p>
                <div className="flex items-center gap-2 text-[8px] font-tech text-blue-500 tracking-[0.4em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                  Expertise Node <ArrowRight size={10} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Squad Directory Section */}
      <section id="squad" className="py-24 md:py-32 px-5 md:px-10 bg-[#030303] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/[0.03] blur-[150px] rounded-full"></div>
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-20 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-8xl font-serif italic text-white leading-[0.9] mb-6">Skuad Kami</h2>
              <p className="text-slate-500 font-tech text-xs md:text-sm uppercase tracking-[0.2em] max-w-md">Koleksi pikiran terbaik dalam satu jaringan transmisi data yang terintegrasi</p>
            </div>
            <div className="glass px-6 py-3 rounded-2xl border-white/10 flex items-center gap-3">
              <Users size={16} className="text-blue-500" />
              <span className="font-tech text-[10px] tracking-widest text-white uppercase">{members.length} Members Synchronized</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 transition-all duration-700 ease-in-out">
            {visibleMembers.map((member, i) => (
              <div 
                key={member.name}
                style={{ 
                  animationDelay: `${(i % 8) * 100}ms`,
                  animationFillMode: 'backwards' 
                }}
                className={`group glass p-6 md:p-8 rounded-[32px] hover:bg-white/[0.06] transition-all duration-700 border-l-[3px] animate-in fade-in slide-in-from-bottom-8 duration-1000 ${member.priority ? 'border-blue-500 shadow-lg shadow-blue-500/5' : 'border-transparent'}`}
              >
                <div className="flex justify-between items-start mb-6 md:mb-8">
                  <div className="relative group/avatar w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center bg-white/[0.02] transition-all duration-500 group-hover:scale-105">
                    {member.image ? (
                      <img src={member.image} className="w-full h-full object-cover" alt={member.name} />
                    ) : (
                      <span className="text-2xl font-serif italic text-blue-500/40">{member.name[0]}</span>
                    )}
                    {isAdmin && (
                      <label className="absolute inset-0 bg-blue-600/90 opacity-0 group-hover/avatar:opacity-100 transition-all cursor-pointer flex flex-col items-center justify-center">
                        <Camera size={18} className="text-white" />
                        <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(i, e)} />
                      </label>
                    )}
                  </div>
                  {member.priority ? (
                    <div className="flex flex-col items-end">
                       <ShieldCheck size={20} className="text-blue-500 mb-1" />
                       <span className="text-[7px] font-tech text-blue-400 uppercase tracking-tighter">Core Node</span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-tech text-slate-700 font-bold">#{String(i + 1).padStart(2, '0')}</span>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-serif italic text-white group-hover:text-blue-400 transition-colors uppercase leading-none mb-3 truncate pr-4">
                  {member.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${member.priority ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'}`}></div>
                  <p className="text-[9px] font-tech uppercase tracking-[0.25em] text-slate-500 truncate">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {members.length > 8 && (
            <div className="mt-16 flex justify-center">
              <button 
                onClick={() => setShowAllMembers(!showAllMembers)}
                className="group relative px-12 py-5 rounded-full overflow-hidden transition-all active:scale-95"
              >
                <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors"></div>
                <div className="absolute inset-0 border border-white/10 group-hover:border-blue-500/50 rounded-full transition-all"></div>
                <span className="relative font-tech text-[10px] font-bold tracking-[0.4em] text-white uppercase flex items-center gap-4">
                  {showAllMembers ? (
                    <>Sembunyikan Skuad <ChevronDown size={14} className="rotate-180 transition-transform duration-500" /></>
                  ) : (
                    <>Lihat Semua Skuad <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform duration-500" /></>
                  )}
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lab Highlights Section */}
      <section className="py-24 md:py-32 px-5 md:px-10">
        <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="relative max-w-md mx-auto lg:ml-0">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/10 blur-3xl rounded-full"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square glass rounded-[35px] flex items-center justify-center p-8 md:p-12 border-blue-500/20 group hover:bg-blue-600/10 transition-all cursor-help hover:rotate-3">
                  <Cpu size={60} className="text-blue-500/40 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="aspect-square glass rounded-[35px] translate-y-6 md:translate-y-10 flex items-center justify-center p-8 md:p-12 border-blue-500/20 group hover:bg-blue-600/10 transition-all cursor-help hover:-rotate-3">
                  <Globe size={60} className="text-blue-500/40 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl md:text-7xl font-serif italic text-white mb-8 leading-tight">Ready for the <br className="hidden md:block" /> <span className="not-italic text-blue-500">Next Gen Lab.</span></h2>
            <div className="space-y-6 md:space-y-8">
              <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                Kami bukan sekadar kelas. Kami adalah inkubator bagi para calon ahli jaringan masa depan. Dengan fasilitas Lab yang memadai dan kurikulum yang tajam, kami siap menghadapi industri 5.0.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {['Cisco', 'Mikrotik', 'Linux', 'Cyber Security'].map((tool, i) => (
                  <span key={i} className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] font-tech text-slate-400 uppercase tracking-widest">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainView;
