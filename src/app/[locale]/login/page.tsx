"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useNewAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { LoaderInline } from '@/components/ui/loader';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const { login, loading } = useNewAuth();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return; // Prevent double submission
    
    setError(''); // Clear previous errors
    
    try {
      await login({ email, password });
      
      //TODO SHOW TOAST
      
      // Use Next.js router for proper locale handling
      router.push(`/${locale}/dashboard`);
      
    } catch (error) {
      console.error('Email signin error:', error);
      //TODO SHOW TOAST ERROR
      setError((error as Error).message);
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
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignIn} action="#" className="space-y-4">
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
              disabled={loading}
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