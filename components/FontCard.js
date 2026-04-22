'use client';
import { getDownloadUrl } from '../utils/api';

export default function FontCard({ font, onDelete }) {
  const sizeKB = (font.file_size / 1024).toFixed(1);
  const showFamilyBadge = font.family && font.family !== font.name;
  
  return (
    <div className="glass glass-hover rounded-[32px]" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          <h3 className="text-2xl font-black text-white tracking-tight leading-tight" style={{ margin: 0 }}>{font.name}</h3>
          {showFamilyBadge && (
            <span className="badge bg-white/10 text-white/90 border-white/20">{font.family}</span>
          )}
          <span className="text-xs text-primary font-bold uppercase tracking-[0.1em] bg-primary/10 rounded-full" style={{ padding: '0.3rem 0.75rem' }}>{font.style}</span>
        </div>
        <div className="text-xs font-mono text-slate-500 opacity-80 uppercase tracking-widest" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Asset Size:</span>
          <span className="text-white/70">{sizeKB} KB</span>
        </div>
      </div>
      
      <div 
        className="rounded-[24px] border border-white/5 relative overflow-hidden group"
        style={{ 
          padding: '2rem 1.5rem', 
          backgroundColor: 'rgba(10, 10, 15, 0.6)', 
          minHeight: '120px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <p 
          className="text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-105" 
          style={{ fontFamily: font.family, fontSize: '2.5rem', lineHeight: '1.3', textAlign: 'center', margin: 0, wordBreak: 'break-word' }}
        >
          {font.name}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <a 
          href={getDownloadUrl(font.id)} 
          className="btn btn-primary flex-1 text-base rounded-[20px] shadow-[0_10px_30px_rgba(139,92,246,0.2)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.4)]"
          style={{ padding: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          download
        >
          <span className="opacity-70 text-sm">↓</span> Download Asset
        </a>
        <button 
          onClick={() => onDelete(font.id)}
          className="btn border border-rose-500/20 hover:border-rose-500/40 rounded-[20px] transition-all"
          style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', padding: '0 1.5rem' }}
          title="Delete Asset"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
