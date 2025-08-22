import { ParticlesBackground } from '@/components/ui/ParticlesBackground';
import { ChatbotViewerSafe } from '@/components/ChatbotViewerSafe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ArrowRight, MessageCircle, Mail, Clock, HelpCircle, Send, Phone, MapPin } from 'lucide-react';

export default async function ContactPage({
  params
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('contact');
  const robotT = await getTranslations('robot');

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 relative">
      {/* Fondo de partículas mejorado */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #6366f120 1px, transparent 1px),
            radial-gradient(circle at 75% 25%, #6366f115 1px, transparent 1px),
            radial-gradient(circle at 25% 75%, #6366f110 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #6366f125 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 80px 80px, 60px 60px, 70px 70px',
          backgroundPosition: '0 0, 30px 30px, 10px 10px, 40px 40px'
        }}></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 text-primary dark:text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-primary dark:bg-primary rounded-full animate-pulse"></div>
              <span className="font-mono">{t('contactInfo')}</span>
            </div>
            
            <h1 className="h1-hero mb-6">
              {t('title')}
            </h1>
            
            <p className="p-lead max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 pb-20">
        <div className="container">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* Contact Form - Left Column */}
            <div className="xl:col-span-2">
              <Card className="p-8 md:p-10">
                <CardHeader className="px-0 pt-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="h3-title mb-2">
                        {robotT('sendMessage')}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {t('contactMethods')}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {robotT('firstName')}
                        </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder={robotT('firstNamePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {robotT('lastName')}
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder={robotT('lastNamePlaceholder')}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {robotT('email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder={robotT('emailPlaceholder')}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {robotT('subject')}
                    </label>
                    <select
                      id="subject"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                    >
                      <option value="">{robotT('subjectPlaceholder')}</option>
                      <option value="courses">{robotT('subjectOptions.courses')}</option>
                      <option value="pricing">{robotT('subjectOptions.pricing')}</option>
                      <option value="technical">{robotT('subjectOptions.technical')}</option>
                      <option value="business">{robotT('subjectOptions.business')}</option>
                      <option value="other">{robotT('subjectOptions.other')}</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {robotT('message')}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                      placeholder={robotT('messagePlaceholder')}
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn-primary py-4 flex items-center justify-center gap-2 font-semibold"
                  >
                    {robotT('sendButton')}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* Información de contacto rápida */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="h3-title mb-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    {t('directContact')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                    <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">Email</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">contact@outliersacademy.com</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">WhatsApp</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">+51 999 999 999</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-400 mb-2">Horario</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Lun - Vie: 9:00 AM - 6:00 PM</p>
                  </div>
                </CardContent>
              </Card>

              {/* AI Assistant */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                    {robotT('virtualAssistant')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                    <ChatbotViewerSafe className="w-full h-full" />
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                      {robotT('comingSoon')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}