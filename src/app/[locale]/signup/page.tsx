'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'
export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showVerificationMessage, setShowVerificationMessage] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'es'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError(locale === 'es' ? 'Las contraseñas no coinciden' : 'Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError(locale === 'es' ? 'La contraseña debe tener al menos 6 caracteres' : 'Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        if (data.requiresVerification) {
          router.push(`/${locale}/verify-email?email=${encodeURIComponent(email)}`)
        } else {
          router.push(`/${locale}/login`)
        }
      } else {
        const data = await response.json()
        setError(data.error || (locale === 'es' ? 'Error en el registro' : 'Signup error'))
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : (locale === 'es' ? 'Error en el registro' : 'Signup error'))
    } finally {
      setIsLoading(false)
    }
  }

  const texts = {
    es: {
      title: 'Crear Cuenta',
      description: 'Únete a Outliers Academy y comienza tu aprendizaje',
      fullName: 'Nombre completo',
      fullNamePlaceholder: 'Tu nombre completo',
      email: 'Correo electrónico',
      emailPlaceholder: 'tu@email.com',
      password: 'Contraseña',
      passwordPlaceholder: 'Mínimo 6 caracteres',
      confirmPassword: 'Confirmar contraseña',
      confirmPasswordPlaceholder: 'Confirma tu contraseña',
      signUp: 'Crear Cuenta',
      signingUp: 'Creando cuenta...',
      alreadyHaveAccount: '¿Ya tienes cuenta?',
      signIn: 'Iniciar sesión',
      students: 'Estudiantes',
      courses: 'Cursos',
      satisfaction: 'Satisfacción'
    },
    en: {
      title: 'Create Account',
      description: 'Join Outliers Academy and start your learning journey',
      fullName: 'Full name',
      fullNamePlaceholder: 'Your full name',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      password: 'Password',
      passwordPlaceholder: 'Minimum 6 characters',
      confirmPassword: 'Confirm password',
      confirmPasswordPlaceholder: 'Confirm your password',
      signUp: 'Create Account',
      signingUp: 'Creating account...',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign in',
      students: 'Students',
      courses: 'Courses',
      satisfaction: 'Satisfaction'
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
          <h1 className="text-4xl font-heading font-bold mb-4">Outliers Academy</h1>
          <p className="text-xl opacity-90 mb-8 font-sans">
            {locale === 'es' 
              ? 'Únete a la comunidad de emprendedores que están transformando el futuro'
              : 'Join the community of entrepreneurs transforming the future'
            }
          </p>
          <div className="space-y-4 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">✓</span>
              </div>
              <span className="text-white/90 font-sans">
                {locale === 'es' ? 'Acceso a todos los cursos' : 'Access to all courses'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">✓</span>
              </div>
              <span className="text-white/90 font-sans">
                {locale === 'es' ? 'Progreso personalizado' : 'Personalized progress'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">✓</span>
              </div>
              <span className="text-white/90 font-sans">
                {locale === 'es' ? 'Certificados oficiales' : 'Official certificates'}
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
          {/* Verification Success Message */}
          {showVerificationMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200 font-heading">
                    {locale === 'es' ? '¡Cuenta creada exitosamente!' : 'Account created successfully!'}
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1 font-sans">
                    {locale === 'es' 
                      ? 'Revisa tu correo electrónico y haz clic en el enlace de verificación para activar tu cuenta.'
                      : 'Check your email and click the verification link to activate your account.'}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowVerificationMessage(false)}
                variant="outline"
                size="sm"
                className="mt-4 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 font-sans"
              >
                {locale === 'es' ? 'Crear otra cuenta' : 'Create another account'}
              </Button>
            </motion.div>
          )}

          {!showVerificationMessage && (
            <>
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

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground font-sans">
                    {t.fullName}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      id="name"
                      type="text"
                      placeholder={t.fullNamePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12 border-2 border-input focus:border-ring focus:ring-2 focus:ring-ring/20 rounded-lg transition-all duration-200 bg-background text-foreground font-sans hover:border-ring/60"
                      required
                    />
                  </div>
                </div>

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
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground font-sans">
                    {t.confirmPassword}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t.confirmPasswordPlaceholder}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-2 border-input focus:border-ring focus:ring-2 focus:ring-ring/20 rounded-lg transition-all duration-200 bg-background text-foreground font-sans hover:border-ring/60"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
                      <AlertDescription className="text-destructive font-sans">{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>{t.signingUp}</span>
                      </div>
                    ) : (
                      t.signUp
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
                  {t.alreadyHaveAccount}{' '}
                  <Link 
                    href={`/${locale}/login`}
                    className="font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    {t.signIn}
                  </Link>
                </p>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
