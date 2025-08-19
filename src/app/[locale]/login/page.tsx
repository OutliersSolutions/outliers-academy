"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useNewAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { LoaderInline } from '@/components/ui/loader';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 dark:from-primary/20 dark:via-primary/10 dark:to-accent/20 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/vectors/light-top-gradiant.webp')] dark:bg-[url('/images/vectors/dark-shadow-top.webp')] bg-cover bg-center opacity-20"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-center relative z-10"
        >
          <div className="mb-8">
            <img
              src="/icons/logo.png"
              alt="Outliers Academy"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {locale === 'es' ? 'Bienvenido de vuelta' : 'Welcome back'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {locale === 'es' 
                ? 'Continúa tu viaje de aprendizaje con nosotros' 
                : 'Continue your learning journey with us'}
            </p>
          </div>
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">✓</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                {locale === 'es' ? 'Acceso a todos los cursos' : 'Access to all courses'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">✓</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                {locale === 'es' ? 'Progreso personalizado' : 'Personalized progress'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">✓</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                {locale === 'es' ? 'Certificados oficiales' : 'Official certificates'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Back Button */}
          <div className="mb-6 lg:mb-8">
            <Link 
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
            </Link>
          </div>

          <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center pb-8">
              <CardTitle className="text-2xl lg:text-3xl font-heading font-bold tracking-tight">
                {locale === 'es' ? 'Iniciar Sesión' : 'Sign In'}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                {locale === 'es' 
                  ? 'Accede a tu cuenta de Outliers Academy' 
                  : 'Access your Outliers Academy account'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </motion.div>
              )}

              {/* Email/Password Form */}
              <form onSubmit={handleEmailSignIn} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    {locale === 'es' ? 'Email' : 'Email'}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-background/50 border-2 border-border/50 focus:border-primary rounded-xl transition-all duration-200"
                      placeholder={locale === 'es' ? 'you@email.com' : 'you@email.com'}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    {locale === 'es' ? 'Contraseña' : 'Password'}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 bg-background/50 border-2 border-border/50 focus:border-primary rounded-xl transition-all duration-200"
                      placeholder={locale === 'es' ? 'Tu contraseña' : 'Your password'}
                      required
                    />
                    <button
                      type="button"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200 shadow-lg hover:shadow-xl"
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
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  {locale === 'es' ? 'Regístrate' : 'Sign up'}
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 