import { ParticlesBackground } from '@/components/ui/ParticlesBackground';
import { ChatbotViewerSafe } from '@/components/ChatbotViewerSafe';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-surface/30 relative">
      <ParticlesBackground particleColor="#6366f1" opacity={0.05} />
      
      <section className="py-20 md:py-28 relative z-10">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="h1-hero mb-6">
              Contacta con <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Outliers Academy</span>
            </h1>
            <p className="p-lead max-w-2xl mx-auto">
              ¿Tienes preguntas sobre nuestros cursos o necesitas ayuda? Estamos aquí para ayudarte en tu 
              camino hacia el dominio tecnológico.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Formulario de Contacto */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Apellidos
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Tus apellidos"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Asunto
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Selecciona un tema</option>
                    <option value="courses">Información sobre cursos</option>
                    <option value="pricing">Precios y planes</option>
                    <option value="technical">Soporte técnico</option>
                    <option value="business">Oportunidades de negocio</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary btn-lg justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Enviar mensaje
                </button>
              </form>
            </div>
            
            {/* Información de contacto y 3D */}
            <div className="space-y-8">
              {/* Modelo 3D */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-center">Nuestro Asistente Virtual</h3>
                <div className="h-64">
                  <ChatbotViewerSafe className="w-full h-full" />
                </div>
                <p className="text-center text-sm text-neutral-600 mt-4">
                  ¡Pronto tendrás acceso a nuestro asistente de IA para resolver tus dudas al instante!
                </p>
              </div>
              
              {/* Métodos de contacto */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-6">Otras formas de contactarnos</h3>
                <div className="space-y-6">
                  <a 
                    href="https://wa.me/+51999999999" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.085"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 group-hover:text-primary transition-colors">WhatsApp</h4>
                      <p className="text-neutral-600 text-sm">Contacto directo e inmediato</p>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:info@outliers.academy"
                    className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 group-hover:text-primary transition-colors">Email</h4>
                      <p className="text-neutral-600 text-sm">info@outliers.academy</p>
                    </div>
                  </a>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">Horario de atención</h4>
                      <p className="text-neutral-600 text-sm">Lun - Vie: 9:00 AM - 6:00 PM (GMT-5)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white relative z-10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="h2-section mb-4">Preguntas Frecuentes</h2>
            <p className="p-lead max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre nuestros cursos y servicios.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "¿Cómo puedo inscribirme en un curso?",
                answer: "Puedes inscribirte directamente desde la página de cada curso. Solo necesitas crear una cuenta y proceder con el pago a través de nuestro sistema seguro."
              },
              {
                question: "¿Los cursos incluyen certificado?",
                answer: "Sí, todos nuestros cursos incluyen un certificado de finalización que puedes descargar una vez hayas completado todo el contenido y los ejercicios."
              },
              {
                question: "¿Puedo acceder al contenido desde cualquier dispositivo?",
                answer: "Absolutamente. Nuestra plataforma está optimizada para funcionar en computadoras, tablets y móviles, para que puedas aprender desde donde quieras."
              },
              {
                question: "¿Hay soporte técnico disponible?",
                answer: "Sí, contamos con un equipo de soporte técnico disponible para ayudarte con cualquier problema técnico que puedas experimentar en la plataforma."
              },
              {
                question: "¿Los cursos tienen fecha de vencimiento?",
                answer: "No, una vez que adquieres un curso, tienes acceso de por vida al contenido, incluyendo futuras actualizaciones."
              }
            ].map((faq, index) => (
              <details key={index} className="group border border-neutral-200 rounded-xl">
                <summary className="p-6 cursor-pointer hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-neutral-900">{faq.question}</h3>
                    <svg className="w-5 h-5 text-neutral-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}