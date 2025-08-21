"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerifyAccountPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const t = useTranslations('notifications.auth.verification');
  
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage(t('invalidToken'));
      return;
    }

    // Decode token (simple base64 decode for now)
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const [userId, email, timestamp] = decoded.split(':');
      
      // Check if token is expired (24 hours)
      const tokenTime = parseInt(timestamp);
      const now = Date.now();
      const hoursDiff = (now - tokenTime) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        setStatus('expired');
        setMessage(t('linkExpiredMessage'));
        return;
      }

      // In a real implementation, you would call an API to verify and activate the user
      // For now, we'll simulate success
      setTimeout(() => {
        setStatus('success');
        setMessage(t('successMessage'));
      }, 2000);

    } catch (error) {
      setStatus('error');
      setMessage(t('invalidToken'));
    }
  }, [token, t]);

  const handleContinue = () => {
    router.push(`/${locale}/login`);
  };

  const handleResendVerification = () => {
    router.push(`/${locale}/signup`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-background/95 backdrop-blur">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
            {status === 'loading' && (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            )}
            {status === 'success' && (
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            )}
            {(status === 'error' || status === 'expired') && (
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            )}
          </div>
          
          <CardTitle className="text-2xl font-bold tracking-tight">
            {status === 'loading' && t('loading')}
            {status === 'success' && t('success')}
            {status === 'error' && t('error')}
            {status === 'expired' && t('expired')}
          </CardTitle>
          
          <CardDescription className="text-muted-foreground">
            {message}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {status === 'success' && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  {t('accountActive')}
                </p>
              </div>
              
              <Button onClick={handleContinue} className="w-full">
                {t('backToLogin')}
              </Button>
            </div>
          )}

          {(status === 'error' || status === 'expired') && (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">
                  {status === 'expired' ? (
                    locale === 'es' 
                      ? 'El enlace de verificación ha expirado por seguridad. Puedes solicitar uno nuevo.'
                      : 'The verification link has expired for security. You can request a new one.'
                  ) : (
                    locale === 'es'
                      ? 'Hubo un problema con el enlace de verificación. Verifica que hayas copiado la URL completa.'
                      : 'There was a problem with the verification link. Make sure you copied the complete URL.'
                  )}
                </p>
              </div>
              
              <Button onClick={handleResendVerification} variant="outline" className="w-full">
                {locale === 'es' ? 'Solicitar nueva verificación' : 'Request new verification'}
              </Button>
            </div>
          )}

          {status === 'loading' && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                {locale === 'es' 
                  ? 'Por favor espera mientras verificamos tu cuenta...'
                  : 'Please wait while we verify your account...'}
              </p>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground">
            <Link 
              href={`/${locale}`}
              className="font-medium text-primary hover:underline"
            >
              {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}