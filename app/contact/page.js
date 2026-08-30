'use client';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SERVICES = [
  { value: 'video', label: 'Video Production' },
  { value: 'reels', label: 'Vertical Content / Reels' },
  { value: 'branding', label: 'Branding & Direction' },
  { value: 'package', label: 'Monthly Package' },
  { value: 'custom', label: 'Custom Project' },
];

const BUDGETS = [
  { value: 'under-50k', label: 'Under ₹50,000' },
  { value: '50k-1l', label: '₹50,000 – ₹1,00,000' },
  { value: '1l-3l', label: '₹1,00,000 – ₹3,00,000' },
  { value: '3l-plus', label: '₹3,00,000+' },
];

const CONTACT_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    ),
    label: 'Email Us',
    value: 'thestorycircuit26@gmail.com',
    href: 'mailto:thestorycircuit26@gmail.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015 11.91a19.79 19.79 0 01-3.07-8.67A2 2 0 013.92 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
    ),
    label: 'WhatsApp / Call',
    value: '+91 96508 66404',
    href: 'tel:+919650866404',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    ),
    label: 'Instagram',
    value: '@thestorycircuit_',
    href: 'https://instagram.com/thestorycircuit_',
  },
];

/* ── Custom Dropdown ── */
function Dropdown({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="cdd" ref={ref}>
      <button
        type="button"
        className={`cdd__trigger${open ? ' cdd__trigger--open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? 'cdd__trigger-value' : 'cdd__trigger-placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`cdd__chevron${open ? ' cdd__chevron--up' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <ul className="cdd__menu" role="listbox">
          {options.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`cdd__option${opt.value === value ? ' cdd__option--selected' : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.value === value && (
                <svg className="cdd__option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Page ── */
export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', budget: '', service: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleDropdown = (field) => (val) => setForm(prev => ({ ...prev, [field]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSuccess(true);
    setSubmitting(false);
    setForm({ name: '', email: '', company: '', phone: '', budget: '', service: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <main className="ct-page">

        {/* ── Hero ── */}
        <section className="ct-hero">
          <div className="ct-hero__orb ct-hero__orb--1" />
          <div className="ct-hero__orb ct-hero__orb--2" />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <span className="label-text">Get In Touch</span>
            <h1 className="ct-hero__heading">
              Let&rsquo;s create something<br />
              <em className="ct-hero__heading-em">remarkable.</em>
            </h1>
            <p className="ct-hero__sub">Have a project in mind? Fill out the form and we&rsquo;ll get back to you within 24 hours.</p>
          </div>
        </section>

        {/* ── Main Grid ── */}
        <section className="ct-body">
          <div className="container">
            <div className="ct-grid">

              {/* LEFT */}
              <div className="ct-left">
                <h2 className="ct-left__heading">Get in touch</h2>
                <div className="ct-cards">
                  {CONTACT_CARDS.map((c) => (
                    <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="ct-card">
                      <div className="ct-card__icon">{c.icon}</div>
                      <div>
                        <p className="ct-card__label">{c.label}</p>
                        <p className="ct-card__value">{c.value}</p>
                      </div>
                      <svg className="ct-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  ))}
                </div>
                <div className="ct-promise">
                  <div className="ct-promise__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div>
                    <p className="ct-promise__title">24-Hour Response Promise</p>
                    <p className="ct-promise__desc">We respond to all enquiries within 24 hours. For urgent briefs, WhatsApp us directly for a faster turnaround.</p>
                  </div>
                </div>
              </div>

              {/* RIGHT: Form */}
              <div className="ct-right">
                <div className="ct-form-card">
                  <h2 className="ct-form-card__heading">Tell us about your project</h2>

                  {success && (
                    <div className="ct-success">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      Message sent! We&rsquo;ll get back to you within 24 hours.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="ct-form">
                    <div className="ct-form__row">
                      <div className="ct-form__group">
                        <label className="ct-form__label" htmlFor="name">Full Name *</label>
                        <input className="ct-form__input" id="name" name="name" type="text" required placeholder="Your name" value={form.name} onChange={handleChange} />
                      </div>
                      <div className="ct-form__group">
                        <label className="ct-form__label" htmlFor="email">Email Address *</label>
                        <input className="ct-form__input" id="email" name="email" type="email" required placeholder="you@company.com" value={form.email} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="ct-form__row">
                      <div className="ct-form__group">
                        <label className="ct-form__label" htmlFor="company">Company / Brand</label>
                        <input className="ct-form__input" id="company" name="company" type="text" placeholder="Brand name" value={form.company} onChange={handleChange} />
                      </div>
                      <div className="ct-form__group">
                        <label className="ct-form__label" htmlFor="phone">Phone</label>
                        <input className="ct-form__input" id="phone" name="phone" type="tel" placeholder="+91 ..." value={form.phone} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="ct-form__row">
                      <div className="ct-form__group">
                        <label className="ct-form__label">Service Interested In</label>
                        <Dropdown
                          options={SERVICES}
                          value={form.service}
                          onChange={handleDropdown('service')}
                          placeholder="Select a service"
                        />
                      </div>
                      <div className="ct-form__group">
                        <label className="ct-form__label">Approximate Budget</label>
                        <Dropdown
                          options={BUDGETS}
                          value={form.budget}
                          onChange={handleDropdown('budget')}
                          placeholder="Select budget range"
                        />
                      </div>
                    </div>

                    <div className="ct-form__group">
                      <label className="ct-form__label" htmlFor="message">Project Brief *</label>
                      <textarea className="ct-form__textarea" id="message" name="message" required placeholder="Tell us about your project, goals, timeline, and anything else we should know..." value={form.message} onChange={handleChange} rows={5} />
                    </div>

                    <button type="submit" className="ct-form__submit" disabled={submitting}>
                      {submitting ? (
                        <><span className="ct-form__spinner" />Sending...</>
                      ) : (
                        <>Send Enquiry <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                      )}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
