'use client';

const ITEMS = [
  'Video Production',
  'Brand Reels',
  'Creative Direction',
  'Vertical Content',
  'Cinematic Films',
  'Social Campaigns',
  'Art Direction',
  'Brand Identity',
];

export default function TickerSection() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker">
      <div className="ticker__track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker__item">
            {item}
            <span className="ticker__dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
