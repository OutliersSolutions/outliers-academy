import {XCircle, ArrowLeft, MessageCircle, RefreshCw} from 'lucide-react';
import Link from 'next/link';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-950/20 dark:to-orange-900/20">
      <div className="container py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Cancel Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Header */}
          <Badge variant="outline" className="mb-4 border-red-200 text-red-700">
            ❌ Pago Cancelado
          </Badge>
          
          <h1 className="h1-hero mb-4">
            Pago 
            <span className="text-red-600"> Cancelado</span>
          </h1>
          
          <p className="p-lead mb-8">
            No se preocupe, no se ha realizado ningún cargo. Su proceso de pago fue cancelado 
            y puede intentarlo nuevamente cuando esté listo.
          </p>

          {/* Options */}
          <div className="grid gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  Intentar Nuevamente
                </CardTitle>
                <CardDescription>
                  Volver a la página de planes y completar su compra
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/pricing" className="btn-primary inline-flex items-center gap-2">
                  Ver Planes
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  ¿Necesita Ayuda?
                </CardTitle>
                <CardDescription>
                  Nuestro equipo puede ayudarle con cualquier duda sobre los planes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
                  Contactar Soporte
                  <MessageCircle className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border">
            <h3 className="font-heading font-semibold mb-4">
              ¿Por qué elegir Outliers Academy?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-medium">Resultados Comprobados</div>
                <div className="text-muted-foreground">+1000 profesionales transformados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="font-medium">Garantía 30 días</div>
                <div className="text-muted-foreground">Reembolso completo si no estás satisfecho</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-medium">Mentoría Personalizada</div>
                <div className="text-muted-foreground">Acompañamiento experto en tu journey</div>
              </div>
            </div>
          </div>

          {/* Back Options */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link href="/" className="btn-outline">
              Volver al Inicio
            </Link>
            <Link href="/about" className="btn-outline">
              Conocer Más
            </Link>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-muted-foreground mt-8">
            Si experimenta problemas técnicos durante el pago, por favor contacte 
            nuestro soporte para asistencia personalizada.
          </p>
        </div>
      </div>
    </div>
  );
}
