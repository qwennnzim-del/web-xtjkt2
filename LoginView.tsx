
import React, { useState } from 'react';
import { User as UserIcon, Monitor, Lock, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onLogin: (isAdmin: boolean, data: { name: string; classMajor: string }) => void;
}

const LoginView = ({ onLogin }: LoginViewProps) => {
  const [authMode, setAuthMode] = useState<'user' | 'admin'>('user');
  const [formData, setFormData] = useState({ name: '', classMajor: '', secretCode: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'admin') {
      if (formData.secretCode === 'XTJKT0808AUTH') {
        onLogin(true, { name: 'ADMIN FARIZ', classMajor: 'X TJKT 2' });
        localStorage.setItem('xtjkt2_auth', 'true');
        localStorage.setItem('xtjkt2_is_admin', 'true');
      } else {
        alert('Kode Rahasia Salah!');
      }
    } else {
      if (formData.name && formData.classMajor) {
        onLogin(false, { name: formData.name, classMajor: formData.classMajor });
        localStorage.setItem('xtjkt2_auth', 'true');
        localStorage.setItem('xtjkt2_is_admin', 'false');
      } else {
        alert('Mohon lengkapi data Anda.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="w-full max-w-lg glass p-12 rounded-[40px] relative z-10 border border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-sm font-tech text-blue-500 tracking-[0.3em] uppercase mb-4">Gerbang Masuk</h2>
          <h1 className="text-5xl font-serif italic tracking-tighter text-white">X TJKT 2</h1>
        </div>

        <div className="flex bg-white/5 p-1 rounded-2xl mb-10">
          <button onClick={() => setAuthMode('user')} className={`flex-1 py-3 rounded-xl font-tech text-xs tracking-widest transition-all ${authMode === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}>SISWA</button>
          <button onClick={() => setAuthMode('admin')} className={`flex-1 py-3 rounded-xl font-tech text-xs tracking-widest transition-all ${authMode === 'admin' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}>ADMIN</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {authMode === 'user' ? (
            <>
              <div className="space-y-2">
                <label className="block text-[10px] font-tech text-slate-500 uppercase tracking-widest ml-1">Nama Lengkap</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-blue-500" placeholder="Nama anda..." value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-tech text-slate-500 uppercase tracking-widest ml-1">Kelas</label>
                <div className="relative">
                  <Monitor className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-blue-500" placeholder="X TJKT 2" value={formData.classMajor} onChange={e => setFormData({...formData, classMajor: e.target.value})} />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <label className="block text-[10px] font-tech text-slate-500 uppercase tracking-widest ml-1">Kode Rahasia Admin</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="password" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-blue-500" placeholder="••••••••" value={formData.secretCode} onChange={e => setFormData({...formData, secretCode: e.target.value})} />
              </div>
            </div>
          )}
          <button type="submit" className="w-full bg-white text-black font-tech font-bold text-xs tracking-[0.2em] py-5 rounded-2xl hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2">MASUK <ArrowRight size={16} /></button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
