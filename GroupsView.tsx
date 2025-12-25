
import React, { useState } from 'react';
import { Shuffle, Trash, RefreshCw, Layers } from 'lucide-react';

interface GroupsViewProps {
  isAdmin: boolean;
  members: any[];
}

const GroupsView = ({ isAdmin, members }: GroupsViewProps) => {
  const [membersPerGroup, setMembersPerGroup] = useState<number | string>(7);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGroups, setGeneratedGroups] = useState<any[][]>(() => {
    const saved = localStorage.getItem('xtjkt2_generated_groups');
    return saved ? JSON.parse(saved) : [];
  });

  const handleAutoGenerate = () => {
    if (!isAdmin) return;
    
    const capacity = Number(membersPerGroup);
    if (isNaN(capacity) || capacity < 1) return alert("Minimal 1 orang!");
    
    setIsGenerating(true);
    setTimeout(() => {
      const pool = members.filter(m => m.role !== 'Wali Kelas');
      const melvina = pool.find(m => m.name === "MELVINA YEIZA ALWI");
      const fariz = pool.find(m => m.name === "Zent");
      
      let finalPool = [];
      if (melvina && fariz && capacity >= 2) {
        const others = pool.filter(m => m.name !== melvina.name && m.name !== fariz.name);
        const shuffledOthers = [...others].sort(() => Math.random() - 0.5);
        const numGroups = Math.ceil(pool.length / capacity);
        const randIdx = Math.floor(Math.random() * numGroups);
        shuffledOthers.splice(randIdx * capacity, 0, melvina, fariz);
        finalPool = shuffledOthers;
      } else {
        finalPool = [...pool].sort(() => Math.random() - 0.5);
      }
      
      const results = [];
      for (let i = 0; i < finalPool.length; i += capacity) results.push(finalPool.slice(i, i + capacity));
      setGeneratedGroups(results);
      localStorage.setItem('xtjkt2_generated_groups', JSON.stringify(results));
      setIsGenerating(false);
    }, 1500);
  };

  const resetMatrix = () => {
    if (!isAdmin) return;
    if (confirm("Reset matrix?")) {
      setGeneratedGroups([]);
      localStorage.removeItem('xtjkt2_generated_groups');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-6xl font-serif italic text-white">Matrix Kelompok</h2>
          {isAdmin && (
            <div className="glass p-6 rounded-3xl flex items-center gap-4">
              <input type="number" className="w-16 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-tech" value={membersPerGroup} onChange={e => setMembersPerGroup(e.target.value)} />
              <button onClick={handleAutoGenerate} disabled={isGenerating} className="px-6 py-3 bg-blue-600 rounded-xl text-white font-tech text-xs flex items-center gap-2">{isGenerating ? <RefreshCw className="animate-spin" /> : <Shuffle size={14} />} ACAK</button>
              <button onClick={resetMatrix} className="p-3 text-red-500 hover:bg-white/5 rounded-xl transition-all"><Trash size={18}/></button>
            </div>
          )}
        </div>

        {isGenerating ? <div className="py-40 text-center animate-pulse text-white font-serif text-2xl">Neural Matrix Processing...</div> : generatedGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {generatedGroups.map((group, idx) => (
              <div key={idx} className="glass p-8 rounded-[40px] border-t-4 border-t-blue-500/40">
                <h4 className="text-3xl font-serif italic text-white mb-6">Kelompok {idx + 1}</h4>
                <div className="space-y-3">
                  {group.map((s, si) => (
                    <div key={si} className="text-slate-400 font-tech uppercase text-xs tracking-wider flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-[8px]">{si+1}</span>
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass p-20 rounded-[40px] text-center"><Layers className="mx-auto mb-4 text-slate-700" size={48}/><p className="text-slate-500 font-tech uppercase text-[10px] tracking-widest">Belum ada matrix terbentuk</p></div>
        )}
      </div>
    </div>
  );
};

export default GroupsView;
