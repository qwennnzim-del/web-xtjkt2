
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getFirestore, doc, setDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginView from './LoginView';
import MainView from './MainView';
import ProfileView from './ProfileView';
import ScheduleView from './ScheduleView';
import GroupsView from './GroupsView';
import GalleryView from './GalleryView';

// ========================================================
// FIREBASE CONFIG MILIK XTJKT2-WEB
// ========================================================
const firebaseConfig = {
  apiKey: "AIzaSyC2cgAFblJgpg8-p5IvMwrcenE7v-hPPeo",
  authDomain: "xtjkt2-web.firebaseapp.com",
  projectId: "xtjkt2-web",
  storageBucket: "xtjkt2-web.firebasestorage.app",
  messagingSenderId: "947666553428",
  appId: "1:947666553428:web:723c363cd599062c6d3bc1",
  measurementId: "G-4GV4KT06CE"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('xtjkt2_auth') === 'true');
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('xtjkt2_is_admin') === 'true');
  const [view, setView] = useState<'main' | 'profile' | 'schedule' | 'groups' | 'gallery'>('main');
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Data States
  const [members, setMembers] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [userProfile, setUserProfile] = useState({ 
    name: localStorage.getItem('xtjkt2_user_name') || '', 
    classMajor: 'X TJKT 2', 
    bio: 'Siswa X TJKT 2.', 
    image: null 
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    // 1. Sinkronisasi Anggota & Jadwal
    const unsubGlobal = onSnapshot(doc(db, "classData", "global"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.members) setMembers(data.members);
        if (data.schedule) setSchedule(data.schedule);
      } else if (isAdmin) {
        // Hanya Admin yang bisa menginisialisasi data pertama kali
        initDefaultData();
      }
    });

    // 2. Sinkronisasi Galeri
    const unsubGallery = onSnapshot(doc(db, "classData", "gallery"), (docSnap) => {
      if (docSnap.exists()) {
        setGalleryImages(docSnap.data().images || []);
      }
    });

    setIsLoading(false);
    return () => {
      unsubGlobal();
      unsubGallery();
    };
  }, [isAuthenticated, isAdmin]);

  const initDefaultData = async () => {
    const defaultData = {
      members: [
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
      ],
      schedule: {
        'Senin': { umum: ['Upacara', 'Agama', 'Pancasila'], produktif: ['Dasar TJKT', 'Informatika'] },
        'Selasa': { umum: ['B. Indonesia', 'Matematika', 'Sejarah'], produktif: ['Dasar TJKT'] },
        'Rabu': { umum: ['B. Inggris', 'Seni Budaya'], produktif: ['Projek IPAS', 'Informatika'] },
        'Kamis': { umum: ['PJOK', 'BK'], produktif: ['Dasar TJKT', 'Kewirausahaan'] },
        'Jumat': { umum: ['B. Sunda', 'Literasi'], produktif: ['Lab Jaringan', 'Maintenance'] }
      }
    };
    await setDoc(doc(db, "classData", "global"), defaultData);
  };

  const syncToCloud = async (docName: string, data: any) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, "classData", docName), data, { merge: true });
    } catch (err) {
      console.error("Cloud Sync Error:", err);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.clear();
    setView('main');
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={(admin, data) => {
      setIsAuthenticated(true);
      setIsAdmin(admin);
      setUserProfile(prev => ({ ...prev, name: data.name }));
      localStorage.setItem('xtjkt2_auth', 'true');
      localStorage.setItem('xtjkt2_is_admin', admin ? 'true' : 'false');
      localStorage.setItem('xtjkt2_user_name', data.name);
    }} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-tech">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white tracking-[0.3em] uppercase text-xs">Accessing Neural Cloud...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar view={view} setView={setView} isAdmin={isAdmin} scrolled={scrolled} onLogout={handleLogout} />
      
      <main className="animate-in fade-in duration-700">
        {view === 'main' && (
          <MainView 
            isAdmin={isAdmin} 
            members={members} 
            setMembers={(m) => { setMembers(m); syncToCloud("global", { members: m }); }} 
            userProfile={userProfile} 
          />
        )}
        {view === 'profile' && <ProfileView userProfile={userProfile} setUserProfile={setUserProfile} isAdmin={isAdmin} onBack={() => setView('main')} />}
        {view === 'schedule' && (
          <ScheduleView 
            isAdmin={isAdmin} 
            schedule={schedule} 
            setSchedule={(s) => { setSchedule(s); syncToCloud("global", { schedule: s }); }} 
          />
        )}
        {view === 'groups' && <GroupsView isAdmin={isAdmin} members={members} db={db} />}
        {view === 'gallery' && (
          <GalleryView 
            isAdmin={isAdmin} 
            galleryImages={galleryImages} 
            setGalleryImages={(g) => { setGalleryImages(g); syncToCloud("gallery", { images: g }); }} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
