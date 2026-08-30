'use client';
import { useRef, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function TestimonialsSection() {
  const trackRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('testimonials')
      .select('*')
      .order('order_index')
      .then(({ data }) => setTestimonials(data || []));
  }, []);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector('.testimonial-card');
    const w = card ? card.offsetWidth + 24 : 560;
    trackRef.current.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="testimonials">
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="testimonials__nav">
          <div>
            <span className="label-text" style={{ color: 'rgba(255,255,255,0.5)' }}>Kind Words</span>
            <h2 className="section-heading" style={{ marginTop: '0.75rem', color: '#fff' }}>Client Stories</h2>
          </div>
          <div className="testimonials__arrows">
            <button className="testimonials__arrow" onClick={() => scroll(-1)} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="testimonials__arrow" onClick={() => scroll(1)} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        <div className="testimonials__track" ref={trackRef}>
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="testimonial-card__quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.initials || t.client_name?.slice(0,2).toUpperCase()}</div>
                <div>
                  <p className="testimonial-card__name">{t.client_name}</p>
                  <p className="testimonial-card__role">{t.client_role}{t.client_company ? `, ${t.client_company}` : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
