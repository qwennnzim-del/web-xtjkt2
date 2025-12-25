
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
    bio: 'Siswa X TJKT 2.', 
    image: null 
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const unsubGlobal = onSnapshot(doc(db, "classData", "global"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.members) setMembers(data.members);
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
    const root = document.documentElement;
    if (systemStatus === 'Emergency') {
      root.style.setProperty('--accent', '#ef4444');
      root.style.setProperty('--accent-glow', 'rgba(239, 68, 68, 0.2)');
    } else if (systemStatus === 'Maintenance') {
      root.style.setProperty('--accent', '#f59e0b');
      root.style.setProperty('--accent-glow', 'rgba(245, 158, 11, 0.2)');
    } else {
      root.style.setProperty('--accent', '#3b82f6');
      root.style.setProperty('--accent-glow', 'rgba(59, 130, 246, 0.2)');
    }
  }, [systemStatus]);

  const initDefaultData = async () => {
    const defaultData = {
      announcement: 'Selamat Datang di Hub Jaringan X TJKT 2. Pastikan koneksi aman.',
      systemStatus: 'Optimal',
      currentTrack: { title: 'Lofi Cyberpunk', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      members: [
        { name: 'IBU RESITA', role: 'Wali Kelas', priority: true, badges: ['MENTOR'], image: null },
        { name: 'IRFAN FERMADI', role: 'Ketua Murid', priority: true, badges: ['COMMANDER'], image: null },
        { name: 'GALUH RAY PUTRA', role: 'Wakil Murid', priority: true, badges: ['V-CMD'], image: null },
        { name: 'Fariz', role: 'DEVELOPMENT', priority: true, badges: ['CORE-DEV'], image: null },
        { name: 'Rajib', role: 'Struktur Web', priority: true, badges: ['ARCHITECT'], image: null },
        { name: 'Zyldan', role: 'Desain Web', priority: true, badges: ['VISUAL'], image: null },
      ],
      schedule: {}
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
          <p className="text-white tracking-[0.3em] uppercase text-xs">Accessing Neural Cloud...</p>
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
