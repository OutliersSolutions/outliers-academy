"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Github, Chrome, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  const handleOAuthSignUp = async (provider: 'google' | 'github') => {
    setOauthLoading(provider);
    try {
      const result = await signIn(provider, {
        callbackUrl: `/${locale}/dashboard`,
        redirect: false,
      });
      
      if (result?.ok) {
        router.push(`/${locale}/dashboard`);
      } else if (result?.error) {
        console.error('OAuth error:', result.error);
      }
    } catch (error) {
      console.error('OAuth signup error:', error);
    } finally {
      setOauthLoading(null);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password})
      });
      
      if (res.ok) {
        router.push(`/${locale}/dashboard`);
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Error al crear cuenta');
      }
    } catch (error) {
      console.error('Email signup error:', error);
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
              ? 'Únete a Outliers Academy y comienza tu viaje' 
              : 'Join Outliers Academy and start your journey'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* OAuth Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => handleOAuthSignUp('google')}
              disabled={oauthLoading !== null}
              variant="outline"
              className="w-full h-11 font-medium"
            >
              {oauthLoading === 'google' ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Chrome className="h-4 w-4 mr-2" />
              )}
              {locale === 'es' ? 'Registrarse con Google' : 'Sign up with Google'}
            </Button>
            
            <Button
              onClick={() => handleOAuthSignUp('github')}
              disabled={oauthLoading !== null}
              variant="outline"
              className="w-full h-11 font-medium"
            >
              {oauthLoading === 'github' ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Github className="h-4 w-4 mr-2" />
              )}
              {locale === 'es' ? 'Registrarse con GitHub' : 'Sign up with GitHub'}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {locale === 'es' ? 'O regístrate con' : 'Or sign up with'}
              </span>
            </div>
          </div>

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
                  placeholder={locale === 'es' ? 'Tu nombre' : 'Your name'}
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
                  placeholder={locale === 'es' ? 'Mínimo 8 caracteres' : 'Minimum 8 characters'}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading || oauthLoading !== null}
              className="w-full h-11 font-medium"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
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
              {locale === 'es' ? 'Inicia sesión' : 'Sign in'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 