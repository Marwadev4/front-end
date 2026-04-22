'use client';
import { useState, useRef } from 'react';
import { uploadFont } from '../utils/api';

export default function FontUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [metadata, setMetadata] = useState({ name: '', family: '', style: 'Regular' });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Try to auto-fill name from filename
      const name = selectedFile.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setMetadata(prev => ({ ...prev, name, family: name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', metadata.name);
    formData.append('family', metadata.family);
    formData.append('style', metadata.style);

    try {
      await uploadFont(formData);
      setFile(null);
      setMetadata({ name: '', family: '', style: 'Regular' });
      onUploadSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass border-white/10 relative" style={{ position: 'relative', overflow: 'hidden', padding: '2rem', margin: '0 auto', maxWidth: '1000px', borderRadius: '32px' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, zIndex: -10, borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', width: '24rem', height: '24rem', filter: 'blur(120px)' }} />
      <div className="text-center" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
        <h2 className="font-black gradient-text tracking-tighter" style={{ fontSize: '2rem', margin: 0 }}>Index New Asset</h2>
        <p className="text-muted leading-relaxed" style={{ fontSize: '0.95rem', maxWidth: '42rem', margin: 0 }}>
          Populate the vault with new cryptographic typography resources.
          Our system automatically extracts metadata for instant indexing.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', width: '100%', maxWidth: '950px', margin: '0 auto' }}>
          {/* File Upload Zone */}
          <div
            className={`relative border-2 border-dashed transition-all duration-500 group cursor-pointer overflow-hidden flex flex-col justify-center ${file ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-primary/30 hover:bg-white/[0.02]'}`}
            style={{ borderRadius: '24px', padding: '1px 1px', textAlign: 'center', width: '100%', minHeight: '320px' }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const droppedFile = e.dataTransfer.files[0];
              if (droppedFile) setFile(droppedFile);
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            {/* Sparkle Icon */}
            <div className="absolute animate-pulse opacity-50 text-yellow-400" style={{ top: '1.5rem', right: '1.5rem', fontSize: '1.5rem' }}>✨</div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
              <h3 className="font-black text-white tracking-tight leading-tight text-center" style={{ fontSize: '1.5rem', margin: 0 }}>
                {file ? "Asset identified" : "Index typography"}
              </h3>

              <div className="btn btn-primary rounded-full transition-transform group-hover:scale-105" style={{ padding: '0.875rem 2rem', fontSize: '1rem', boxShadow: '0 0 40px rgba(139,92,246,0.2)' }}>
                {file ? "Change Asset" : "Select Asset"}
              </div>

              <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p className="text-slate-400 font-medium" style={{ fontSize: '1rem', margin: 0 }}>
                  or <span className="text-white">drop file here</span>
                </p>
                <p className="text-slate-500 font-mono uppercase opacity-60" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', margin: 0 }}>
                  TTF • OTF • WOFF • WOFF2
                </p>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".ttf,.otf,.woff,.woff2"
            />
          </div>

          {/* Metadata Form Zone */}
          <div className="glass border-white/5 flex flex-col justify-center" style={{ padding: '2.5rem 2rem', borderRadius: '24px', width: '100%', minHeight: '320px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label className="text-slate-500 uppercase font-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', marginLeft: '0.25rem' }}>Asset Identity</label>
                <input
                  type="text"
                  className="input-field bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-primary/50 transition-colors"
                  style={{ padding: '0.875rem 1.25rem', fontSize: '0.95rem' }}
                  placeholder="e.g. Satoshi Variable"
                  value={metadata.name}
                  onChange={e => setMetadata({ ...metadata, name: e.target.value })}
                  required
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label className="text-slate-500 uppercase font-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', marginLeft: '0.25rem' }}>Family</label>
                  <input
                    type="text"
                    className="input-field bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-primary/50 transition-colors"
                    style={{ padding: '0.875rem 1.25rem', fontSize: '0.95rem' }}
                    placeholder="Satoshi"
                    value={metadata.family}
                    onChange={e => setMetadata({ ...metadata, family: e.target.value })}
                    required
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label className="text-slate-500 uppercase font-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', marginLeft: '0.25rem' }}>Style</label>
                  <div style={{ position: 'relative' }}>
                    <div
                      className="input-field bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-primary/50 transition-colors"
                      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.25rem', fontSize: '0.95rem' }}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span>{metadata.style}</span>
                    </div>

                    {dropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 glass border border-white/10 rounded-xl overflow-hidden z-50 animate-slide-up shadow-2xl">
                        {['Regular', 'Bold', 'Italic', 'Light', 'Black'].map((option) => (
                          <div
                            key={option}
                            className={`px-4 py-2.5 cursor-pointer transition-colors hover:bg-primary/20 text-sm ${metadata.style === option ? 'bg-primary/10 text-primary' : 'text-white/80'}`}
                            onClick={() => {
                              setMetadata({ ...metadata, style: option });
                              setDropdownOpen(false);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', paddingTop: '0.5rem', width: '100%' }}>
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 font-medium" style={{ padding: '1rem 2rem', borderRadius: '1rem', fontSize: '0.875rem' }}>
              ⚠️ System Message: {error}
            </div>
          )}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              disabled={loading || !file}
              className="btn btn-primary font-bold tracking-tight transition-all"
              style={{ width: '100%', maxWidth: '24rem', padding: '1rem', fontSize: '1.1rem', boxShadow: '0 20px 50px rgba(139,92,246,0.3)' }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="animate-spin" style={{ fontSize: '1.5rem' }}>⏳</span> Synchronizing...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  Initialize Upload <span style={{ opacity: 0.5 }}>→</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
