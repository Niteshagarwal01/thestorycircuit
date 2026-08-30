import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/home/CTASection';
import { getFounders, getStats } from '@/lib/supabase/queries';


export const metadata = {
  title: 'About | The Story Circuit',
  description: 'Meet the founders and learn the story behind The Story Circuit.',
};

export default async function AboutPage() {
  const [founders, stats] = await Promise.all([
    getFounders(),
    getStats(),
  ]);


  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="ab-hero">
          <div className="ab-hero__orb ab-hero__orb--1" />
          <div className="ab-hero__orb ab-hero__orb--2" />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <span className="label-text">Our Story</span>
            <h1 className="ab-hero__heading">
              We believe great stories<br />
              are the <em className="ab-hero__heading-em">best ads.</em>
            </h1>
            <p className="ab-hero__sub">
              We don&apos;t just create content, We create connections
            </p>
          </div>
        </section>




        {/* ── Values ── */}
        <section className="ab-values">
          <div className="container">
            <div className="ab-values__header">
              <span className="label-text">What Drives Us</span>
              <h2 className="ab-values__heading">Three values.<br /><em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--ink-4)' }}>One obsession.</em></h2>
            </div>
            <div className="ab-values__grid">
              {[
                { num: '01', title: 'Quality Over Quantity', desc: 'We would rather produce three exceptional pieces than twenty mediocre ones. Every frame we deliver represents us.' },
                { num: '02', title: 'Story-First Thinking', desc: 'Aesthetics follow narrative. We start with why a brand exists and what it means to its audience.' },
                { num: '03', title: 'Partnership Mindset', desc: "We're not vendors. We're creative partners invested in your brand growth as much as you are." },
              ].map((v) => (
                <div key={v.num} className="ab-value-card">
                  <span className="ab-value-card__num">{v.num}</span>
                  <h3 className="ab-value-card__title">{v.title}</h3>
                  <p className="ab-value-card__desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Founders ── */}
        {founders.length > 0 && (
          <section className="ab-founders">
            <div className="container">
              <div className="ab-founders__header">
                <span className="label-text">The People</span>
                <h2 className="ab-founders__heading">Meet the founders.</h2>
              </div>
              <div className="ab-founders__grid">
                {founders.map((f) => (
                  <div key={f.id} className="ab-founder-card">
                    <div className="ab-founder-card__photo">
                      {f.photo_url
                        ? <img src={f.photo_url} alt={f.name} />
                        : <div className="ab-founder-card__initials">{f.initials || f.name?.slice(0,2).toUpperCase()}</div>
                      }
                    </div>
                    <div className="ab-founder-card__body">
                      <h3 className="ab-founder-card__name">{f.name}</h3>
                      <p className="ab-founder-card__role">{f.role}</p>
                      <p className="ab-founder-card__bio">{f.bio}</p>
                      <div className="ab-founder-card__socials">
                        {f.instagram && (
                          <a href={`https://instagram.com/${f.instagram.replace('@','')}`} target="_blank" rel="noopener" className="ab-founder-card__social" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                          </a>
                        )}
                        {f.linkedin && f.linkedin !== '#' && (
                          <a href={f.linkedin} target="_blank" rel="noopener" className="ab-founder-card__social" aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
