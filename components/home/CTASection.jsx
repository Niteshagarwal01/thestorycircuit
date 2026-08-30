import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="cta-section">
      {/* Background orbs */}
      <div className="cta-section__orb cta-section__orb--1" />
      <div className="cta-section__orb cta-section__orb--2" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="cta-section__card">
          <span className="label-text" style={{ color: 'var(--ink-4)' }}>Let&rsquo;s Work Together</span>
          <h2 className="cta-section__heading">
            Ready to tell<br />
            <em className="cta-section__heading-em">your</em> story?
          </h2>
          <p className="cta-section__desc">
            Let&rsquo;s create something your audience will remember. Drop us a line or book a discovery call today.
          </p>
          <div className="cta-section__actions">
            <Link href="/contact" className="cta-section__btn-primary">
              Book a Call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a href="mailto:thestorycircuit26@gmail.com" className="cta-section__btn-ghost">
              thestorycircuit26@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
