'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Invalid credentials. Try again.');
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="adm-login">
      <div className="adm-login__card">
        <div className="adm-login__brand">
          <span className="adm-login__logo">TSC</span>
          <p className="adm-login__sub">Admin Panel</p>
        </div>
        <form onSubmit={handleLogin} className="adm-login__form">
          <div className="adm-field">
            <label className="adm-label">Email</label>
            <input type="email" className="adm-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@thestorycircuit.com" required />
          </div>
          <div className="adm-field">
            <label className="adm-label">Password</label>
            <input type="password" className="adm-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          {error && <p className="adm-login__error">{error}</p>}
          <button type="submit" className="adm-btn adm-btn--primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
