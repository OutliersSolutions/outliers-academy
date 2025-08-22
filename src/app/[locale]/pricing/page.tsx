import {CheckoutButton} from '@/components/CheckoutButton';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Check, X, MessageCircle, Mail, Calendar} from 'lucide-react';
import {useTranslations} from 'next-intl';

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
  const t = useTranslations('pricing');
  const successUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard?payment=success`;
  const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/pricing?payment=cancelled`;
  
  // Contact information from environment variables (can be fetched from Odoo via API if needed)
  const contactInfo = {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@outliersacademy.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+51999999999',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51999999999',
    calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/outliersacademy'
  };

  const plans: Plan[] = [
    {
      id: 'starter',
      name: t('plans.starter.name'),
      description: t('plans.starter.description'),
      price: '$9',
      period: t('monthlyPeriod'),
      priceId: process.env.STRIPE_PRICE_ID_STARTER || '',
      features: t.raw('plans.starter.features'),
      limitations: t.raw('plans.starter.limitations')
    },
    {
      id: 'pro',
      name: t('plans.pro.name'),
      description: t('plans.pro.description'),
      price: '$29',
      originalPrice: '$49',
      period: t('monthlyPeriod'),
      priceId: process.env.STRIPE_PRICE_ID_PRO || '',
      popular: true,
      features: t.raw('plans.pro.features'),
      limitations: t.raw('plans.pro.limitations')
    },
    {
      id: 'enterprise',
      name: t('plans.enterprise.name'),
      description: t('plans.enterprise.description'),
      price: t('customPrice'),
      period: '',
      priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE || '',
      features: t.raw('plans.enterprise.features')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {t('launchOffer')}
          </Badge>
          <h1 className="h1-hero mb-4">
            {t('title')}
          </h1>
          <p className="p-lead max-w-2xl mx-auto">
            {t('description')}
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
                    {t('mostPopular')}
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
                      {t('youSave', {amount: parseInt(plan.originalPrice.slice(1)) - parseInt(plan.price.slice(1))})}
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
                    {t('contactSales')}
                  </a>
                ) : plan.priceId ? (
                  <CheckoutButton 
                    priceId={plan.priceId} 
                    successUrl={successUrl} 
                    cancelUrl={cancelUrl}
                    className={`w-full ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                    odooCheckout={false}
                  >
                    {plan.popular ? t('startNow') : t('selectPlan')}
                  </CheckoutButton>
                ) : (
                  <div className="w-full">
                    <button className="w-full btn-outline opacity-50 cursor-not-allowed" disabled>
                      {t('comingSoon')}
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


        {/* CTA Final Mejorado */}
        <div className="mt-20">
          <Card className="p-8 md:p-12 text-center">
            <h2 className="h2-section mb-4">
              {t('cta.title')}
            </h2>
            <p className="p-lead mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            
            {/* Opciones de Contacto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              <a 
                href="/contact" 
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('cta.contact.form.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('cta.contact.form.description')}</p>
              </a>
              
              <a 
                href={`mailto:${contactInfo.email}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('cta.contact.email.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('cta.contact.email.description')}</p>
              </a>
              
              <a 
                href={contactInfo.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('cta.contact.calendar.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('cta.contact.calendar.description')}</p>
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                {t('cta.button')}
              </a>
              <a 
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                {t('cta.contact.whatsapp')}
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 