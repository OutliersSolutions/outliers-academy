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
  const [error, setError] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      //TODO SHOW TOAST ERROR
      return;
    }
    if (password.length < 6) {
      //TODO SHOW TOAST ERROR
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
        //TODO SHOW TOAST ERROR
        // Check if email verification is required
        if (data.requiresVerification) {
          // Redirect to verify-email page with email parameter
          router.push(`/${locale}/verify-email?email=${encodeURIComponent(email)}`);
        } else {
          // Original flow - redirect to login or dashboard
          router.push(`/${locale}/login`);
        }
      } else {
        const data = await res.json();
        throw new Error(data.error || (locale === 'es' ? 'Error en el registro' : 'Signup error'));
      }
    } catch (error) {
      
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
          {/* Verification Success Message */}
          {showVerificationMessage && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200">
                    {locale === 'es' ? '¡Cuenta creada exitosamente!' : 'Account created successfully!'}
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    {locale === 'es' 
                      ? 'Revisa tu correo electrónico y haz clic en el enlace de verificación para activar tu cuenta.'
                      : 'Check your email and click the verification link to activate your account.'}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <Button
                  onClick={() => setShowVerificationMessage(false)}
                  variant="outline"
                  size="sm"
                  className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-700"
                >
                  {locale === 'es' ? 'Crear otra cuenta' : 'Create another account'}
                </Button>
              </div>
            </div>
          )}
          {/* Email/Password Form */}
          {!showVerificationMessage && (
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
          )}
          {!showVerificationMessage && (
            <div className="text-center text-sm text-muted-foreground">
              {locale === 'es' ? '¿Ya tienes cuenta?' : 'Already have an account?'}{' '}
              <Link 
                href={`/${locale}/login`}
                className="font-medium text-primary hover:underline"
              >
                {locale === 'es' ? 'Iniciar sesión' : 'Sign in'}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
