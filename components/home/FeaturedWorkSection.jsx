'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PORTFOLIO } from '@/lib/data';

function gridClass(size) {
  if (size === 'large') return 'portfolio-card--large';
  if (size === 'wide')  return 'portfolio-card--wide';
  if (size === 'tall')  return 'portfolio-card--tall';
  return 'portfolio-card--std';
}

function PortfolioCard({ project, onClick }) {
  return (
    <div
      className={`portfolio-card ${gridClass(project.gridSize)}`}
      onClick={() => onClick(project)}
      style={{ cursor: 'pointer' }}
    >
      {project.mediaType === 'video' ? (
        <video
          className="portfolio-card__media"
          src={project.src}
          muted
          loop
          playsInline
          preload="metadata"
          onMouseEnter={e => e.currentTarget.play().catch(() => {})}
          onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
        />
      ) : (
        <img className="portfolio-card__media" src={project.src} alt={project.title} loading="lazy" />
      )}

      <div className="portfolio-card__overlay">
        <span className="portfolio-card__cat">{project.categoryLabel}</span>
        <h3 className="portfolio-card__title">{project.title}</h3>
      </div>

      {project.mediaType === 'video' && (
        <div className="portfolio-card__play">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      )}

      <div className="portfolio-card__arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const isVertical = project.gridSize === 'tall';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-box__close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className={`modal-box__media${isVertical ? ' modal-box__media--vertical' : ''}`}>
          {project.mediaType === 'video' ? (
            <video src={project.src} controls autoPlay playsInline />
          ) : (
            <img src={project.src} alt={project.title} />
          )}
        </div>

        <div className="modal-box__body">
          <p className="modal-box__cat">{project.categoryLabel}</p>
          <h2 className="modal-box__title">{project.title}</h2>
          <div className="modal-box__meta">
            <div className="modal-box__meta-item">
              <label>Client</label>
              <span>{project.client}</span>
            </div>
            <div className="modal-box__meta-item">
              <label>Year</label>
              <span>{project.year}</span>
            </div>
          </div>
          <p className="modal-box__desc">{project.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWorkSection() {
  const [activeProject, setActiveProject] = useState(null);
  const featured = PORTFOLIO.filter(p => p.featured);

  return (
    <section className="work">
      <div className="container">
        <div className="work__header">
          <div>
            <span className="label-text">Showcase</span>
            <h2 className="section-heading" style={{ marginTop: '0.75rem' }}>Featured Work</h2>
          </div>
          <Link href="/portfolio" className="btn btn--ghost btn--icon">
            View All Projects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        <div className="portfolio-grid">
          {featured.map(p => (
            <PortfolioCard key={p.id} project={p} onClick={setActiveProject} />
          ))}
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
