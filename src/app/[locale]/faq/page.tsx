import { ParticlesBackground } from '@/components/ui/ParticlesBackground';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { HelpCircle, Search, BookOpen, CreditCard, Monitor, Headphones, Clock } from 'lucide-react';

export default async function FAQPage({
  params
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('faq');

  const faqCategories = [
    {
      id: 'general',
      title: t('categories.general.title'),
      description: t('categories.general.description'),
      icon: BookOpen,
      faqs: [
        {
          question: t('categories.general.faqs.enrollment.question'),
          answer: t('categories.general.faqs.enrollment.answer')
        },
        {
          question: t('categories.general.faqs.certificate.question'),
          answer: t('categories.general.faqs.certificate.answer')
        },
        {
          question: t('categories.general.faqs.devices.question'),
          answer: t('categories.general.faqs.devices.answer')
        }
      ]
    },
    {
      id: 'technical',
      title: t('categories.technical.title'),
      description: t('categories.technical.description'),
      icon: Monitor,
      faqs: [
        {
          question: t('categories.technical.faqs.support.question'),
          answer: t('categories.technical.faqs.support.answer')
        },
        {
          question: t('categories.technical.faqs.platform.question'),
          answer: t('categories.technical.faqs.platform.answer')
        },
        {
          question: t('categories.technical.faqs.browser.question'),
          answer: t('categories.technical.faqs.browser.answer')
        }
      ]
    },
    {
      id: 'billing',
      title: t('categories.billing.title'),
      description: t('categories.billing.description'),
      icon: CreditCard,
      faqs: [
        {
          question: t('categories.billing.faqs.expiration.question'),
          answer: t('categories.billing.faqs.expiration.answer')
        },
        {
          question: t('categories.billing.faqs.refund.question'),
          answer: t('categories.billing.faqs.refund.answer')
        },
        {
          question: t('categories.billing.faqs.payment.question'),
          answer: t('categories.billing.faqs.payment.answer')
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 relative">
      <ParticlesBackground particleColor="#6366f1" opacity={0.03} />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              {t('hero.badge')}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              {t('hero.description')}
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t('hero.searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="relative z-10 pb-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {faqCategories.map((category) => (
                <div key={category.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                  {/* Category Header */}
                  <div className="p-8 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {category.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Items */}
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {category.faqs.map((faq, index) => (
                      <details key={index} className="group">
                        <summary className="p-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg pr-4 leading-relaxed">
                              {faq.question}
                            </h3>
                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-open:rotate-180 transition-transform flex-shrink-0">
                              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </summary>
                        <div className="px-8 pb-8">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative z-10 py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-slate-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Headphones className="w-4 h-4" />
              {t('cta.badge')}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('cta.title')}
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t('cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`/${params.locale}/contact`}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                {t('cta.contactButton')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{t('cta.responseTime')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 