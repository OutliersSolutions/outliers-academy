"use client";

import {useState} from 'react';
import {useRouter, usePathname} from 'next/navigation';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password})
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup error');
      router.push(`/${locale}`);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-16 max-w-md">
      <h1 className="h2-section">Crear cuenta</h1>
      <form className="mt-6 card p-6" onSubmit={onSubmit}>
        <label className="block text-sm font-semibold">Nombre</label>
        <input className="mt-1 w-full rounded border border-muted p-2" value={name} onChange={(e) => setName(e.target.value)} required />
        <label className="block text-sm font-semibold mt-4">Email</label>
        <input className="mt-1 w-full rounded border border-muted p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className="block text-sm font-semibold mt-4">Contraseña</label>
        <input className="mt-1 w-full rounded border border-muted p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn-primary mt-6 w-full" disabled={loading}>{loading ? 'Creando…' : 'Crear cuenta'}</button>
      </form>
    </div>
  );
} 