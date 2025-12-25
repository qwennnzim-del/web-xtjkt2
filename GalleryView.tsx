
import React from 'react';
import { Upload, ImageIcon, Trash2, Clock } from 'lucide-react';

interface GalleryViewProps {
  isAdmin: boolean;
  galleryImages: any[];
  setGalleryImages: (imgs: any) => void;
}

const GalleryView = ({ isAdmin, galleryImages, setGalleryImages }: GalleryViewProps) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only admins can trigger this
    if (!isAdmin) return;
    
    const file = e.target.files?.[0];
    if (file) {
      const caption = prompt("Caption momen:");
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImg = { id: Date.now().toString(), url: reader.result as string, caption: caption || "Momen Kelas", date: new Date().toLocaleDateString('id-ID') };
        setGalleryImages([newImg, ...galleryImages]);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImg = (id: string) => {
    if (!isAdmin) return;
    if (confirm("Hapus?")) setGalleryImages(galleryImages.filter(img => img.id !== id));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-6xl font-serif italic text-white">Galeri Momen</h2>
          {isAdmin && (
            <div className="relative overflow-hidden group">
              <button className="px-8 py-4 bg-blue-600 rounded-2xl text-white font-tech text-[10px] flex items-center gap-2 tracking-widest uppercase">
                <Upload size={16}/> Unggah
              </button>
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUpload}/>
            </div>
          )}
        </div>

        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryImages.map(img => (
              <div key={img.id} className="group glass rounded-[32px] overflow-hidden border border-white/5 relative aspect-square">
                <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                  <p className="text-white font-tech text-sm mb-2">{img.caption}</p>
                  <div className="text-blue-400 font-tech text-[10px] uppercase flex items-center gap-2"><Clock size={12}/> {img.date}</div>
                </div>
                {isAdmin && <button onClick={() => deleteImg(img.id)} className="absolute top-4 right-4 w-10 h-10 bg-red-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>}
              </div>
            ))}
          </div>
        ) : (
          <div className="glass p-32 rounded-[40px] text-center text-slate-500 font-tech uppercase text-xs tracking-widest"><ImageIcon size={48} className="mx-auto mb-4 opacity-20"/> Galeri Kosong</div>
        )}
      </div>
    </div>
  );
};

export default GalleryView;
