
import React, { useState } from 'react';
import { Edit3, Save, Plus, Trash2, BookOpen, Zap, Clock } from 'lucide-react';

interface ScheduleViewProps {
  isAdmin: boolean;
  schedule: any;
  setSchedule: (s: any) => void;
}

const ScheduleView = ({ isAdmin, schedule, setSchedule }: ScheduleViewProps) => {
  const [activeDay, setActiveDay] = useState('Senin');
  const [isEditing, setIsEditing] = useState(false);
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  const handleToggleEdit = () => {
    if (!isAdmin) return;
    setIsEditing(!isEditing);
  };

  const updateLesson = (type: 'umum' | 'produktif', idx: number, val: string) => {
    if (!isAdmin) return;
    const updated = { ...schedule };
    updated[activeDay][type][idx] = val;
    setSchedule(updated);
  };

  const addLesson = (type: 'umum' | 'produktif') => {
    if (!isAdmin) return;
    const updated = { ...schedule };
    updated[activeDay][type].push('Pelajaran Baru');
    setSchedule(updated);
  };

  const removeLesson = (type: 'umum' | 'produktif', idx: number) => {
    if (!isAdmin) return;
    const updated = { ...schedule };
    updated[activeDay][type].splice(idx, 1);
    setSchedule(updated);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-5 md:px-10">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-blue-500"></span>
              <p className="text-[10px] font-tech text-blue-500 uppercase tracking-widest">Akademik Hub</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic text-white">Jadwal Pelajaran</h2>
            {isAdmin && (
              <button 
                onClick={handleToggleEdit} 
                className="mt-4 text-blue-500 flex items-center gap-2 font-tech text-[10px] tracking-widest uppercase hover:text-white transition-colors"
              >
                {isEditing ? <><Save size={14}/> Save Changes</> : <><Edit3 size={14}/> Edit Schedule</>}
              </button>
            )}
          </div>
          
          <div className="w-full lg:w-auto overflow-x-auto no-scrollbar glass p-1 rounded-2xl flex md:inline-flex items-center">
            {days.map(day => (
              <button 
                key={day} 
                onClick={() => setActiveDay(day)} 
                className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-tech text-[10px] tracking-widest transition-all whitespace-nowrap ${activeDay === day ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {day.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="glass p-8 md:p-10 rounded-[40px] border-t-4 border-t-white/10 group">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl md:text-2xl font-serif italic text-white flex items-center gap-3">
                <BookOpen size={20} className="text-blue-500" /> Pelajaran Umum
              </h3>
              <Clock size={16} className="text-slate-700" />
            </div>
            <div className="space-y-4">
              {schedule[activeDay].umum.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 group/item">
                  <span className="text-[9px] font-tech text-blue-500/50">0{idx+1}</span>
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input 
                        className="flex-1 bg-white/5 border-b border-white/10 text-white font-tech text-sm p-1 focus:outline-none focus:border-blue-500" 
                        value={item} 
                        onChange={e => updateLesson('umum', idx, e.target.value)} 
                      />
                      <button onClick={() => removeLesson('umum', idx)} className="text-red-500/50 hover:text-red-500"><Trash2 size={14}/></button>
                    </div>
                  ) : (
                    <span className="text-sm md:text-lg font-tech text-slate-400 group-hover/item:text-white transition-colors">{item}</span>
                  )}
                </div>
              ))}
              {isEditing && (
                <button onClick={() => addLesson('umum')} className="w-full py-3 mt-4 border-2 border-dashed border-white/5 rounded-2xl text-slate-500 hover:text-white hover:border-white/20 transition-all">
                  <Plus size={16} className="mx-auto" />
                </button>
              )}
            </div>
          </div>

          <div className="glass p-8 md:p-10 rounded-[40px] border-t-4 border-t-blue-500/20 bg-blue-500/5 group">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl md:text-2xl font-serif italic text-white flex items-center gap-3">
                <Zap size={20} className="text-blue-500" /> Produktif TJKT
              </h3>
              <div className="px-2 py-1 rounded bg-blue-600 text-[8px] font-tech text-white uppercase">Primary</div>
            </div>
            <div className="space-y-4">
              {schedule[activeDay].produktif.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 group/item">
                  <span className="text-[9px] font-tech text-blue-400/50">P{idx+1}</span>
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input 
                        className="flex-1 bg-white/10 border-b border-blue-500/30 text-white font-tech text-sm p-1 focus:outline-none focus:border-blue-500" 
                        value={item} 
                        onChange={e => updateLesson('produktif', idx, e.target.value)} 
                      />
                      <button onClick={() => removeLesson('produktif', idx)} className="text-red-500/50 hover:text-red-500"><Trash2 size={14}/></button>
                    </div>
                  ) : (
                    <span className="text-sm md:text-lg font-tech text-white font-bold group-hover/item:text-blue-400 transition-all">{item}</span>
                  )}
                </div>
              ))}
              {isEditing && (
                <button onClick={() => addLesson('produktif')} className="w-full py-3 mt-4 border-2 border-dashed border-blue-500/10 rounded-2xl text-blue-500 hover:text-white hover:border-blue-500/30 transition-all">
                  <Plus size={16} className="mx-auto" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
