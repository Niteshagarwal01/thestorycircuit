'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { href: '/',          label: 'Home' },
    { href: '/portfolio', label: 'Work' },
    { href: '/about',     label: 'About' },
    { href: '/contact',   label: 'Contact' },
  ];

  return (
    <>
      {/* ── Floating glass pill navbar ── */}
      <nav className="navbar">
        <div className="navbar__inner">

          {/* Logo */}
          <Link href="/" className="navbar__logo">
            <Image
              src="/logo.png"
              alt="The Story Circuit"
              width={110}
              height={28}
              className="navbar__logo-img"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="navbar__links">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`navbar__link${pathname === l.href ? ' navbar__link--active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA dark pill */}
          <Link href="/contact" className="navbar__cta">Book a Call</Link>

          {/* Mobile hamburger */}
          <button
            className={`navbar__toggle${mobileOpen ? ' navbar__toggle--open' : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Full-screen mobile menu ── */}
      <div className={`navbar__mobile${mobileOpen ? ' navbar__mobile--open' : ''}`}>
        {links.map(l => (
          <Link key={l.href} href={l.href} className="navbar__mobile-link">
            {l.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="btn btn--primary"
          style={{ marginTop: '0.5rem', borderRadius: '100px' }}
        >
          Book a Call
        </Link>
      </div>
    </>
  );
}
