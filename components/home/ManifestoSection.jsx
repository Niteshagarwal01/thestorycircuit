'use client';
import { useState, useRef } from 'react';

const PRINCIPLES = [
  {
    num: '01',
    heading: 'Story drives everything.',
    desc: 'Before we pick up a camera, we craft the narrative. Great visuals without a story are just noise.',
  },
  {
    num: '02',
    heading: 'Craft is non-negotiable.',
    desc: 'Every frame, every cut, every colour grade is intentional. We build content that earns attention.',
  },
  {
    num: '03',
    heading: 'Results are the point.',
    desc: "Beautiful content that doesn't convert is just art. We make work that actually grows businesses.",
  },
];

export default function ManifestoSection() {
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const rewind = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
  };

  const forward = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(
      videoRef.current.duration || 0,
      videoRef.current.currentTime + 10
    );
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="manifesto">

      {/* ── Sticky Video ── */}
      <div className="manifesto__sticky-wrap">
        <div className="manifesto__video-bg" onClick={togglePlay}>

          <video
            ref={videoRef}
            className="manifesto__video"
            src="/homepagedeomo.mp4"
            playsInline
            muted={isMuted}
            preload="metadata"
            onEnded={() => setPlaying(false)}
          />

          {/* Hover overlay — shows controls on hover */}
          <div className="manifesto__overlay">

            {/* Center controls: Rewind | Play/Pause | Forward */}
            <div className="manifesto__yt-controls">
              {/* Rewind 10s */}
              <button className="manifesto__yt-btn" onClick={rewind} aria-label="Rewind 10 seconds">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                </svg>
                <span className="manifesto__yt-label">10</span>
              </button>

              {/* Play / Pause — bigger */}
              <button className="manifesto__yt-btn manifesto__yt-btn--main" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
                {playing ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              {/* Forward 10s */}
              <button className="manifesto__yt-btn" onClick={forward} aria-label="Forward 10 seconds">
                <span className="manifesto__yt-label">10</span>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{transform: 'scaleX(-1)'}}>
                  <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                </svg>
              </button>
            </div>

            {/* Mute button — bottom right corner */}
            <button className="manifesto__yt-mute" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                  <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* ── Principle Cards ── */}
      <div className="manifesto__principles-wrap">
        <div className="manifesto__principles-header">
          <span className="label-text">Our Philosophy</span>
          <h2 className="manifesto__principles-heading">The way we work.</h2>
        </div>
        <div className="manifesto__principles">
          {PRINCIPLES.map((p) => (
            <div key={p.num} className="manifesto__principle">
              <span className="manifesto__principle-num">{p.num} /</span>
              <h3 className="manifesto__principle-heading">{p.heading}</h3>
              <p className="manifesto__principle-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
