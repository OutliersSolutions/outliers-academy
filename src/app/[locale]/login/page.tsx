"use client";

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Github, Chrome, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { LoaderInline } from '@/components/ui/loader';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
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
      console.error('OAuth signin error:', error);
    } finally {
      setOauthLoading(null);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({login: email, password})
      });
      
      if (res.ok) {
        const data = await res.json();
        console.log('Login successful:', data);
        
        // Forzar recarga completa para asegurar que las cookies se establezcan
        window.location.href = `/${locale}/dashboard`;
      } else {
        const data = await res.json();
        throw new Error(data.error || (locale === 'es' ? 'Error de inicio de sesión' : 'Sign in error'));
      }
    } catch (error) {
      console.error('Email signin error:', error);
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
            {locale === 'es' ? 'Iniciar Sesión' : 'Sign In'}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {locale === 'es' 
              ? 'Accede a tu cuenta de Outliers Academy' 
              : 'Access your Outliers Academy account'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* OAuth Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => handleOAuthSignIn('google')}
              disabled={oauthLoading !== null}
              variant="outline"
              className="w-full h-11 font-medium"
            >
              {oauthLoading === 'google' ? (
                <LoaderInline size="sm" />
              ) : (
                <Chrome className="h-4 w-4 mr-2" />
              )}
              {locale === 'es' ? 'Continuar con Google' : 'Continue with Google'}
            </Button>
            
            <Button
              onClick={() => handleOAuthSignIn('github')}
              disabled={oauthLoading !== null}
              variant="outline"
              className="w-full h-11 font-medium"
            >
              {oauthLoading === 'github' ? (
                <LoaderInline size="sm" />
              ) : (
                <Github className="h-4 w-4 mr-2" />
              )}
              {locale === 'es' ? 'Continuar con GitHub' : 'Continue with GitHub'}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {locale === 'es' ? 'O continúa con' : 'Or continue with'}
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
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
                  placeholder={locale === 'es' ? 'Tu contraseña' : 'Your password'}
                  required
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
                <LoaderInline size="sm" />
              ) : null}
              {locale === 'es' ? 'Iniciar Sesión' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            {locale === 'es' ? '¿No tienes cuenta?' : "Don't have an account?"}{' '}
            <Link 
              href={`/${locale}/signup`}
              className="font-medium text-primary hover:underline"
            >
              {locale === 'es' ? 'Regístrate' : 'Sign up'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 