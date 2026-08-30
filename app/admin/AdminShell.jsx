'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '▦' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '❝' },
  { href: '/admin/portfolio', label: 'Portfolio', icon: '▤' },
  { href: '/admin/about', label: 'About Page', icon: '◉' },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="adm-shell">
      <aside className="adm-sidebar">
        <div className="adm-sidebar__brand">
          <span className="adm-sidebar__logo">TSC</span>
          <span className="adm-sidebar__label">Admin</span>
        </div>
        <nav className="adm-sidebar__nav">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={`adm-nav-item${pathname === n.href ? ' adm-nav-item--active' : ''}`}
            >
              <span className="adm-nav-item__icon">{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <button className="adm-sidebar__logout" onClick={handleLogout}>
          Sign Out
        </button>
      </aside>
      <main className="adm-main">
        {children}
      </main>
    </div>
  );
}
