"use client";

import {useState} from 'react';
import {useRouter, usePathname} from 'next/navigation';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({login, password})
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login error');
      
      // Force full page reload to ensure cookies are set
      window.location.href = `/${locale}`;
    } catch (e) {
      alert((e as Error).message);
      setLoading(false);
    }
  }

  return (
    <div className="container py-16 max-w-md">
      <h1 className="h2-section">Iniciar sesión</h1>
      <form className="mt-6 card p-6" onSubmit={onSubmit}>
        <label className="block text-sm font-semibold">Email</label>
        <input className="mt-1 w-full rounded border border-muted p-2" type="email" value={login} onChange={(e) => setLogin(e.target.value)} required />
        <label className="block text-sm font-semibold mt-4">Contraseña</label>
        <input className="mt-1 w-full rounded border border-muted p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn-primary mt-6 w-full" disabled={loading}>{loading ? 'Ingresando…' : 'Ingresar'}</button>
      </form>
    </div>
  );
} 