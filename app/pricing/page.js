import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/home/CTASection';
import { PACKAGES } from '@/lib/data';
import Link from 'next/link';

export const metadata = {
  title: 'Pricing | The Story Circuit',
  description: 'Flexible monthly creative packages for brands of all sizes. Video production, reels, and brand direction.',
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-hero">
          <div className="container">
            <span className="label-text">Transparent Pricing</span>
            <h1 className="section-heading" style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>Simple, honest packages.</h1>
            <p className="body-text" style={{ maxWidth: '480px' }}>No hidden fees, no surprises. Choose the plan that fits your ambition and let&rsquo;s get to work.</p>
          </div>
        </section>

        <section style={{ padding: 'var(--space-xl) 0 var(--space-xl)', background: 'var(--canvas)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', alignItems: 'start' }}>
              {PACKAGES.map(pkg => (
                <div key={pkg.id} style={{
                  background: pkg.popular ? 'var(--canvas-dark)' : 'var(--surface)',
                  border: `1px solid ${pkg.popular ? 'transparent' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.5rem',
                  position: 'relative',
                  transform: pkg.popular ? 'scale(1.03)' : 'none',
                  boxShadow: pkg.popular ? '0 20px 60px rgba(0,0,0,0.15)' : 'none',
                }}>
                  {pkg.popular && (
                    <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'white', color: 'var(--ink)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 1rem', borderRadius: '100px', whiteSpace: 'nowrap' }}>
                      Most Popular
                    </div>
                  )}
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: pkg.popular ? 'rgba(255,255,255,0.45)' : 'var(--ink-4)', marginBottom: '0.75rem' }}>{pkg.name}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 800, color: pkg.popular ? '#fff' : 'var(--ink)', lineHeight: 1, marginBottom: '0.25rem', letterSpacing: '-0.03em' }}>{pkg.price}</p>
                  <p style={{ fontSize: '0.82rem', color: pkg.popular ? 'rgba(255,255,255,0.4)' : 'var(--ink-4)', marginBottom: '1.5rem' }}>per {pkg.period}</p>
                  <p style={{ fontSize: '0.88rem', fontWeight: 300, color: pkg.popular ? 'rgba(255,255,255,0.6)' : 'var(--ink-3)', lineHeight: 1.6, marginBottom: '2rem' }}>{pkg.description}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                    {pkg.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.88rem', color: pkg.popular ? 'rgba(255,255,255,0.75)' : 'var(--ink-3)', fontWeight: 300 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={pkg.popular ? 'rgba(255,255,255,0.6)' : 'var(--ink-3)'} strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`btn ${pkg.popular ? 'btn--ghost-light' : 'btn--primary'}`} style={{ width: '100%', justifyContent: 'center' }}>
                    Get Started
                  </Link>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div style={{ marginTop: 'var(--space-xl)' }}>
              <h2 className="section-heading" style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>Frequently Asked</h2>
              <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                {[
                  { q: 'How does the monthly package work?', a: 'You brief us on your goals, we plan the content calendar, shoot and deliver within your agreed timeline. All revisions are included.' },
                  { q: 'Do you work with brands outside Mumbai?', a: 'Yes! We work with brands across India. For shoots we travel to your location; all strategy, scripting, and editing can be done remotely.' },
                  { q: 'Can I request a custom package?', a: 'Absolutely. Get in touch with your brief and budget and we will put together a custom proposal within 48 hours.' },
                ].map((faq, i) => (
                  <div key={i} style={{ background: 'var(--surface)', padding: '1.75rem 2rem' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.6rem' }}>{faq.q}</p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--ink-3)', fontWeight: 300, lineHeight: 1.7 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
