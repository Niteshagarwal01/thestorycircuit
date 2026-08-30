import { SERVICES } from '@/lib/data';

const ICONS = {
  social: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'44px',height:'44px'}}>
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  strategy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'44px',height:'44px'}}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'44px',height:'44px'}}>
      <polygon points="23 7 16 12 23 17 23 7"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'44px',height:'44px'}}>
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
};

export default function ServicesSection() {
  return (
    <section className="services">
      <div className="container">
        <div className="services__header">
          <div>
            <span className="label-text">What We Do</span>
            <h2 className="section-heading" style={{marginTop:'0.75rem'}}>Our Scope of Work</h2>
          </div>
          <p className="body-text" style={{maxWidth:'380px',textAlign:'right'}}>We blend visual artistry with strategic messaging to deliver work that grabs attention and drives results.</p>
        </div>
        <div className="services__grid services__grid--4">
          {SERVICES.map((s) => (
            <div key={s.id} className="service-card">
              <div className="service-card__icon">{ICONS[s.icon]}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
