import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* Top content — inside container */}
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__brand-name">The Story Circuit</span>
            <p className="footer__brand-desc">
              Cinematic stories that convert. Premium video production &amp; brand identity for brands that mean business.
            </p>
          </div>

          <div className="footer__col">
            <span className="footer__col-title">Pages</span>
            <Link href="/" className="footer__link">Home</Link>
            <Link href="/portfolio" className="footer__link">Work</Link>
            <Link href="/about" className="footer__link">About</Link>
            <Link href="/contact" className="footer__link">Contact</Link>
          </div>

          <div className="footer__col">
            <span className="footer__col-title">Connect</span>
            <a href="https://instagram.com/thestorycircuit_" target="_blank" rel="noopener" className="footer__link">Instagram</a>
            <a href="mailto:thestorycircuit26@gmail.com" className="footer__link">Email Us</a>
            <Link href="/contact" className="footer__link">Book a Call</Link>
          </div>
        </div>
      </div>

      {/* Copyright — inside container */}
      <div className="footer__inner">
        <div className="footer__bottom" style={{ borderTop: '1px solid var(--border)' }}>
          <span>© {year} The Story Circuit. All rights reserved.</span>
          <span>Crafted with obsession.</span>
        </div>
      </div>

    </footer>
  );
}
