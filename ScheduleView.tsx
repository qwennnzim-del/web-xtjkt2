
import React, { useState } from 'react';
import { Edit3, Save, Clock, Users, Calendar, Plus, Trash2, Shield, Info } from 'lucide-react';

interface ScheduleViewProps {
  isAdmin: boolean;
  schedule: any;
  setSchedule: (s: any) => void;
}

const ScheduleView = ({ isAdmin, schedule, setSchedule }: ScheduleViewProps) => {
  const [activeDay, setActiveDay] = useState('Senin');
  const [isEditing, setIsEditing] = useState(false);
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  const currentData = schedule[activeDay] || { uniform: '-', piket: [], umum: [] };

  const handleToggleEdit = () => {
    if (!isAdmin) return;
    setIsEditing(!isEditing);
  };

  const updateField = (field: string, val: any) => {
    const updated = { ...schedule };
    if (!updated[activeDay]) updated[activeDay] = {};
    updated[activeDay][field] = val;
    setSchedule(updated);
  };

  const addSession = () => {
    const updated = { ...schedule };
    if (!updated[activeDay]) updated[activeDay] = { uniform: '-', piket: [], umum: [] };
    if (!updated[activeDay].umum) updated[activeDay].umum = [];
    updated[activeDay].umum.push({ subject: 'Mata Pelajaran Baru', time: '00.00 – 00.00' });
    setSchedule(updated);
  };

  const removeSession = (index: number) => {
    const updated = { ...schedule };
    updated[activeDay].umum.splice(index, 1);
    setSchedule(updated);
  };

  const updateSession = (index: number, field: 'subject' | 'time', value: string) => {
    const updated = { ...schedule };
    updated[activeDay].umum[index][field] = value;
    setSchedule(updated);
  };

  return (
    <div className="min-h-screen pt-40 pb-32 px-5 md:px-10">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
              <p className="text-[10px] font-tech text-accent uppercase tracking-[0.5em] font-bold">Aturan Kelas v2.0</p>
            </div>
            <h2 className="text-7xl md:text-9xl font-serif italic text-white tracking-tighter leading-none mb-8">
              Jadwal <br/><span className="not-italic text-slate-500">Kita</span>
            </h2>
            {isAdmin && (
              <button 
                onClick={handleToggleEdit} 
                className={`px-10 py-5 rounded-2xl flex items-center gap-3 font-tech text-[10px] tracking-widest uppercase transition-all shadow-2xl ${isEditing ? 'bg-white text-black' : 'glass text-white border-white/10 hover:bg-white hover:text-black'}`}
              >
                {isEditing ? <><Save size={16}/> SIMPAN JADWAL</> : <><Edit3 size={16}/> UBAH JADWAL</>}
              </button>
            )}
          </div>

          {/* Day Selector */}
          <div className="w-full lg:w-auto overflow-x-auto no-scrollbar glass p-2 rounded-[32px] flex items-center border-white/5">
            {days.map(day => (
              <button 
                key={day} 
                onClick={() => setActiveDay(day)} 
                className={`px-10 py-5 rounded-[24px] font-tech text-[10px] tracking-[0.3em] transition-all whitespace-nowrap font-bold ${activeDay === day ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {day.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Schedule Timeline */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[11px] font-tech text-slate-500 uppercase tracking-[0.5em] font-bold">Urutan Waktu</h3>
              {isEditing && (
                <button onClick={addSession} className="p-3 bg-accent/10 text-accent rounded-full hover:bg-accent hover:text-white transition-all">
                  <Plus size={20}/>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {currentData.umum?.map((item: any, idx: number) => (
                <div 
                  key={idx} 
                  className="group relative glass p-10 rounded-[48px] border-white/5 hover:border-accent/30 transition-all duration-500 animate-in fade-in slide-in-from-bottom-6"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row gap-8 md:items-center">
                    <div className="text-6xl md:text-7xl font-serif italic text-white/5 group-hover:text-accent/20 transition-colors duration-700 select-none">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>

                    <div className="flex-1 space-y-4">
                      {isEditing ? (
                        <div className="space-y-4">
                          <input 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-xl font-serif italic outline-none focus:border-accent" 
                            value={item.subject} 
                            onChange={e => updateSession(idx, 'subject', e.target.value)} 
                          />
                          <div className="flex items-center gap-4">
                            <Clock size={14} className="text-accent" />
                            <input 
                              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-accent text-[11px] font-tech outline-none" 
                              value={item.time} 
                              onChange={e => updateSession(idx, 'time', e.target.value)} 
                            />
                            <button onClick={() => removeSession(idx)} className="ml-auto p-2 text-red-500/50 hover:text-red-500 transition-colors">
                              <Trash2 size={18}/>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="text-3xl md:text-4xl font-serif italic text-white tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-500">
                            {item.subject}
                          </h4>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-[1px] bg-accent/30"></div>
                            <span className="text-[11px] font-tech text-accent font-black tracking-[0.2em]">{item.time}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="glass p-12 rounded-[56px] border-l-[8px] border-accent relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-white">
                  <Shield size={120} />
               </div>
               <div className="relative z-10">
                 <h3 className="text-[10px] font-tech text-slate-500 uppercase tracking-[0.5em] font-bold mb-6">Pakai Baju Apa?</h3>
                 {isEditing ? (
                   <input 
                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white font-tech text-xs outline-none focus:border-accent" 
                     value={currentData.uniform} 
                     onChange={e => updateField('uniform', e.target.value)} 
                   />
                 ) : (
                   <p className="text-3xl font-serif italic text-white leading-snug">{currentData.uniform}</p>
                 )}
               </div>
            </div>

            <div className="glass p-12 rounded-[56px] border-white/5">
              <div className="flex items-center gap-4 mb-10">
                <Users size={18} className="text-slate-500"/>
                <h3 className="text-[10px] font-tech text-slate-500 uppercase tracking-[0.5em] font-bold">Teman Piket</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {currentData.piket?.map((name: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-5 group">
                    <span className="text-[9px] font-tech text-slate-800 font-black tracking-tighter">{(idx + 1).toString().padStart(2, '0')}</span>
                    <p className="text-[12px] font-tech text-slate-500 uppercase tracking-[0.2em] group-hover:text-white transition-all duration-300">
                      {name}
                    </p>
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="mt-10 pt-10 border-t border-white/5">
                   <p className="text-[8px] font-tech text-slate-600 uppercase tracking-widest mb-3 ml-1">Edit Daftar Piket (Pisahkan dengan koma)</p>
                   <textarea 
                     className="w-full bg-white/5 border border-white/10 rounded-[32px] p-8 text-[11px] font-tech text-white focus:border-accent outline-none transition-all resize-none leading-relaxed" 
                     rows={8} 
                     value={currentData.piket?.join(', ')} 
                     onChange={e => updateField('piket', e.target.value.split(',').map(s => s.trim()))} 
                     placeholder="Contoh: Nama1, Nama2, Nama3..." 
                   />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
