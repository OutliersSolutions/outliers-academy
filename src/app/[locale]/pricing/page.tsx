import {CheckoutButton} from '@/components/CheckoutButton';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Check, X} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  period: string;
  priceId: string;
  popular?: boolean;
  features: string[];
  limitations?: string[];
}

export default function PricingPage() {
  const successUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard?payment=success`;
  const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/pricing?payment=cancelled`;

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfecto para comenzar tu journey en AI y Automation',
      price: '$9',
      period: '/mes',
      priceId: process.env.STRIPE_PRICE_ID_STARTER || '',
      features: [
        'Acceso a cursos introductorios',
        'Comunidad exclusiva en Discord',
        'Recursos descargables básicos',
        'Actualizaciones mensuales',
        'Soporte por email'
      ],
      limitations: [
        'Sin acceso a cursos avanzados',
        'Sin mentoría 1:1',
        'Sin proyectos prácticos'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Para profesionales que buscan transformar su carrera',
      price: '$29',
      originalPrice: '$49',
      period: '/mes',
      priceId: process.env.STRIPE_PRICE_ID_PRO || '',
      popular: true,
      features: [
        'Todo lo de Starter',
        'Acceso a todos los cursos avanzados',
        'Proyectos prácticos con feedback',
        'Mentoría grupal semanal',
        'Templates y herramientas premium',
        'Acceso a webinars en vivo',
        'Certificaciones oficiales',
        'Soporte prioritario'
      ],
      limitations: [
        'Sin mentoría 1:1 ilimitada'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Solución completa para equipos y empresas',
      price: 'Personalizado',
      period: '',
      priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE || '',
      features: [
        'Todo lo de Pro',
        'Mentoría 1:1 ilimitada',
        'Consultoría estratégica',
        'Implementación personalizada',
        'Entrenamientos corporativos',
        'Soporte dedicado 24/7',
        'Desarrollo de soluciones custom',
        'SLA garantizado'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            🚀 Oferta de lanzamiento - 40% OFF
          </Badge>
          <h1 className="h1-hero mb-4">
            Planes diseñados para tu 
            <span className="text-primary"> crecimiento</span>
          </h1>
          <p className="p-lead max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tu objetivo. Cancela cuando quieras, 
            actualiza o degrada tu plan en cualquier momento.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white">
                    Más Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-heading font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {plan.description}
                </CardDescription>
                
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2">
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl font-heading font-bold">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  {plan.originalPrice && (
                    <p className="text-sm text-green-600 mt-1">
                      Ahorras ${parseInt(plan.originalPrice.slice(1)) - parseInt(plan.price.slice(1))} al mes
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations && plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                {plan.id === 'enterprise' ? (
                  <a 
                    href="/contact" 
                    className="w-full btn-outline text-center py-2"
                  >
                    Contactar Ventas
                  </a>
                ) : plan.priceId ? (
                  <CheckoutButton 
                    priceId={plan.priceId} 
                    successUrl={successUrl} 
                    cancelUrl={cancelUrl}
                    className={`w-full ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                    odooCheckout={false}
                  >
                    {plan.popular ? 'Comenzar Ahora' : 'Seleccionar Plan'}
                  </CheckoutButton>
                ) : (
                  <div className="w-full">
                    <button className="w-full btn-outline opacity-50 cursor-not-allowed" disabled>
                      Próximamente
                    </button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Configura STRIPE_PRICE_ID_{plan.id.toUpperCase()} en .env
                    </p>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="h2-section text-center mb-8">
            Preguntas Frecuentes
          </h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-heading font-semibold mb-2">
                ¿Puedo cambiar de plan en cualquier momento?
              </h3>
              <p className="text-muted-foreground">
                Sí, puedes actualizar o degradar tu plan cuando quieras. Los cambios se aplicarán 
                en tu próximo ciclo de facturación.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-heading font-semibold mb-2">
                ¿Hay garantía de reembolso?
              </h3>
              <p className="text-muted-foreground">
                Ofrecemos una garantía de reembolso de 30 días. Si no estás satisfecho, 
                contacta con nosotros y te devolveremos el dinero.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-heading font-semibold mb-2">
                ¿Los precios incluyen actualizaciones?
              </h3>
              <p className="text-muted-foreground">
                Sí, todos los planes incluyen actualizaciones automáticas del contenido 
                y nuevas funcionalidades sin costo adicional.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-20 text-center">
          <h2 className="h2-section mb-4">
            ¿No estás seguro qué plan elegir?
          </h2>
          <p className="p-lead mb-6">
            Nuestro equipo te ayudará a encontrar la solución perfecta para tus necesidades.
          </p>
          <a href="/contact" className="btn-primary">
            Hablar con un Experto
          </a>
        </div>
      </div>
    </div>
  );
} 