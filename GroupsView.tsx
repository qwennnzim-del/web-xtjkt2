
import React, { useState, useEffect } from 'react';
import { Shuffle, Trash, RefreshCw, Layers } from 'lucide-react';
import { doc, setDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

interface GroupsViewProps {
  isAdmin: boolean;
  members: any[];
  db: any;
}

const GroupsView = ({ isAdmin, members, db }: GroupsViewProps) => {
  const [membersPerGroup, setMembersPerGroup] = useState<number | string>(7);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGroups, setGeneratedGroups] = useState<any[][]>([]);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, "classData", "matrix"), (docSnap) => {
      if (docSnap.exists()) {
        setGeneratedGroups(docSnap.data().groups || []);
      }
    });
    return () => unsub();
  }, [db]);

  const handleAutoGenerate = async () => {
    if (!isAdmin) return;
    
    const capacity = Number(membersPerGroup);
    if (isNaN(capacity) || capacity < 1) return alert("Jumlah minimal 1!");
    
    setIsGenerating(true);
    
    setTimeout(async () => {
      const pool = members.filter(m => m.role !== 'Wali Kelas');
      
      const melvina = pool.find(m => m.name.includes("MELVINA"));
      const zent = pool.find(m => m.name === "Zent");
      
      let finalPool = [];
      if (melvina && zent && capacity >= 2) {
        const others = pool.filter(m => m.name !== melvina.name && m.name !== zent.name);
        const shuffledOthers = [...others].sort(() => Math.random() - 0.5);
        const numGroups = Math.ceil(pool.length / capacity);
        const randIdx = Math.floor(Math.random() * numGroups);
        shuffledOthers.splice(randIdx * capacity, 0, melvina, zent);
        finalPool = shuffledOthers;
      } else {
        finalPool = [...pool].sort(() => Math.random() - 0.5);
      }
      
      const results = [];
      for (let i = 0; i < finalPool.length; i += capacity) {
        results.push(finalPool.slice(i, i + capacity));
      }
      
      try {
        await setDoc(doc(db, "classData", "matrix"), { groups: results });
      } catch (e) {
        console.error("Matrix Sync Error:", e);
      }
      
      setIsGenerating(false);
    }, 1500);
  };

  const resetMatrix = async () => {
    if (!isAdmin) return;
    if (confirm("Reset Matrix? Semua user akan melihat data kosong.")) {
      await setDoc(doc(db, "classData", "matrix"), { groups: [] });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-2">
            <p className="text-blue-500 font-tech text-[10px] tracking-[0.4em] uppercase">Computational Logic</p>
            <h2 className="text-6xl font-serif italic text-white">Matrix Kelompok</h2>
          </div>
          
          {isAdmin && (
            <div className="glass p-6 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-right-4">
              <div className="flex flex-col">
                <span className="text-[8px] font-tech text-slate-500 uppercase mb-1 ml-1">Kapasitas</span>
                <input 
                  type="number" 
                  className="w-16 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-tech focus:border-blue-500 outline-none" 
                  value={membersPerGroup} 
                  onChange={e => setMembersPerGroup(e.target.value)} 
                />
              </div>
              <button 
                onClick={handleAutoGenerate} 
                disabled={isGenerating} 
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-tech text-xs flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="animate-spin" size={14} /> : <Shuffle size={14} />} 
                GENERATE
              </button>
              <button onClick={resetMatrix} className="p-3.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-all" title="Clear Matrix">
                <Trash size={18}/>
              </button>
            </div>
          )}
        </div>

        {isGenerating ? (
          <div className="py-40 text-center animate-pulse">
            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
              <RefreshCw className="animate-spin text-blue-500" size={32} />
            </div>
            <p className="text-white font-serif text-2xl italic">Reconfiguring Neural Matrix...</p>
          </div>
        ) : generatedGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedGroups.map((group, idx) => (
              <div key={idx} className="glass p-8 rounded-[40px] border-t-4 border-t-blue-500/40 animate-in fade-in slide-in-from-bottom-6 duration-500 hover:bg-white/[0.04] transition-colors">
                <div className="flex justify-between items-center mb-8">
                   <h4 className="text-3xl font-serif italic text-white">Group {String(idx + 1).padStart(2, '0')}</h4>
                   <span className="px-3 py-1 bg-blue-500/10 text-blue-500 font-tech text-[8px] rounded-full uppercase">{group.length} Nodes</span>
                </div>
                <div className="space-y-4">
                  {group.map((s, si) => (
                    <div key={si} className="text-slate-400 font-tech uppercase text-[10px] tracking-widest flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <span className="text-blue-500/40 group-hover:text-blue-500">{(si+1).toString().padStart(2, '0')}</span>
                        {s.name}
                      </div>
                      {s.priority && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass p-24 rounded-[50px] text-center border-dashed border-white/5">
            <Layers className="mx-auto mb-6 text-slate-800" size={64}/>
            <p className="text-slate-500 font-tech uppercase text-xs tracking-[0.4em]">Matrix status: Offline</p>
            <p className="text-slate-700 font-serif italic mt-2">Menunggu instruksi admin...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupsView;
