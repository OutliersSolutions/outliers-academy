'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useNewAuth } from '@/components/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'es'
  const { login, loading } = useNewAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (loading) return
    
    setError('')
    
    try {
      await login({ email, password })
      router.push(`/${locale}/dashboard`)
    } catch (error) {
      console.error('Email signin error:', error)
      setError((error as Error).message)
    }
  }

  const texts = {
    es: {
      title: 'Iniciar Sesión',
      description: 'Accede a tu cuenta de Outliers Academy',
      email: 'Correo electrónico',
      emailPlaceholder: 'tu@email.com',
      password: 'Contraseña',
      passwordPlaceholder: 'Tu contraseña',
      signIn: 'Iniciar Sesión',
      signingIn: 'Iniciando sesión...',
      dontHaveAccount: '¿No tienes cuenta?',
      signUp: 'Crear cuenta',
      students: 'Estudiantes',
      courses: 'Cursos',
      satisfaction: 'Satisfacción',
      backToHome: 'Volver al inicio',
      welcomeBack: 'Bienvenido de vuelta',
      continueJourney: 'Continúa tu viaje de aprendizaje con nosotros',
      accessAllCourses: 'Acceso a todos los cursos',
      personalizedProgress: 'Progreso personalizado',
      officialCertificates: 'Certificados oficiales'
    },
    en: {
      title: 'Sign In',
      description: 'Access your Outliers Academy account',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      password: 'Password',
      passwordPlaceholder: 'Your password',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      dontHaveAccount: "Don't have an account?",
      signUp: 'Sign up',
      students: 'Students',
      courses: 'Courses',
      satisfaction: 'Satisfaction',
      backToHome: 'Back to home',
      welcomeBack: 'Welcome back',
      continueJourney: 'Continue your learning journey with us',
      accessAllCourses: 'Access to all courses',
      personalizedProgress: 'Personalized progress',
      officialCertificates: 'Official certificates'
    }
  }

  const t = texts[locale as keyof typeof texts] || texts.es

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5 flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-accent p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-primary-foreground"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-3xl font-heading font-bold">O</span>
            </div>
          </motion.div>
          <h1 className="text-4xl font-heading font-bold mb-4 text-white">Outliers Academy</h1>
          <p className="text-xl opacity-90 mb-8 font-sans text-white">
            {t.continueJourney}
          </p>
          <div className="space-y-4 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">✓</span>
              </div>
              <span className="text-white/90 font-sans">
                {t.accessAllCourses}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">✓</span>
              </div>
              <span className="text-white/90 font-sans">
                {t.personalizedProgress}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">✓</span>
              </div>
              <span className="text-white/90 font-sans">
                {t.officialCertificates}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Back Button */}
          <div className="mb-6 lg:mb-8">
            <Link 
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToHome}
            </Link>
          </div>

          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-heading font-bold text-foreground mb-2"
            >
              {t.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground font-sans"
            >
              {t.description}
            </motion.p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
                <AlertDescription className="text-destructive font-sans">{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground font-sans">
                {t.email}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-2 border-input focus:border-ring focus:ring-2 focus:ring-ring/20 rounded-lg transition-all duration-200 bg-background text-foreground font-sans hover:border-ring/60"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground font-sans">
                {t.password}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 border-2 border-input focus:border-ring focus:ring-2 focus:ring-ring/20 rounded-lg transition-all duration-200 bg-background text-foreground font-sans hover:border-ring/60"
                  required
                />
                <button
                  type="button"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setShowPassword(!showPassword)
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{t.signingIn}</span>
                  </div>
                ) : (
                  t.signIn
                )}
              </Button>
            </motion.div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground font-sans">
              {t.dontHaveAccount}{' '}
              <Link 
                href={`/${locale}/signup`}
                className="font-medium text-primary hover:text-primary/80 transition-colors duration-200"
              >
                {t.signUp}
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 