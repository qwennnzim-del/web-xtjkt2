
import React from 'react';
import { Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="py-20 px-6 border-t border-white/5">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <div>
          <div className="text-4xl font-serif italic text-white mb-4">Jangan Lupain Kita Ya!</div>
          <p className="text-slate-500 font-tech uppercase text-xs">X TJKT 2 — TAHUN AJARAN 2025/2026</p>
        </div>
        <div className="flex gap-4">
          <a 
            href="https://www.instagram.com/teknisinya.tjktdua?igsh=bDF5MWV5djkxejc=" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-500 hover:scale-110 shadow-lg shadow-blue-500/0 hover:shadow-blue-500/20"
            aria-label="Instagram Kelas"
          >
            <Instagram size={22}/>
          </a>
        </div>
      </div>
      <div className="mt-20 pt-10 border-t border-white/5 text-[9px] font-tech text-slate-600 uppercase tracking-widest flex justify-between">
        <span>Dibuat dengan semangat oleh X TJKT 2</span>
        <span>CIANJUR, INDONESIA</span>
      </div>
    </div>
  </footer>
);

export default Footer;
