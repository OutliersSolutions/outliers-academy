import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ParticlesBackground } from '@/components/ui/ParticlesBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Calendar, FileText, Shield, Cookie, Scale } from 'lucide-react';

export default async function LegalPage({
  params
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('legal');

  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-sm px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              {t('lastUpdated')}: Diciembre 2024
            </Badge>
            
            <h1 className="h1-hero mb-6 gradient-text">
              {t('title')}
            </h1>
            
            <p className="p-lead mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* Legal Content */}
        <section className="pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Terms and Conditions */}
              <Card className="lg:col-span-2 hover-lift">
                <CardHeader>
                  <CardTitle className="h2-section flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Scale className="w-4 h-4 text-primary" />
                    </div>
                    {t('sections.terms.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {t('sections.terms.content.intro')}
                      </p>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            {t('sections.terms.content.acceptance.title')}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {t('sections.terms.content.acceptance.content')}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            {t('sections.terms.content.services.title')}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {t('sections.terms.content.services.content')}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            {t('sections.terms.content.userAccounts.title')}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {t('sections.terms.content.userAccounts.content')}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            {t('sections.terms.content.intellectual.title')}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {t('sections.terms.content.intellectual.content')}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            {t('sections.terms.content.payment.title')}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {t('sections.terms.content.payment.content')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Sidebar with Privacy Policy and Cookie Policy */}
              <div className="space-y-6">
                
                {/* Privacy Policy */}
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="h3-title flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center">
                        <Shield className="w-3 h-3 text-accent" />
                      </div>
                      {t('sections.privacy.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t('sections.privacy.content.intro')}
                        </p>
                        
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-sm text-foreground mb-1">
                              {t('sections.privacy.content.collection.title')}
                            </h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {t('sections.privacy.content.collection.content')}
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-sm text-foreground mb-1">
                              {t('sections.privacy.content.use.title')}
                            </h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {t('sections.privacy.content.use.content')}
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-sm text-foreground mb-1">
                              {t('sections.privacy.content.sharing.title')}
                            </h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {t('sections.privacy.content.sharing.content')}
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-sm text-foreground mb-1">
                              {t('sections.privacy.content.security.title')}
                            </h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {t('sections.privacy.content.security.content')}
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-sm text-foreground mb-1">
                              {t('sections.privacy.content.rights.title')}
                            </h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {t('sections.privacy.content.rights.content')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Cookie Policy */}
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="h3-title flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-yellow/10 flex items-center justify-center">
                        <Cookie className="w-3 h-3 text-yellow" />
                      </div>
                      {t('sections.cookies.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[250px] pr-4">
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t('sections.cookies.content.intro')}
                        </p>
                        
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-sm text-foreground mb-1">
                              {t('sections.cookies.content.what.title')}
                            </h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {t('sections.cookies.content.what.content')}
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-sm text-foreground mb-1">
                              {t('sections.cookies.content.types.title')}
                            </h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {t('sections.cookies.content.types.content')}
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-sm text-foreground mb-1">
                              {t('sections.cookies.content.control.title')}
                            </h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {t('sections.cookies.content.control.content')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="h3-title flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-secondary/10 flex items-center justify-center">
                        <FileText className="w-3 h-3 text-primary" />
                      </div>
                      {t('contact.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t('contact.description')}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-primary" />
                        <a 
                          href={`mailto:${t('contact.email')}`}
                          className="text-primary hover:text-accent transition-colors"
                        >
                          {t('contact.email')}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">
                          {t('contact.address')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
