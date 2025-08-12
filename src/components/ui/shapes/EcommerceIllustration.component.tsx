import { ShoppingCart, CheckCircle, Truck, MessageCircle } from 'lucide-react';


interface EcommerceIllustrationProps {
    className?: string;
}

export const EcommerceIllustration = ({ className }: EcommerceIllustrationProps) => {


    const products = [{title: 'Producto 1', price: '$29.99', img: '/images/product1.jpg'}, {title: 'Producto 2', price: '$49.99', img: '/images/product2.jpg'}];
    const benefits = [{label: 'Envío gratis'}, {label: 'Garantía'}, {label: 'Soporte 24/7'}];

    const benefitIcons = [Truck, CheckCircle, MessageCircle];

    return (
        <div className={`${className} relative text-gray-600 dark:text-gray-300 leading-relaxed`}>
            {/* Contenedor principal */}
            <div className="relative z-10 w-full mx-auto">
                <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-800">

                    {/* Encabezado */}
                    <div className="flex justify-between items-center mb-6">
                        {/* Iconos menú hamburguesa */}
                        <div className="flex space-x-1">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-5 h-1 bg-coral rounded-full dark:bg-coral" />
                            ))}
                        </div>

                        {/* Icono de carrito y contador */}
                        <div className="flex items-center space-x-2">
                            <ShoppingCart className="w-5 h-5 text-coral dark:text-coral" />
                            <div className="w-5 h-5 bg-coral-500/10 text-[11px] text-coral font-semibold rounded-full flex items-center justify-center dark:bg-coral-300/10 dark:text-coral">
                                2
                            </div>
                        </div>
                    </div>

                    {/* Productos */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mb-6">
                        {products.map(({ title, price, img }, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-xl transition dark:bg-gray-900">
                                <div className="aspect-square bg-white rounded-lg mb-3 flex items-center justify-center border dark:bg-gray-800 dark:border-gray-700">
                                    <div className="w-16 h-16 bg-coral-100 rounded-md flex items-center justify-center">
                                        <img src={img} alt={title} className="max-w-full max-h-full" />
                                    </div>
                                </div>
                                <div className="text-xs font-medium">{title}</div>
                                <div className="text-sm font-bold text-coral dark:text-coral">{price}</div>
                            </div>
                        ))}
                    </div>

                    {/* Beneficios */}
                    <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                        {benefits.map(({ label }, i) => {
                            const Icon = benefitIcons[i];
                            return (
                                <div key={i} className="flex flex-col items-center text-[11px]">
                                    <Icon className="w-4 h-4 text-coral mb-1 dark:text-coral" />
                                    {label}
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute top-1/2 right-10 -translate-y-1/2 w-24 h-24 bg-coral-100 rounded-full blur-2xl opacity-60 dark:bg-coral-300/30" />
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-blue-100 rounded-full blur-xl opacity-50 dark:bg-blue-300/30" />
            <div className="absolute -top-4 -left-4 w-12 h-12 border-2 border-coral-200 rounded-full opacity-50 dark:border-coral-300/40" />
            <div className="absolute bottom-0 right-14 w-8 h-8 bg-gray-100 rotate-45 rounded-md opacity-70 dark:bg-gray-600/40" />
        </div>
    );
};
