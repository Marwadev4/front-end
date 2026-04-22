'use client';
import { useState, useEffect } from 'react';
import { fetchFonts, deleteFont } from '../utils/api';
import FontCard from '../components/FontCard';
import FontUpload from '../components/FontUpload';

export default function Home() {
  const [fonts, setFonts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFonts = async () => {
    try {
      setLoading(true);
      const data = await fetchFonts();
      setFonts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this font?')) return;
    try {
      await deleteFont(id);
      loadFonts();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="container py-24 animate-slide-up">
      <header className="text-center" style={{ marginBottom: '6rem', marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="mb-6" style={{ marginBottom: '1.5rem', fontSize: '4rem', fontWeight: 900 }}>Typography Vault</h1>
        <p className="text-muted leading-relaxed" style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
          A high-performance sanctuary for your professional font collection. 
          Manage, preview, and deploy typography assets with surgical precision.
        </p>
      </header>

      <section style={{ marginBottom: '8rem' }}>
        <FontUpload onUploadSuccess={loadFonts} />
      </section>

      <section className="pb-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 item-spacing border-b border-white/5 pb-10" style={{ marginBottom: '4rem' }}>
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
              Vault Collection
              <span className="badge bg-primary/10 text-primary border-primary/20 text-sm py-1.5 px-4 font-bold tracking-widest">
                {fonts.length} {fonts.length === 1 ? 'ASSET' : 'ASSETS'}
              </span>
            </h2>
            <p className="text-xl text-slate-400">Explore and manage your indexed typography assets.</p>
          </div>
        </div>

        {loading && fonts.length === 0 ? (
          <div className="grid-layout">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass h-72 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="glass p-16 text-center border-rose-500/20">
            <p className="text-rose-400 text-lg mb-6">System Connection Error: {error}</p>
            <button onClick={loadFonts} className="btn btn-outline">Initialize Retry</button>
          </div>
        ) : fonts.length === 0 ? (
          <div className="glass p-32 text-center border-dashed">
            <p className="text-2xl text-muted mb-4 font-semibold">Your vault is empty</p>
            <p className="text-slate-500 mb-8">Synchronize your first font asset to begin.</p>
            <button className="btn btn-primary" onClick={() => document.getElementById('font-file').click()}>
              Initialize First Upload
            </button>
          </div>
        ) : (
          <div className="grid-layout">
            {fonts.map(font => (
              <FontCard key={font.id} font={font} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </section>

      <footer className="mt-40 mb-12 text-center text-sm text-slate-600 border-t border-white/5 pt-10">
        <p>Built with Next.js, Flask & High-End Design Systems</p>
      </footer>
    </div>
  );
}
