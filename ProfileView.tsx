import React from 'react';
import { Camera, ChevronLeft, BadgeCheck, Edit3 } from 'lucide-react';

interface ProfileViewProps {
  userProfile: any;
  setUserProfile: (p: any) => void;
  isAdmin: boolean;
  onBack: () => void;
}

const ProfileView = ({ userProfile, setUserProfile, isAdmin, onBack }: ProfileViewProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserProfile({ ...userProfile, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 font-tech text-xs tracking-widest uppercase">
          <ChevronLeft size={16}/> Kembali
        </button>

        <div className="glass rounded-[40px] p-8 md:p-16 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            <div className="relative group">
              <div className="w-48 h-48 rounded-full border-4 border-blue-500/30 overflow-hidden bg-white/5 flex items-center justify-center">
                {userProfile.image ? <img src={userProfile.image} className="w-full h-full object-cover" /> : <span className="text-7xl font-serif italic text-blue-500/30">{userProfile.name?.charAt(0) || 'U'}</span>}
              </div>
              <label className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center cursor-pointer shadow-xl transition-transform hover:scale-110">
                <Camera size={20}/>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload}/>
              </label>
            </div>

            <div className="flex-1 text-center md:text-left space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter text-white">{userProfile.name || 'Siswa'}</h2>
                  {isAdmin && <BadgeCheck className="text-blue-500 w-10 h-10" />}
                </div>
                <p className="text-blue-500 font-tech uppercase tracking-widest text-sm">{userProfile.classMajor || 'X TJKT 2'}</p>
              </div>
              <div className="space-y-4 pt-6 border-t border-white/10 text-white">
                <div className="flex justify-between items-center"><h4 className="font-tech text-[10px] text-slate-500 uppercase tracking-widest">Bio</h4><Edit3 size={14}/></div>
                <textarea className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 text-slate-400 italic text-lg focus:outline-none focus:border-blue-500 resize-none" rows={3} value={userProfile.bio} onChange={e => setUserProfile({...userProfile, bio: e.target.value})} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;