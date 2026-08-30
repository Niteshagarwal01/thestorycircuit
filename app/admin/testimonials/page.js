'use client';
import { useState, useEffect } from 'react';
import AdminShell from '../AdminShell';
import { createClient } from '@/lib/supabase/client';

const EMPTY = { client_name: '', client_role: '', client_company: '', initials: '', quote: '', rating: 5 };

export default function TestimonialsAdmin() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null | 'new' | {id, ...}
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const supabase = createClient();

  const load = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('order_index');
    setItems(data || []);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => { setEditing('new'); setForm(EMPTY); setMsg(''); };
  const startEdit = (item) => { setEditing(item); setForm(item); setMsg(''); };
  const cancel = () => { setEditing(null); setMsg(''); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    const payload = {
      client_name: form.client_name,
      client_role: form.client_role,
      client_company: form.client_company,
      initials: form.initials || form.client_name.slice(0, 2).toUpperCase(),
      quote: form.quote,
      rating: Number(form.rating),
      order_index: form.order_index || 0,
    };

    let error;
    if (editing === 'new') {
      ({ error } = await supabase.from('testimonials').insert(payload));
    } else {
      ({ error } = await supabase.from('testimonials').update(payload).eq('id', editing.id));
    }

    setSaving(false);
    if (error) { setMsg('Error: ' + error.message); return; }
    setMsg('Saved ✓');
    load();
    setTimeout(() => { setEditing(null); setMsg(''); }, 800);
  };

  const del = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    load();
  };

  return (
    <AdminShell>
      <div className="adm-page">
        <div className="adm-page__header">
          <div>
            <h1 className="adm-page__title">Testimonials</h1>
            <p className="adm-page__sub">{items.length} testimonial{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button className="adm-btn adm-btn--primary" onClick={startNew}>+ Add New</button>
        </div>

        {/* Form */}
        {editing && (
          <div className="adm-form-card">
            <h2 className="adm-form-card__title">{editing === 'new' ? 'Add Testimonial' : 'Edit Testimonial'}</h2>
            <form onSubmit={save} className="adm-form">
              <div className="adm-form__row">
                <div className="adm-field">
                  <label className="adm-label">Client Name *</label>
                  <input className="adm-input" value={form.client_name} onChange={e => setForm(f => ({...f, client_name: e.target.value}))} required />
                </div>
                <div className="adm-field">
                  <label className="adm-label">Role / Title *</label>
                  <input className="adm-input" value={form.client_role} onChange={e => setForm(f => ({...f, client_role: e.target.value}))} required />
                </div>
              </div>
              <div className="adm-form__row">
                <div className="adm-field">
                  <label className="adm-label">Company</label>
                  <input className="adm-input" value={form.client_company} onChange={e => setForm(f => ({...f, client_company: e.target.value}))} />
                </div>
                <div className="adm-field">
                  <label className="adm-label">Rating (1–5)</label>
                  <input className="adm-input" type="number" min="1" max="5" value={form.rating} onChange={e => setForm(f => ({...f, rating: e.target.value}))} />
                </div>
              </div>
              <div className="adm-field">
                <label className="adm-label">Quote *</label>
                <textarea className="adm-input adm-textarea" rows={4} value={form.quote} onChange={e => setForm(f => ({...f, quote: e.target.value}))} required />
              </div>
              {msg && <p className={`adm-msg${msg.startsWith('Error') ? ' adm-msg--err' : ' adm-msg--ok'}`}>{msg}</p>}
              <div className="adm-form__actions">
                <button type="button" className="adm-btn adm-btn--ghost" onClick={cancel}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn--primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr><th>Client</th><th>Company</th><th>Rating</th><th>Quote</th><th></th></tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="adm-table__name">{item.client_name}</div>
                    <div className="adm-table__sub">{item.client_role}</div>
                  </td>
                  <td>{item.client_company}</td>
                  <td>{'★'.repeat(item.rating)}</td>
                  <td className="adm-table__quote">"{item.quote.slice(0, 80)}..."</td>
                  <td>
                    <div className="adm-table__actions">
                      <button className="adm-btn adm-btn--sm" onClick={() => startEdit(item)}>Edit</button>
                      <button className="adm-btn adm-btn--sm adm-btn--danger" onClick={() => del(item.id)}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={5} className="adm-table__empty">No testimonials yet. Add one above.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
