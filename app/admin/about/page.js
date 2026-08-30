'use client';
import { useState, useEffect } from 'react';
import AdminShell from '../AdminShell';
import { createClient } from '@/lib/supabase/client';

export default function AboutAdmin() {
  const supabase = createClient();

  // Agency Info
  const [info, setInfo] = useState({ name: '', tagline: '', description: '', email: '', phone: '', address: '', instagram: '' });
  const [infoId, setInfoId] = useState(null);
  const [infoMsg, setInfoMsg] = useState('');
  const [infoSaving, setInfoSaving] = useState(false);

  // Stats
  const [stats, setStats] = useState([]);
  const [statsMsg, setStatsMsg] = useState('');
  const [statsSaving, setStatsSaving] = useState(false);

  // Founders
  const [founders, setFounders] = useState([]);
  const [editingFounder, setEditingFounder] = useState(null);
  const [founderForm, setFounderForm] = useState({});
  const [founderMsg, setFounderMsg] = useState('');
  const [founderSaving, setFounderSaving] = useState(false);

  const loadAll = async () => {
    const [{ data: infoData }, { data: statsData }, { data: foundersData }] = await Promise.all([
      supabase.from('agency_info').select('*').single(),
      supabase.from('stats').select('*').order('order_index'),
      supabase.from('founders').select('*').order('order_index'),
    ]);
    if (infoData) { setInfo(infoData); setInfoId(infoData.id); }
    setStats(statsData || []);
    setFounders(foundersData || []);
  };

  useEffect(() => { loadAll(); }, []);

  // Save agency info
  const saveInfo = async (e) => {
    e.preventDefault();
    setInfoSaving(true);
    const { error } = infoId
      ? await supabase.from('agency_info').update(info).eq('id', infoId)
      : await supabase.from('agency_info').insert(info);
    setInfoSaving(false);
    setInfoMsg(error ? 'Error: ' + error.message : 'Saved ✓');
    setTimeout(() => setInfoMsg(''), 2000);
  };

  // Save stats
  const saveStat = async (stat) => {
    setStatsSaving(true);
    await supabase.from('stats').update({ number: stat.number, label: stat.label }).eq('id', stat.id);
    setStatsSaving(false);
    setStatsMsg('Saved ✓');
    setTimeout(() => setStatsMsg(''), 2000);
  };

  const updateStat = (id, field, val) => {
    setStats(s => s.map(st => st.id === id ? { ...st, [field]: val } : st));
  };

  // Founders
  const startEditFounder = (f) => { setEditingFounder(f); setFounderForm(f); setFounderMsg(''); };
  const cancelFounder = () => { setEditingFounder(null); setFounderMsg(''); };

  const saveFounder = async (e) => {
    e.preventDefault();
    setFounderSaving(true);
    const { error } = editingFounder === 'new'
      ? await supabase.from('founders').insert(founderForm)
      : await supabase.from('founders').update(founderForm).eq('id', editingFounder.id);
    setFounderSaving(false);
    if (error) { setFounderMsg('Error: ' + error.message); return; }
    setFounderMsg('Saved ✓');
    loadAll();
    setTimeout(() => { setEditingFounder(null); setFounderMsg(''); }, 800);
  };

  const delFounder = async (id) => {
    if (!confirm('Delete this founder?')) return;
    await supabase.from('founders').delete().eq('id', id);
    loadAll();
  };

  return (
    <AdminShell>
      <div className="adm-page">
        <div className="adm-page__header">
          <h1 className="adm-page__title">About Page</h1>
          <p className="adm-page__sub">Edit agency info, stats, and founder profiles.</p>
        </div>

        {/* Agency Info */}
        <div className="adm-form-card">
          <h2 className="adm-form-card__title">Agency Info</h2>
          <form onSubmit={saveInfo} className="adm-form">
            <div className="adm-form__row">
              <div className="adm-field">
                <label className="adm-label">Agency Name</label>
                <input className="adm-input" value={info.name} onChange={e => setInfo(i => ({...i, name: e.target.value}))} />
              </div>
              <div className="adm-field">
                <label className="adm-label">Tagline</label>
                <input className="adm-input" value={info.tagline} onChange={e => setInfo(i => ({...i, tagline: e.target.value}))} />
              </div>
            </div>
            <div className="adm-field">
              <label className="adm-label">Description</label>
              <textarea className="adm-input adm-textarea" rows={3} value={info.description} onChange={e => setInfo(i => ({...i, description: e.target.value}))} />
            </div>
            <div className="adm-form__row">
              <div className="adm-field">
                <label className="adm-label">Email</label>
                <input className="adm-input" type="email" value={info.email} onChange={e => setInfo(i => ({...i, email: e.target.value}))} />
              </div>
              <div className="adm-field">
                <label className="adm-label">Phone</label>
                <input className="adm-input" value={info.phone} onChange={e => setInfo(i => ({...i, phone: e.target.value}))} />
              </div>
            </div>
            <div className="adm-form__row">
              <div className="adm-field">
                <label className="adm-label">Address</label>
                <input className="adm-input" value={info.address} onChange={e => setInfo(i => ({...i, address: e.target.value}))} />
              </div>
              <div className="adm-field">
                <label className="adm-label">Instagram Handle</label>
                <input className="adm-input" value={info.instagram} onChange={e => setInfo(i => ({...i, instagram: e.target.value}))} placeholder="@handle" />
              </div>
            </div>
            {infoMsg && <p className={`adm-msg${infoMsg.startsWith('Error') ? ' adm-msg--err' : ' adm-msg--ok'}`}>{infoMsg}</p>}
            <div className="adm-form__actions">
              <button type="submit" className="adm-btn adm-btn--primary" disabled={infoSaving}>{infoSaving ? 'Saving...' : 'Save Info'}</button>
            </div>
          </form>
        </div>

        {/* Stats */}
        <div className="adm-form-card">
          <h2 className="adm-form-card__title">Stats Strip</h2>
          <div className="adm-stats-editor">
            {stats.map(stat => (
              <div key={stat.id} className="adm-stat-row">
                <div className="adm-field">
                  <label className="adm-label">Number</label>
                  <input className="adm-input" value={stat.number} onChange={e => updateStat(stat.id, 'number', e.target.value)} />
                </div>
                <div className="adm-field">
                  <label className="adm-label">Label</label>
                  <input className="adm-input" value={stat.label} onChange={e => updateStat(stat.id, 'label', e.target.value)} />
                </div>
                <button className="adm-btn adm-btn--sm adm-btn--primary" onClick={() => saveStat(stat)} disabled={statsSaving}>Save</button>
              </div>
            ))}
          </div>
          {statsMsg && <p className="adm-msg adm-msg--ok">{statsMsg}</p>}
        </div>

        {/* Founders */}
        <div className="adm-form-card">
          <div className="adm-form-card__head">
            <h2 className="adm-form-card__title">Founders</h2>
            <button className="adm-btn adm-btn--primary" onClick={() => { setEditingFounder('new'); setFounderForm({ name: '', role: '', bio: '', initials: '', instagram: '', linkedin: '', order_index: founders.length }); }}>+ Add Founder</button>
          </div>

          {editingFounder && (
            <form onSubmit={saveFounder} className="adm-form" style={{ marginTop: '1.5rem' }}>
              <div className="adm-form__row">
                <div className="adm-field">
                  <label className="adm-label">Name *</label>
                  <input className="adm-input" value={founderForm.name || ''} onChange={e => setFounderForm(f => ({...f, name: e.target.value}))} required />
                </div>
                <div className="adm-field">
                  <label className="adm-label">Role *</label>
                  <input className="adm-input" value={founderForm.role || ''} onChange={e => setFounderForm(f => ({...f, role: e.target.value}))} required />
                </div>
              </div>
              <div className="adm-field">
                <label className="adm-label">Bio</label>
                <textarea className="adm-input adm-textarea" rows={3} value={founderForm.bio || ''} onChange={e => setFounderForm(f => ({...f, bio: e.target.value}))} />
              </div>
              <div className="adm-field">
                <label className="adm-label">Photo URL <span className="adm-label__hint">(e.g. /Hemang.jpeg or Google Drive image URL)</span></label>
                <input className="adm-input" value={founderForm.photo_url || ''} onChange={e => setFounderForm(f => ({...f, photo_url: e.target.value}))} placeholder="/Hemang.jpeg" />
                {founderForm.photo_url && (
                  <div className="adm-thumb-preview" style={{marginTop:'0.5rem'}}>
                    <img src={founderForm.photo_url} alt="Preview" onError={e => e.target.style.display='none'} />
                  </div>
                )}
              </div>

              <div className="adm-form__row">
                <div className="adm-field">
                  <label className="adm-label">Initials</label>
                  <input className="adm-input" value={founderForm.initials || ''} onChange={e => setFounderForm(f => ({...f, initials: e.target.value}))} placeholder="HM" maxLength={3} />
                </div>
                <div className="adm-field">
                  <label className="adm-label">Instagram</label>
                  <input className="adm-input" value={founderForm.instagram || ''} onChange={e => setFounderForm(f => ({...f, instagram: e.target.value}))} placeholder="@handle" />
                </div>
                <div className="adm-field">
                  <label className="adm-label">LinkedIn URL</label>
                  <input className="adm-input" value={founderForm.linkedin || ''} onChange={e => setFounderForm(f => ({...f, linkedin: e.target.value}))} placeholder="https://linkedin.com/in/..." />
                </div>
              </div>
              {founderMsg && <p className={`adm-msg${founderMsg.startsWith('Error') ? ' adm-msg--err' : ' adm-msg--ok'}`}>{founderMsg}</p>}
              <div className="adm-form__actions">
                <button type="button" className="adm-btn adm-btn--ghost" onClick={cancelFounder}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn--primary" disabled={founderSaving}>{founderSaving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          )}

          <div className="adm-founders-list">
            {founders.map(f => (
              <div key={f.id} className="adm-founder-row">
                <div className="adm-founder-row__avatar">{f.initials || '?'}</div>
                <div className="adm-founder-row__info">
                  <p className="adm-founder-row__name">{f.name}</p>
                  <p className="adm-founder-row__role">{f.role}</p>
                </div>
                <div className="adm-table__actions">
                  <button className="adm-btn adm-btn--sm" onClick={() => startEditFounder(f)}>Edit</button>
                  <button className="adm-btn adm-btn--sm adm-btn--danger" onClick={() => delFounder(f.id)}>Del</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
