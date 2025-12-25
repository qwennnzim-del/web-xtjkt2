
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginView from './LoginView';
import MainView from './MainView';
import ProfileView from './ProfileView';
import ScheduleView from './ScheduleView';
import GroupsView from './GroupsView';
import GalleryView from './GalleryView';

const App = () => {
  // Global States
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('xtjkt2_auth') === 'true');
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('xtjkt2_is_admin') === 'true');
  const [view, setView] = useState<'main' | 'profile' | 'schedule' | 'groups' | 'gallery'>('main');
  const [scrolled, setScrolled] = useState(false);

  // Data States
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('xtjkt2_members');
    return saved ? JSON.parse(saved) : [
      { name: 'IBU RESITA', role: 'Wali Kelas', priority: true, image: null },
      { name: 'IRFAN FERMADI', role: 'Ketua Murid', priority: true, image: null },
      { name: 'GALUH RAY PUTRA', role: 'Wakil Murid', priority: true, image: null },
      { name: 'MELVINA YEIZA ALWI', role: 'Sekretaris', priority: true, image: null },
      { name: 'Muhani Khalifia Khadijah', role: 'Sekretaris', priority: true, image: null },
      { name: 'SALMA YUNIAR', role: 'Bendahara', priority: true, image: null },
      { name: 'SITI SARIFAH ANJANI', role: 'Bendahara', priority: true, image: null },
      { name: 'Zent', role: 'DEVELOPMENT', priority: true, image: null },
      { name: 'Noir', role: 'Struktur Web', priority: true, image: null },
      { name: 'Zyld', role: 'Desain Web', priority: true, image: null },
      { name: 'ALHAM HAIKAL', role: 'Siswa', image: null },
      { name: 'ANNAS NASRI MAULUDIN', role: 'Siswa', image: null },
      { name: 'AUREL AGRI NOVIANTI', role: 'Siswa', image: null },
      { name: 'AYATULL HUSNA', role: 'Siswa', image: null },
      { name: 'AZMI ABDUL MAULANA', role: 'Siswa', image: null },
      { name: 'Bibit Adi Syaputra', role: 'Siswa', image: null },
      { name: 'CAKRA BUANA', role: 'Siswa', image: null },
      { name: 'DERI PADLLI', role: 'Siswa', image: null },
      { name: 'DIMAS ALVINO', role: 'Siswa', image: null },
      { name: 'EVANDER YUSUP FARIZKY', role: 'Siswa', image: null },
      { name: 'GALUH RAGA PANUNTUN', role: 'Siswa', image: null },
      { name: 'HASBI NURSYAH PUTRA', role: 'Siswa', image: null },
      { name: 'INTAN DARMAWAN', role: 'Siswa', image: null },
      { name: 'M RABLI AZWAR', role: 'Siswa', image: null },
      { name: 'M. PADIL NURJAMAN', role: 'Siswa', image: null },
      { name: 'Megha Indah Ramdani', role: 'Siswa', image: null },
      { name: 'MOH BILAL NURULFATA', role: 'Siswa', image: null },
      { name: 'MUHAMAD FIRMAN SUPIANI', role: 'Siswa', image: null },
      { name: 'MUHAMAD MAULANA', role: 'Siswa', image: null },
      { name: 'MUHAMAD WIJAYA ZAINUR RAHMAN', role: 'Siswa', image: null },
      { name: 'Muhamad Zaky Pairus', role: 'Siswa', image: null },
      { name: 'MUHAMMAD RASYA RADITYA SWARNA', role: 'Siswa', image: null },
      { name: 'MUHAMMAD REIHAN ALPIANSYAH', role: 'Siswa', image: null },
      { name: 'MUHAMMAD RIZKI PRATAMA', role: 'Siswa', image: null },
      { name: 'NURSHIFA AMALIA', role: 'Siswa', image: null },
      { name: 'PAHRI GILANG PRATAMA', role: 'Siswa', image: null },
      { name: 'RAYHAN AMBIYA', role: 'Siswa', image: null },
      { name: 'REZA JUNIARDI', role: 'Siswa', image: null },
      { name: 'RINDU RIAYU', role: 'Siswa', image: null },
      { name: 'RISTA AMELIA', role: 'Siswa', image: null },
      { name: 'RIZKIA FEBRIANTI', role: 'Siswa', image: null },
      { name: 'SALMA ZULFA NASYITHA', role: 'Siswa', image: null },
      { name: 'SHIRA PUTRYASNI WULANDARI', role: 'Siswa', image: null },
      { name: 'WOLID HERDIANSYAH', role: 'Siswa', image: null },
      { name: 'ZULPA APRILIANI', role: 'Siswa', image: null },
      { name: 'RAYA', role: 'Siswa', image: null },
    ];
  });

  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('xtjkt2_schedule');
    return saved ? JSON.parse(saved) : {
      'Senin': { umum: ['Upacara', 'Agama', 'Pancasila'], produktif: ['Dasar TJKT', 'Informatika'] },
      'Selasa': { umum: ['B. Indonesia', 'Matematika', 'Sejarah'], produktif: ['Dasar TJKT'] },
      'Rabu': { umum: ['B. Inggris', 'Seni Budaya'], produktif: ['Projek IPAS', 'Informatika'] },
      'Kamis': { umum: ['PJOK', 'BK'], produktif: ['Dasar TJKT', 'Kewirausahaan'] },
      'Jumat': { umum: ['B. Sunda', 'Literasi'], produktif: ['Lab Jaringan', 'Maintenance'] }
    };
  });

  const [galleryImages, setGalleryImages] = useState(() => {
    const saved = localStorage.getItem('xtjkt2_gallery');
    return saved ? JSON.parse(saved) : [];
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('xtjkt2_user_profile');
    return saved ? JSON.parse(saved) : { name: '', classMajor: '', bio: 'Siswa X TJKT 2.', image: null };
  });

  // Effects for Persistence
  useEffect(() => { localStorage.setItem('xtjkt2_members', JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem('xtjkt2_schedule', JSON.stringify(schedule)); }, [schedule]);
  useEffect(() => { localStorage.setItem('xtjkt2_gallery', JSON.stringify(galleryImages)); }, [galleryImages]);
  useEffect(() => { localStorage.setItem('xtjkt2_user_profile', JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('xtjkt2_auth');
    localStorage.removeItem('xtjkt2_is_admin');
    setView('main');
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={(admin, data) => {
      setIsAuthenticated(true);
      setIsAdmin(admin);
      setUserProfile(prev => ({ ...prev, name: data.name, classMajor: data.classMajor }));
    }} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar view={view} setView={setView} isAdmin={isAdmin} scrolled={scrolled} onLogout={handleLogout} />
      
      <main className="animate-in fade-in duration-700">
        {view === 'main' && <MainView isAdmin={isAdmin} members={members} setMembers={setMembers} userProfile={userProfile} />}
        {view === 'profile' && <ProfileView userProfile={userProfile} setUserProfile={setUserProfile} isAdmin={isAdmin} onBack={() => setView('main')} />}
        {view === 'schedule' && <ScheduleView isAdmin={isAdmin} schedule={schedule} setSchedule={setSchedule} />}
        {view === 'groups' && <GroupsView isAdmin={isAdmin} members={members} />}
        {view === 'gallery' && <GalleryView isAdmin={isAdmin} galleryImages={galleryImages} setGalleryImages={setGalleryImages} />}
      </main>

      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
