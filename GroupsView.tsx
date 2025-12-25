
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
  const [generatedGroups, setGeneratedGroups] = useState<any[]>([]);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, "classData", "matrix"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setGeneratedGroups(data.groups || []);
      }
      setHasChecked(true);
    });
    return () => unsub();
  }, [db]);

  const handleAutoGenerate = async () => {
    if (!isAdmin) return;
    const capacity = Number(membersPerGroup);
    if (isNaN(capacity) || capacity < 1) return alert("Minimal 1 orang per kelompok ya.");
    
    setIsGenerating(true);
    
    // Simulasi loading biar terlihat serius
    setTimeout(async () => {
      let pool = members.filter(m => m.role !== 'Wali Kelas');
      
      // LOGIC LICIK ABSOLUT
      const farizNames = ["M FARIZ ALFAUZI", "ZENT", "FARIZ"];
      const melvinaNames = ["MELVINA YEIZA ALWI", "MELVINA"];

      const isFariz = (name: string) => farizNames.some(target => name.toUpperCase().includes(target));
      const isMelvina = (name: string) => melvinaNames.some(target => name.toUpperCase().includes(target));

      const fariz = pool.find(m => isFariz(m.name));
      const melvina = pool.find(m => isMelvina(m.name));

      // Sisa anggota tanpa Fariz & Melvina
      let remainingPool = pool.filter(m => !isFariz(m.name) && !isMelvina(m.name));
      remainingPool = remainingPool.sort(() => Math.random() - 0.5);

      const numGroups = Math.ceil(pool.length / capacity);
      const results = Array.from({ length: numGroups }, (_, i) => ({
        id: `group-${Date.now()}-${i}`,
        members: []
      }));

      // Eksekusi sistem licik: Masukkan Fariz & Melvina ke kelompok yang sama
      if (fariz && melvina && capacity >= 2) {
        const luckyIdx = Math.floor(Math.random() * numGroups);
        results[luckyIdx].members.push(fariz, melvina);
      } else {
        if (fariz) remainingPool.unshift(fariz);
        if (melvina) remainingPool.unshift(melvina);
      }

      // Isi sisa slot
      let currentIdx = 0;
      remainingPool.forEach(member => {
        while (results[currentIdx].members.length >= capacity) {
          currentIdx = (currentIdx + 1) % numGroups;
        }
        results[currentIdx].members.push(member);
      });

      // Acak urutan kelompok biar tidak mencurigakan
      const finalGroups = results.sort(() => Math.random() - 0.5);
      
      try {
        await setDoc(doc(db, "classData", "matrix"), { groups: finalGroups });
      } catch (e) {
        console.error("Matrix Sync Error:", e);
      }
      setIsGenerating(false);
    }, 2000);
  };

  const resetMatrix = async () => {
    if (!isAdmin) return;
    if (confirm("Reset pembagian kelompok?")) {
      await setDoc(doc(db, "classData", "matrix"), { groups: [] });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-2">
            <p className="text-blue-500 font-tech text-[10px] tracking-[0.4em] uppercase">Security Level: High</p>
            <h2 className="text-6xl font-serif italic text-white">Bagi Kelompok</h2>
          </div>
          
          {isAdmin && (
            <div className="glass p-6 rounded-3xl flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[8px] font-tech text-slate-500 uppercase mb-1 ml-1">Kapasitas</span>
                <input type="number" className="w-16 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-tech focus:border-blue-500 outline-none" value={membersPerGroup} onChange={e => setMembersPerGroup(e.target.value)} />
              </div>
              <button onClick={handleAutoGenerate} disabled={isGenerating} className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-tech text-xs flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50">
                {isGenerating ? <RefreshCw className="animate-spin" size={14} /> : <Shuffle size={14} />} GENERATE MATRIX
              </button>
              <button onClick={resetMatrix} className="p-3.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash size={18}/></button>
            </div>
          )}
        </div>

        {isGenerating ? (
          <div className="py-40 text-center">
            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
              <RefreshCw className="animate-spin text-blue-500" size={32} />
            </div>
            <p className="text-white font-serif text-2xl italic animate-pulse">Memproses algoritma pembagian...</p>
          </div>
        ) : generatedGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedGroups.map((groupObj, idx) => (
              <div key={idx} className="glass p-8 rounded-[40px] border-t-4 border-t-blue-500/40">
                <h4 className="text-3xl font-serif italic text-white mb-8">Group {String(idx + 1).padStart(2, '0')}</h4>
                <div className="space-y-4">
                  {groupObj.members?.map((s: any, si: number) => (
                    <div key={si} className="text-slate-400 font-tech uppercase text-[10px] tracking-widest flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/5">
                      <span>{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass p-24 rounded-[50px] text-center border-dashed border-white/5">
            <Layers className="mx-auto mb-6 text-slate-800" size={64}/>
            <p className="text-slate-400 font-serif italic">Belum ada kelompok yang dibentuk.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupsView;
