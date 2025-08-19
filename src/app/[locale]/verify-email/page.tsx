"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, RefreshCw, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [resendMessage, setResendMessage] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const email = searchParams.get('email') || '';
  // Countdown timer for resend button
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);
  const handleResendEmail = async () => {
    if (!canResend || isResending || !email) return;
    setIsResending(true);
    setResendStatus('idle');
    setCanResend(false);
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setResendStatus('success');
        setResendMessage(data.message || (locale === 'es' 
          ? 'Correo reenviado exitosamente' 
          : 'Email resent successfully'));
        setCountdown(60); // 60 second cooldown
      } else {
        throw new Error(data.error || (locale === 'es' 
          ? 'Error al reenviar correo' 
          : 'Error resending email'));
      }
    } catch (error) {
      //TODO SHOW TOAST ERROR
      setResendStatus('error');
      setResendMessage((error as Error).message);
      setCountdown(10); // Short cooldown on error
    } finally {
      setIsResending(false);
    }
  };
  const openEmailClient = () => {
    const emailDomain = email.split('@')[1];
    let emailUrl = 'mailto:';
    // Popular email providers
    if (emailDomain?.includes('gmail')) {
      emailUrl = 'https://mail.google.com';
    } else if (emailDomain?.includes('outlook') || emailDomain?.includes('hotmail')) {
      emailUrl = 'https://outlook.live.com';
    } else if (emailDomain?.includes('yahoo')) {
      emailUrl = 'https://mail.yahoo.com';
    }
    window.open(emailUrl, '_blank');
  };
  // Redirect to signup if no email provided
  if (!email) {
    router.push(`/${locale}/signup`);
    return null;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-background/95 backdrop-blur">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {locale === 'es' ? 'Revisa tu correo' : 'Check your email'}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {locale === 'es' 
              ? `Te enviamos un enlace de verificación a:` 
              : 'We sent a verification link to:'}
          </CardDescription>
          <div className="text-sm font-medium text-primary bg-primary/10 rounded-lg px-3 py-2 mt-2">
            {email}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Instructions */}
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              {locale === 'es' 
                ? 'Abre el enlace en tu correo para activar tu cuenta y poder iniciar sesión.'
                : 'Open the link in your email to activate your account and sign in.'}
            </p>
          </div>
          {/* Resend Status Messages */}
          {resendStatus === 'success' && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <p className="text-sm text-green-700 dark:text-green-300">
                  {resendMessage}
                </p>
              </div>
            </div>
          )}
          {resendStatus === 'error' && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  {resendMessage}
                </p>
              </div>
            </div>
          )}
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleResendEmail}
              disabled={!canResend || isResending}
              variant="outline"
              className="w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  {locale === 'es' ? 'Reenviando...' : 'Resending...'}
                </>
              ) : countdown > 0 ? (
                `${locale === 'es' ? 'Reenviar en' : 'Resend in'} ${countdown}s`
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {locale === 'es' ? 'Reenviar correo' : 'Resend email'}
                </>
              )}
            </Button>
            <Button
              onClick={openEmailClient}
              variant="default"
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {locale === 'es' ? 'Abrir cliente de correo' : 'Open email client'}
            </Button>
          </div>
          {/* Tips */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-medium">
              {locale === 'es' ? '¿No encuentras el correo?' : "Can't find the email?"}
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• {locale === 'es' ? 'Revisa tu carpeta de SPAM o correo no deseado' : 'Check your SPAM or junk folder'}</li>
              <li>• {locale === 'es' ? 'Asegúrate de que el email sea correcto' : 'Make sure the email address is correct'}</li>
              <li>• {locale === 'es' ? 'El correo puede tardar unos minutos en llegar' : 'The email may take a few minutes to arrive'}</li>
            </ul>
          </div>
          {/* Back to signup */}
          <div className="text-center text-sm text-muted-foreground">
            {locale === 'es' ? '¿Email incorrecto?' : 'Wrong email?'}{' '}
            <Link 
              href={`/${locale}/signup`}
              className="font-medium text-primary hover:underline"
            >
              {locale === 'es' ? 'Crear nueva cuenta' : 'Create new account'}
            </Link>
          </div>
          {/* Already verified? */}
          <div className="text-center text-sm text-muted-foreground">
            {locale === 'es' ? '¿Ya verificaste tu cuenta?' : 'Already verified your account?'}{' '}
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
