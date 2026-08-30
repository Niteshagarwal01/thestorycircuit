'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { resolveVideoSrc, resolveThumbUrl } from '@/lib/drive';

const FILTERS = [
  { key: 'all', label: 'All Work' },
  { key: 'creative-reels', label: 'Creative Reels' },
  { key: 'creative-graphics', label: 'Creative Graphics' },
];

/* A project is a VIDEO if it has a video_url OR is in creative-reels */
function isVideo(p) {
  return !!(p.video_url) || p.category === 'creative-reels';
}

/* ─── Project Modal (for graphics only) ─── */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;
  const imgUrl = resolveThumbUrl(project.thumbnail);

  return (
    <div className="pw-modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pw-modal__box" onClick={(e) => e.stopPropagation()}>
        <button className="pw-modal__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className="pw-modal__media">
          {imgUrl
            ? <img src={imgUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div className="pw-modal__no-media">No media available</div>
          }
        </div>
        <div className="pw-modal__info">
          <span className="pw-modal__cat">{project.category_label}</span>
          <h2 className="pw-modal__title">{project.title}</h2>
          {project.description && <p className="pw-modal__desc">{project.description}</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── Video Card ─── */
function VideoCard({ project }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const src = resolveVideoSrc(project.video_url);
  const poster = resolveThumbUrl(project.thumbnail) || undefined;
  const isVertical = project.aspect_ratio === '9:16';
  const [paused, setPaused] = useState(false);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  const goFullscreen = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    const c = containerRef.current;
    if (!v || !c) return;
    v.muted = false;
    v.play();
    setPaused(false);
    // Go fullscreen on the CONTAINER so CSS aspect-ratio is respected
    if (c.requestFullscreen) c.requestFullscreen();
    else if (c.webkitRequestFullscreen) c.webkitRequestFullscreen();
  };

  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement && videoRef.current) {
        videoRef.current.muted = true;
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pw-video-card${isVertical ? ' pw-video-card--vertical' : ' pw-video-card--landscape'}`}
    >
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          onClick={togglePlay}
        />
      ) : (
        <div className="pw-video-card__empty">▶</div>
      )}

      {/* Controls bar — always visible at bottom */}
      <div className="pw-video-controls">
        {/* Play / Pause */}
        <button className="pw-video-controls__btn" onClick={togglePlay} aria-label={paused ? 'Play' : 'Pause'}>
          {paused ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          )}
        </button>

        <div className="pw-video-controls__spacer" />

        {/* Fullscreen */}
        <button className="pw-video-controls__btn" onClick={goFullscreen} aria-label="Fullscreen with sound">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Graphic Card ─── */
function GraphicCard({ project, onClick }) {
  const thumbUrl = resolveThumbUrl(project.thumbnail);

  return (
    <div
      className="pw-card pw-card--graphic"
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
    >
      {thumbUrl
        ? <img className="pw-card__media" src={thumbUrl} alt={project.title} loading="lazy" referrerPolicy="no-referrer" />
        : <div className="pw-card__media pw-card__media--empty">🖼</div>
      }
      <div className="pw-card__overlay">
        <div className="pw-card__overlay-bottom">
          <h3 className="pw-card__title">{project.title}</h3>
          {project.description && (
            <p className="pw-card__short-desc">
              {project.description.slice(0, 80)}{project.description.length > 80 ? '…' : ''}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function WorkClient({ portfolio }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const filtered = activeFilter === 'all'
    ? portfolio
    : portfolio.filter((p) => p.category === activeFilter);

  const handleOpen = useCallback((p) => setActiveProject(p), []);
  const handleClose = useCallback(() => setActiveProject(null), []);

  return (
    <main className="pw-page">

      {/* Hero */}
      <section className="pw-hero">
        <div className="pw-hero__orb pw-hero__orb--1" />
        <div className="pw-hero__orb pw-hero__orb--2" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="label-text">Selected Work</span>
          <h1 className="pw-hero__heading">
            Stories we&apos;ve<br/>
            <em className="pw-hero__heading-em">built.</em>
          </h1>
          <p className="pw-hero__sub">
            A curated collection of brand films, social reels, and visual identities<br />
            crafted for brands that mean business.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pw-filters-bar">
        <div className="container">
          <div className="pw-filters">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`pw-filter${activeFilter === f.key ? ' pw-filter--active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pw-grid-section">
        <div className="container">
          {filtered.length > 0 ? (
            <div className="pw-masonry">
              {filtered.map((p) => {
                const vid = isVideo(p);
                const isVertical = p.aspect_ratio === '9:16';
                return (
                  <div
                    key={p.id}
                    className={`pw-masonry__item${
                      vid && isVertical
                        ? ' pw-masonry__item--vertical'
                        : vid
                        ? ' pw-masonry__item--landscape'
                        : ' pw-masonry__item--graphic'
                    }`}
                  >
                    {vid
                      ? <VideoCard project={p} />
                      : <GraphicCard project={p} onClick={handleOpen} />
                    }
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="pw-empty">
              <p>No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pw-cta">
        <div className="container">
          <div className="pw-cta__inner">
            <h2 className="pw-cta__heading">Like what you see?</h2>
            <p className="pw-cta__desc">Let&apos;s build something unforgettable together.</p>
            <a href="/contact" className="pw-cta__btn">
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {activeProject && <ProjectModal project={activeProject} onClose={handleClose} />}
    </main>
  );
}
