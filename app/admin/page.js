import { createClient } from '@/lib/supabase/server';
import AdminShell from './AdminShell';

import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: testimonialCount },
    { count: portfolioCount },
    { count: enquiryCount },
  ] = await Promise.all([
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('portfolio').select('*', { count: 'exact', head: true }),
    supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
  ]);

  const stats = [
    { label: 'Testimonials', value: testimonialCount ?? 0, href: '/admin/testimonials', color: '#6366f1' },
    { label: 'Portfolio Items', value: portfolioCount ?? 0, href: '/admin/portfolio', color: '#f59e0b' },
    { label: 'New Enquiries', value: enquiryCount ?? 0, href: '#', color: '#10b981' },
  ];

  return (
    <AdminShell>
      <div className="adm-page">
        <div className="adm-page__header">
          <h1 className="adm-page__title">Dashboard</h1>
          <p className="adm-page__sub">Welcome back. Here's what's happening.</p>
        </div>

        <div className="adm-dash-stats">
          {stats.map(s => (
            <Link href={s.href} key={s.label} className="adm-stat-card">
              <span className="adm-stat-card__value" style={{ color: s.color }}>{s.value}</span>
              <span className="adm-stat-card__label">{s.label}</span>
            </Link>
          ))}
        </div>

        <div className="adm-quick-links">
          <h2 className="adm-section-title">Quick Actions</h2>
          <div className="adm-quick-links__grid">
            <Link href="/admin/testimonials" className="adm-quick-link">
              <span>❝</span>Add Testimonial
            </Link>
            <Link href="/admin/portfolio" className="adm-quick-link">
              <span>▤</span>Add Project
            </Link>
            <Link href="/admin/about" className="adm-quick-link">
              <span>◉</span>Edit About Page
            </Link>
            <Link href="/" target="_blank" className="adm-quick-link adm-quick-link--ghost">
              <span>↗</span>View Live Site
            </Link>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
