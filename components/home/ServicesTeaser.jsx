import Link from 'next/link';

const SERVICES = [
  {
    num: '01',
    title: 'Social Media Management',
    tags: ['Instagram', 'YouTube', 'LinkedIn'],
  },
  {
    num: '02',
    title: 'Content Strategy',
    tags: ['Campaign Planning', 'Content Calendar', 'Analytics'],
  },
  {
    num: '03',
    title: 'Content Creation',
    tags: ['Brand Films', 'Reels', 'Photography'],
  },
  {
    num: '04',
    title: 'Brand Growth',
    tags: ['Positioning', 'Identity', 'Audience Expansion'],
  },
];

export default function ServicesTeaser() {
  return (
    <section className="svc-teaser">
      <div className="svc-teaser__inner">

        {/* Header row */}
        <div className="svc-teaser__header">
          <div>
            <span className="label-text">What We Do</span>
            <h2 className="svc-teaser__heading">
              Four <span className="svc-teaser__accent">disciplines.</span><br />
              One <span className="svc-teaser__accent">obsession.</span>
            </h2>
          </div>
          <Link href="/portfolio" className="btn btn--primary svc-teaser__cta">
            See Our Work
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        {/* Service rows */}
        <div className="svc-teaser__list">
          {SERVICES.map((s, i) => (
            <Link href="/portfolio" key={s.num} className="svc-teaser__row">
              <span className="svc-teaser__num">{s.num}</span>
              <span className="svc-teaser__title">{s.title}</span>
              <div className="svc-teaser__tags">
                {s.tags.map(t => (
                  <span key={t} className="svc-teaser__tag">{t}</span>
                ))}
              </div>
              <svg className="svc-teaser__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
