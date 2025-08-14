import {CheckCircle, ArrowRight, Download, Users} from 'lucide-react';
import Link from 'next/link';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {PaymentStatus} from '@/components/PaymentStatus';
import {Suspense} from 'react';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-900/20">
      <div className="container py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Header */}
          <Badge variant="outline" className="mb-4 border-green-200 text-green-700">
            ✅ Pago Exitoso
          </Badge>
          
          <h1 className="h1-hero mb-4">
            ¡Bienvenido a 
            <span className="text-green-600"> Outliers Academy</span>!
          </h1>
          
          <p className="p-lead mb-8">
            Tu pago se ha procesado correctamente. Ya tienes acceso completo a tu plan 
            y puedes comenzar tu journey de transformación profesional.
          </p>

          {/* Payment Status */}
          <div className="mb-8">
            <Suspense fallback={<div className="text-center">Cargando estado del pago...</div>}>
              <PaymentStatus />
            </Suspense>
          </div>

          {/* Next Steps */}
          <div className="grid gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-primary" />
                  Accede a tu Dashboard
                </CardTitle>
                <CardDescription>
                  Explora tus cursos, proyectos y conecta con la comunidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2">
                  Ir al Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Download className="w-5 h-5 text-primary" />
                  Recursos Adicionales
                </CardTitle>
                <CardDescription>
                  Accede a templates, herramientas y materiales exclusivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/my-courses" className="btn-outline inline-flex items-center gap-2">
                  Ver Mis Cursos
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border">
            <h3 className="font-heading font-semibold mb-2">
              ¿Necesitas ayuda?
            </h3>
            <p className="text-muted-foreground mb-4">
              Nuestro equipo está aquí para ayudarte en cada paso de tu journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-outline">
                Contactar Soporte
              </Link>
              <a 
                href="https://discord.gg/outliers-academy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Unirse a Discord
              </a>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-muted-foreground mt-8">
            Recibirás un email de confirmación con todos los detalles de tu compra 
            y las instrucciones para comenzar.
          </p>
        </div>
      </div>
    </div>
  );
}
