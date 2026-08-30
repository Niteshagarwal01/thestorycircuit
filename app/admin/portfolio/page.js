'use client';
import { useState, useEffect } from 'react';
import AdminShell from '../AdminShell';
import { createClient } from '@/lib/supabase/client';
import { extractDriveId, driveThumbnail } from '@/lib/drive';

const CATEGORIES = [
  { value: 'creative-reels', label: 'Creative Reels' },
  { value: 'creative-graphics', label: 'Creative Graphics' },
];

const EMPTY = {
  title: '',
  category: 'creative-reels',
  category_label: 'Creative Reels',
  video_url: '',
  thumbnail: '',
  description: '',
  aspect_ratio: '9:16',
  order_index: 0,
};

export default function PortfolioAdmin() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [videoLink, setVideoLink] = useState('');
  const [thumbLink, setThumbLink] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [msg, setMsg] = useState('');
  const supabase = createClient();

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'video' && file.size > 50 * 1024 * 1024) {
      alert('Video must be under 50MB.');
      e.target.value = ''; // Reset input
      return;
    }

    if (type === 'video') setUploadingVideo(true);
    else setUploadingThumb(true);

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    
    // Upload to 'VIDEOS' bucket
    const { data, error } = await supabase.storage
      .from('VIDEOS')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (type === 'video') setUploadingVideo(false);
    else setUploadingThumb(false);

    if (error) {
      alert('Upload failed: ' + error.message);
      e.target.value = '';
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('VIDEOS').getPublicUrl(fileName);

    if (type === 'video') setVideoLink(publicUrl);
    else setThumbLink(publicUrl);
    
    e.target.value = '';
  };

  const load = async () => {
    const { data } = await supabase.from('portfolio').select('*').order('order_index');
    setItems(data || []);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => {
    setEditing('new'); setForm(EMPTY);
    setVideoLink(''); setThumbLink(''); setMsg('');
  };

  const startEdit = (item) => {
    setEditing(item); setForm(item);
    setVideoLink(item.video_url || '');
    setThumbLink(item.thumbnail || '');
    setMsg('');
  };

  const cancel = () => { setEditing(null); setMsg(''); };

  const handleCategoryChange = (val) => {
    const cat = CATEGORIES.find(c => c.value === val);
    setForm(f => ({ ...f, category: val, category_label: cat?.label || val }));
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setMsg('');

    const payload = {
      title: form.title,
      category: form.category,
      category_label: form.category_label,
      video_url: videoLink || form.video_url || '',
      thumbnail: thumbLink || form.thumbnail || '',
      description: form.description || '',
      aspect_ratio: form.aspect_ratio || '9:16',
      order_index: Number(form.order_index) || 0,
    };

    let error;
    if (editing === 'new') {
      ({ error } = await supabase.from('portfolio').insert(payload));
    } else {
      ({ error } = await supabase.from('portfolio').update(payload).eq('id', editing.id));
    }

    setSaving(false);
    if (error) { setMsg('Error: ' + error.message); return; }
    setMsg('Saved ✓');
    load();
    setTimeout(() => { setEditing(null); setMsg(''); }, 800);
  };

  const del = async (id) => {
    if (!confirm('Delete this project?')) return;
    await supabase.from('portfolio').delete().eq('id', id);
    load();
  };

  /* derive thumbnail preview from Drive URL */
  const thumbPreview = (() => {
    const tId = extractDriveId(thumbLink);
    if (tId) return driveThumbnail(tId);
    if (thumbLink) return thumbLink;
    // Fallback to video link for auto-generated thumbnail
    const vId = extractDriveId(videoLink);
    if (vId) return driveThumbnail(vId);
    return null;
  })();

  return (
    <AdminShell>
      <div className="adm-page">
        <div className="adm-page__header">
          <div>
            <h1 className="adm-page__title">Portfolio</h1>
            <p className="adm-page__sub">{items.length} project{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button className="adm-btn adm-btn--primary" onClick={startNew}>+ Add Project</button>
        </div>

        {editing && (
          <div className="adm-form-card">
            <h2 className="adm-form-card__title">{editing === 'new' ? 'Add Project' : 'Edit Project'}</h2>
            <form onSubmit={save} className="adm-form">

              {/* Title + Category — always shown */}
              <div className="adm-form__row">
                <div className="adm-field">
                  <label className="adm-label">Title *</label>
                  <input className="adm-input" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} required />
                </div>
                <div className="adm-field">
                  <label className="adm-label">Category</label>
                  <select className="adm-input adm-select" value={form.category} onChange={e => handleCategoryChange(e.target.value)}>
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              {/* ── CREATIVE REELS fields ── */}
              {form.category === 'creative-reels' && (<>

                {/* Aspect Ratio */}
                <div className="adm-field">
                  <label className="adm-label">Aspect Ratio</label>
                  <select className="adm-input adm-select" value={form.aspect_ratio || '9:16'} onChange={e => setForm(f => ({...f, aspect_ratio: e.target.value}))}>
                    <option value="9:16">9:16 — Vertical (Reels / TikTok)</option>
                    <option value="16:9">16:9 — Landscape (Brand Films)</option>
                  </select>
                </div>

                {/* Video Upload */}
                <div className="adm-field">
                  <label className="adm-label">Video File <span className="adm-label__hint">(Max 50MB — uploads to Supabase)</span></label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      onChange={(e) => handleUpload(e, 'video')}
                      disabled={uploadingVideo}
                      className="adm-btn adm-btn--ghost"
                      style={{ padding: '0.5rem', width: 'auto' }}
                    />
                    {uploadingVideo && <span style={{ color: '#0070f3', fontSize: '0.9rem' }}>⏳ Uploading video...</span>}
                  </div>
                  <input
                    className="adm-input"
                    value={videoLink}
                    onChange={e => setVideoLink(e.target.value)}
                    placeholder="Or paste a direct video URL"
                  />
                  {videoLink && videoLink.includes('supabase') && (
                    <p className="adm-field__preview" style={{ color: '#10b981' }}>✓ Supabase video ready</p>
                  )}
                </div>

                {/* Poster / Thumbnail — optional for reels */}
                <div className="adm-field">
                  <label className="adm-label">Poster / Thumbnail <span className="adm-label__hint">(optional — leave empty to auto-extract)</span></label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUpload(e, 'thumb')}
                      disabled={uploadingThumb}
                      className="adm-btn adm-btn--ghost"
                      style={{ padding: '0.5rem', width: 'auto' }}
                    />
                    {uploadingThumb && <span style={{ color: '#0070f3', fontSize: '0.9rem' }}>⏳ Uploading image...</span>}
                  </div>
                  <input
                    className="adm-input"
                    value={thumbLink}
                    onChange={e => setThumbLink(e.target.value)}
                    placeholder="Or paste a direct image URL"
                  />
                  {thumbLink && (
                    <div className="adm-thumb-preview">
                      <img src={thumbLink} alt="Thumbnail preview" />
                    </div>
                  )}
                </div>

              </>)}

              {/* ── CREATIVE GRAPHICS fields ── */}
              {form.category === 'creative-graphics' && (<>

                {/* Image Upload — Supabase primary, Drive fallback */}
                <div className="adm-field">
                  <label className="adm-label">
                    Graphic Image
                    <span className="adm-label__hint"> — upload directly or paste a Google Drive link</span>
                  </label>

                  {/* Supabase upload */}
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUpload(e, 'thumb')}
                      disabled={uploadingThumb}
                      className="adm-btn adm-btn--ghost"
                      style={{ padding: '0.5rem', width: 'auto' }}
                    />
                    {uploadingThumb && <span style={{ color: '#0070f3', fontSize: '0.9rem' }}>⏳ Uploading image...</span>}
                  </div>

                  {/* Drive link fallback */}
                  <input
                    className="adm-input"
                    value={thumbLink}
                    onChange={e => setThumbLink(e.target.value)}
                    placeholder="Or paste Google Drive share link"
                  />

                  {/* Live preview */}
                  {thumbLink && (
                    <div className="adm-thumb-preview" style={{ marginTop: '0.75rem' }}>
                      {thumbLink.includes('supabase') ? (
                        <>
                          <img src={thumbLink} alt="Preview" referrerPolicy="no-referrer"
                            style={{ width: '100%', maxHeight: '260px', objectFit: 'contain', borderRadius: '8px' }} />
                          <p className="adm-field__preview" style={{ color: '#10b981', marginTop: '0.5rem' }}>✓ Supabase image ready</p>
                        </>
                      ) : extractDriveId(thumbLink) ? (
                        <>
                          <img src={`https://drive.google.com/uc?export=view&id=${extractDriveId(thumbLink)}`}
                            alt="Preview" referrerPolicy="no-referrer"
                            style={{ width: '100%', maxHeight: '260px', objectFit: 'contain', borderRadius: '8px', background: '#f0f0f0' }} />
                          <p className="adm-field__preview" style={{ color: '#10b981', marginTop: '0.5rem' }}>✓ Google Drive image detected</p>
                        </>
                      ) : null}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="adm-field">
                  <label className="adm-label">Description <span className="adm-label__hint">(optional)</span></label>
                  <textarea className="adm-input adm-textarea" rows={2} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
                </div>

              </>)}

              {/* Description for Reels */}
              {form.category === 'creative-reels' && (
                <div className="adm-field">
                  <label className="adm-label">Description <span className="adm-label__hint">(optional)</span></label>
                  <textarea className="adm-input adm-textarea" rows={2} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
                </div>
              )}

              {msg && <p className={`adm-msg${msg.startsWith('Error') ? ' adm-msg--err' : ' adm-msg--ok'}`}>{msg}</p>}
              <div className="adm-form__actions">
                <button type="button" className="adm-btn adm-btn--ghost" onClick={cancel}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn--primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        )}

        {/* Grid */}
        <div className="adm-portfolio-grid">
          {items.map(item => (
            <div key={item.id} className="adm-portfolio-card">
              <div className="adm-portfolio-card__thumb">
                {(item.thumbnail || item.video_url)
                  ? <img src={(() => { 
                      const tId = extractDriveId(item.thumbnail); 
                      if (tId) return driveThumbnail(tId);
                      if (item.thumbnail) return item.thumbnail;
                      const vId = extractDriveId(item.video_url);
                      if (vId) return driveThumbnail(vId);
                      return null;
                    })()} alt={item.title} />
                  : <div className="adm-portfolio-card__thumb-empty">▶</div>
                }
              </div>
              <div className="adm-portfolio-card__body">
                <p className="adm-portfolio-card__title">{item.title}</p>
                <p className="adm-portfolio-card__meta">{item.category_label} · {item.aspect_ratio}</p>
              </div>
              <div className="adm-portfolio-card__actions">
                <button className="adm-btn adm-btn--sm" onClick={() => startEdit(item)}>Edit</button>
                <button className="adm-btn adm-btn--sm adm-btn--danger" onClick={() => del(item.id)}>Del</button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="adm-empty">No projects yet. Add your first one.</div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
