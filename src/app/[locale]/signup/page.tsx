"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert(locale === 'es' ? 'Las contraseñas no coinciden' : 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      alert(locale === 'es' ? 'La contraseña debe tener al menos 6 caracteres' : 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name,
          email,
          password
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        console.log('Signup successful:', data);
        
        // Redirect to login page
        router.push(`/${locale}/login`);
      } else {
        const data = await res.json();
        throw new Error(data.error || (locale === 'es' ? 'Error en el registro' : 'Signup error'));
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-background/95 backdrop-blur">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {locale === 'es' ? 'Crear Cuenta' : 'Create Account'}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {locale === 'es' 
              ? 'Únete a Outliers Academy y comienza tu aprendizaje' 
              : 'Join Outliers Academy and start your learning journey'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                {locale === 'es' ? 'Nombre completo' : 'Full name'}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-11"
                  placeholder={locale === 'es' ? 'Tu nombre completo' : 'Your full name'}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                {locale === 'es' ? 'Correo electrónico' : 'Email'}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  placeholder={locale === 'es' ? 'tu@email.com' : 'you@email.com'}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                {locale === 'es' ? 'Contraseña' : 'Password'}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  placeholder={locale === 'es' ? 'Mínimo 6 caracteres' : 'Minimum 6 characters'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                {locale === 'es' ? 'Confirmar contraseña' : 'Confirm password'}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  placeholder={locale === 'es' ? 'Confirma tu contraseña' : 'Confirm your password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-11 font-medium"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : null}
              {locale === 'es' ? 'Crear Cuenta' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            {locale === 'es' ? '¿Ya tienes cuenta?' : 'Already have an account?'}{' '}
            <Link 
              href={`/${locale}/login`}
              className="font-medium text-primary hover:underline"
            >
              {locale === 'es' ? 'Iniciar sesión' : 'Sign in'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 