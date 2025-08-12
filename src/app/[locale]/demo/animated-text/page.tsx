import { getTranslations } from 'next-intl/server';
import { AnimatedText } from '@/components/ui/AnimatedText';

export default async function AnimatedTextDemoPage({
  params
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('home');
  
  const words = t.raw('headline.animated.words') as string[];
  const baseText = t('headline.animated.baseText');

  const demoWords = ['amazing', 'incredible', 'fantastic', 'awesome', 'brilliant'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Animated Text Effects Demo</h1>
          <p className="text-lg text-neutral-600">Different animation effects for dynamic text</p>
        </div>

        <div className="space-y-16">
          {/* Typing Effect */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-8 text-neutral-800">Typing Effect</h2>
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <AnimatedText 
                baseText={baseText}
                words={words}
                effect="typing"
                typingSpeed={120}
                deletingSpeed={80}
                pauseDuration={2500}
              />
            </div>
          </div>

          {/* Glitch Effect */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-8 text-neutral-800">Glitch Effect</h2>
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <AnimatedText 
                baseText="Code is "
                words={demoWords}
                effect="glitch"
                typingSpeed={100}
                deletingSpeed={60}
                pauseDuration={2000}
              />
            </div>
          </div>

          {/* Fade Effect */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-8 text-neutral-800">Fade Effect</h2>
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <AnimatedText 
                baseText="Learning is "
                words={['powerful', 'transformative', 'essential', 'exciting']}
                effect="fade"
                typingSpeed={140}
                deletingSpeed={90}
                pauseDuration={3000}
              />
            </div>
          </div>

          {/* Slide Effect */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-8 text-neutral-800">Slide Effect</h2>
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <AnimatedText 
                baseText="Innovation meets "
                words={['creativity', 'technology', 'excellence', 'passion']}
                effect="slide"
                typingSpeed={110}
                deletingSpeed={70}
                pauseDuration={2800}
              />
            </div>
          </div>

          {/* Speed Variations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6 text-neutral-800">Fast Typing</h3>
              <div className="text-2xl md:text-3xl font-bold">
                <AnimatedText 
                  baseText="Quick "
                  words={['learner', 'coder', 'thinker', 'developer']}
                  effect="typing"
                  typingSpeed={60}
                  deletingSpeed={30}
                  pauseDuration={1500}
                />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6 text-neutral-800">Slow Typing</h3>
              <div className="text-2xl md:text-3xl font-bold">
                <AnimatedText 
                  baseText="Thoughtful "
                  words={['planning', 'design', 'approach', 'execution']}
                  effect="typing"
                  typingSpeed={200}
                  deletingSpeed={120}
                  pauseDuration={4000}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <a 
            href={`/${params.locale}`}
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}