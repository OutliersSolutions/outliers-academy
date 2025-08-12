'use client'; // Si usas Next.js con App Router

import { InlineWidget } from 'react-calendly';


export const CalendlySection = () => {

    // Get month and year from current date
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    // Format month and year
    const formattedMonth = month.toString().padStar/* t( */2, '0');

    return (
        <section className="pt-1 sm:pt-1 md:pt-10 lg:pt-10 flex items-center justify-center relative overflow-x-hidden">
            <div className="container mx-auto px-6 sm:px-10 md:px-20 relative z-10">
                <div className="relative z-20 w-full flex flex-col items-center text-center text-gray-600 dark:text-gray-300 leading-relaxed">

                    <h1
                        className="text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
                        dangerouslySetInnerHTML={{ __html: /* t( */'calendly.title') }}
                    />

                    <p className="text-base md:text-lg max-w-lg mt-5">
                        {/* t( */'calendly.description')}
                    </p>

                    {/* Calendly Inline Embed */}
                    <div className="w-full h-[700px] rounded-md overflow-hidden mt-5 mb-10">
                        <InlineWidget
                            url={`https://calendly.com/outliers-solutions/meeting?month=${year}-${formattedMonth}`}
                            styles={{
                                height: '100%',
                                width: '100%',
                                minWidth: '320px',
                            }}
                            pageSettings={{
                                backgroundColor: 'ffffff',
                                hideEventTypeDetails: false,
                                hideLandingPageDetails: false,
                                primaryColor: '#f97316',
                                textColor: '1f2937',
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
