
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getFirestore, doc, setDoc, onSnapshot, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginView from './LoginView';
import MainView from './MainView';
import ProfileView from './ProfileView';
import ScheduleView from './ScheduleView';
import GroupsView from './GroupsView';
import GalleryView from './GalleryView';

const firebaseConfig = {
  apiKey: "AIzaSyC2cgAFblJgpg8-p5IvMwrcenE7v-hPPeo",
  authDomain: "xtjkt2-web.firebaseapp.com",
  projectId: "xtjkt2-web",
  storageBucket: "xtjkt2-web.firebasestorage.app",
  messagingSenderId: "947666553428",
  appId: "1:947666553428:web:723c363cd599062c6d3bc1",
  measurementId: "G-4GV4KT06CE"
};

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
  const [announcement, setAnnouncement] = useState('');
  const [systemStatus, setSystemStatus] = useState('Optimal');
  const [currentTrack, setCurrentTrack] = useState({ title: 'No Signal', url: '' });
  const [userProfile, setUserProfile] = useState({ 
    name: localStorage.getItem('xtjkt2_user_name') || '', 
    classMajor: 'X TJKT 2', 
    bio: 'Siswa X TJKT 2 yang rajin.', 
    image: null 
  });

  // POWERFUL FIX: Fungsi ini akan memaksa nama di UI berubah & mengupdate database jika Admin login
  const forceFixData = (rawMembers: any[]) => {
    let changed = false;
    const fixed = rawMembers.map(m => {
      let name = m.name.toUpperCase().trim();
      if (name === "ZENT" || name === "ZENT ") {
        changed = true;
        return { ...m, name: "M FARIZ ALFAUZI" };
      }
      if (name === "NOIR" || name === "NOIR ") {
        changed = true;
        return { ...m, name: "MUHAMMAD RAJIB" };
      }
      if (name === "ZYLD" || name === "ZYLD ") {
        changed = true;
        return { ...m, name: "MUHAMMAD ZYLDAN" };
      }
      return m;
    });
    return { fixed, changed };
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const unsubGlobal = onSnapshot(doc(db, "classData", "global"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.members) {
          const { fixed, changed } = forceFixData(data.members);
          setMembers(fixed);
          // Jika ada perubahan nama dan user adalah Admin, paksa update ke Firebase
          if (changed && isAdmin) {
            setDoc(doc(db, "classData", "global"), { members: fixed }, { merge: true });
          }
        }
        if (data.schedule) setSchedule(data.schedule);
        if (data.announcement !== undefined) setAnnouncement(data.announcement);
        if (data.systemStatus !== undefined) setSystemStatus(data.systemStatus);
        if (data.currentTrack !== undefined) setCurrentTrack(data.currentTrack);
      } else if (isAdmin) {
        initDefaultData();
      }
    });

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const initDefaultData = async () => {
    const defaultData = {
      announcement: 'Halo semuanya! Selamat belajar dan tetap semangat ya untuk hari ini.',
      systemStatus: 'Optimal',
      currentTrack: { title: 'Lagu Santai', url: 'https://files.catbox.moe/kxlm7m.mp3' },
      members: [
        { name: 'IBU RESITA', role: 'Wali Kelas', priority: true, badges: ['MENTOR'], image: null },
        { name: 'IRFAN FERMADI', role: 'Ketua Murid', priority: true, badges: ['COMMANDER'], image: null },
        { name: 'GALUH RAY PUTRA', role: 'Wakil Murid', priority: true, badges: ['V-CMD'], image: null },
        { name: 'M FARIZ ALFAUZI', role: 'DEVELOPMENT', priority: true, badges: ['CORE-DEV'], image: null },
        { name: 'MUHAMMAD RAJIB', role: 'Struktur Web', priority: true, badges: ['ARCHITECT'], image: null },
        { name: 'MUHAMMAD ZYLDAN', role: 'Desain Web', priority: true, badges: ['VISUAL'], image: null },
        { name: 'MELVINA YEIZA ALWI', role: 'Siswa', priority: false, badges: [], image: null },
      ],
      schedule: {
        'Senin': {
          uniform: 'Baju Putih Abu (Pakai atribut LENGKAP ya)',
          piket: [
            'Alham Haikal', 'Aurel Agri', 'Bibit Adi', 'M Razib', 'M Rizki', 
            'Naffa Mayna', 'Nurshifa Amalia', 'Rayhan Ambiya', 'Salma Yuniar', 'Muhani Khalifia'
          ],
          umum: [
            { subject: 'UPACARA BENDERA', time: '07.30–08.05' },
            { subject: 'MATA PELAJARAN IPAS', time: '12.25–14.45' },
            { subject: 'ISTIRAHAT', time: '09.50–10.10' },
            { subject: 'ISTIRAHAT', time: '11.55–12.25' }
          ]
        },
        'Selasa': { uniform: '-', piket: [], umum: [] },
        'Rabu': { uniform: '-', piket: [], umum: [] },
        'Kamis': { uniform: '-', piket: [], umum: [] },
        'Jumat': { uniform: '-', piket: [], umum: [] }
      }
    };
    await setDoc(doc(db, "classData", "global"), defaultData);
    await setDoc(doc(db, "classData", "matrix"), { groups: [] }, { merge: true });
  };

  const syncToCloud = async (docName: string, data: any) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, "classData", docName), data, { merge: true });
    } catch (err) {
      console.error("Cloud Sync Error:", err);
    }
  };

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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-tech text-accent">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white tracking-[0.3em] uppercase text-xs font-bold">Lagi Sinkronisasi Cloud...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${systemStatus === 'Emergency' ? 'emergency-bg' : ''}`}>
      <Navbar 
        view={view} 
        setView={setView} 
        isAdmin={isAdmin} 
        scrolled={scrolled} 
        onLogout={handleLogout} 
        systemStatus={systemStatus} 
        currentTrack={currentTrack}
      />
      
      <main className="animate-in fade-in duration-700">
        {view === 'main' && (
          <MainView 
            isAdmin={isAdmin} 
            members={members} 
            setMembers={(m) => { setMembers(m); syncToCloud("global", { members: m }); }} 
            announcement={announcement}
            setAnnouncement={(a) => { setAnnouncement(a); syncToCloud("global", { announcement: a }); }}
            systemStatus={systemStatus}
            setSystemStatus={(s) => { setSystemStatus(s); syncToCloud("global", { systemStatus: s }); }}
            currentTrack={currentTrack}
            setTrack={(t) => { setCurrentTrack(t); syncToCloud("global", { currentTrack: t }); }}
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
