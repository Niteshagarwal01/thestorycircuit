'use client';
import { useEffect, useRef, useState } from 'react';
import { STATS } from '@/lib/data';

function Counter({ target }) {
  const [count, setCount] = useState('0');
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true;
        const num = parseInt(target.replace(/\D/g, ''), 10);
        const suffix = target.replace(/[\d]/g, '');
        if (isNaN(num)) { setCount(target); return; }
        let start = 0;
        const duration = 1600;
        const step = 16;
        const increment = num / (duration / step);
        const timer = setInterval(() => {
          start += increment;
          if (start >= num) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start) + suffix);
          }
        }, step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="stats__number">{count}</span>;
}

export default function StatsSection() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats__grid">
          {STATS.map((s) => (
            <div key={s.label} className="stats__card">
              <Counter target={s.number} />
              <span className="stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
