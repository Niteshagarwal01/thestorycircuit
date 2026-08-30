'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

function IPhoneMockup() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }, []);

  return (
    <div className="iphone">
      {/* Volume + silent buttons (left side) */}
      <div className="iphone__power-btn" />

      {/* Power button (right side) */}
      <div className="iphone__side-btn" />

      {/* Screen */}
      <div className="iphone__screen">
        {/* Dynamic Island */}
        <div className="iphone__island" />

        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  );
}



export default function HeroSection() {
  return (
    <section className="hero">
      {/* Background Blobs & Grain */}
      <div className="hero__grain" />
      <div className="hero__blob hero__blob--purple" />
      <div className="hero__blob hero__blob--rose" />
      <div className="hero__blob hero__blob--amber" />

      <div className="hero__inner">

        {/* ── Left column: text ── */}
        <div className="hero__text">
          {/* Live badge */}
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            <span className="hero__eyebrow-text">Creative Media Agency</span>
          </div>

          {/* Heading */}
          <h1 className="hero__heading">
            We craft<br />
            <em>stories</em><br />
            that sell.
          </h1>

          {/* Description */}
          <p className="hero__desc">
            Premium video production, brand reels, and creative direction —
            helping brands stand out through cinematic, high-impact visual content.
          </p>

          {/* CTAs */}
          <div className="hero__actions">
            <Link href="/portfolio" className="btn btn--primary btn--icon">
              View Our Work
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link href="/contact" className="btn btn--ghost">
              Book a Call
            </Link>
          </div>
        </div>

        {/* ── Right column: phone + chips ── */}
        <div className="hero__phone-col">
          {/* Soft glow */}
          <div className="hero__phone-glow" />

          {/* Floating glass chips */}
          <div className="hero__chip hero__chip--tl">
            <span className="hero__chip-dot" style={{ background: '#22c55e' }} />
            5★ Rated
          </div>

          <div className="hero__chip hero__chip--tr">
            <span className="hero__chip-dot" style={{ background: '#f59e0b' }} />
            Brand Films
          </div>

          <div className="hero__chip hero__chip--bl">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
            </svg>
            Video Production
          </div>

          <div className="hero__chip hero__chip--br">
            <span className="hero__chip-dot" style={{ background: '#8b5cf6' }} />
            Premium Quality
          </div>

          {/* iPhone mockup */}
          <div className="iphone-wrap">
            <IPhoneMockup />
          </div>
        </div>

      </div>
    </section>
  );
}
