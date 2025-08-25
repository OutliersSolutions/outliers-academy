'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  Tag,
  CreditCard,
  Lock,
  Heart,
  Star,
  Users,
  Clock,
  Award,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useNewAuth } from '@/components/providers/AuthProvider';
import { DiscountCodeInput } from '@/components/DiscountCodeInput';
import type { Discount } from '@/lib/discounts';

interface CartItem {
  courseId: number;
  productId: number;
  courseName: string;
  price: number;
  slug: string;
  image?: string;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface AppliedDiscount {
  discount: Discount;
  discountAmount: number;
}

interface CartPageProps {
  params: { locale: string }
}

export default function CartPage({ params }: CartPageProps) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [appliedDiscount, setAppliedDiscount] = useState<AppliedDiscount | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useNewAuth();
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  const locale = params.locale || 'es';

  const fetchCart = useCallback(async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error(t('fetchError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const removeFromCart = async (courseId: number, courseName: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'remove',
          courseId
        }),
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
        toast.success(t('removedFromCart', { courseName }));
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error(t('removeError'));
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'clear'
        }),
      });

      if (response.ok) {
        setCart({ items: [], total: 0, itemCount: 0 });
        setAppliedDiscount(null);
        toast.success(t('cartCleared'));
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error(t('clearError'));
    }
  };

  const handleDiscountApplied = (discount: Discount, discountAmount: number) => {
    setAppliedDiscount({ discount, discountAmount });
  };

  const handleDiscountRemoved = () => {
    setAppliedDiscount(null);
  };

  // Calculate final totals
  const subtotal = cart.total;
  const discountAmount = appliedDiscount?.discountAmount || 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const proceedToCheckout = async () => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login?redirect=${encodeURIComponent(`/${locale}/cart`)}`);
      return;
    }

    if (cart.items.length === 0) {
      toast.error(t('emptyCartError'));
      return;
    }

    setProcessingOrder(true);
    
    try {
      const response = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          discountCode: appliedDiscount?.discount.code,
          discountAmount: appliedDiscount?.discountAmount
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.redirectUrl) {
          // Update local cart state
          setCart({ items: [], total: 0, itemCount: 0 });
          setAppliedDiscount(null);
          window.dispatchEvent(new CustomEvent('cartUpdated'));
          
          toast.success('Orden creada exitosamente. Redirigiendo al pago...');
          
          // Redirect to Odoo checkout
          window.location.href = data.redirectUrl;
        }
      } else {
        const error = await response.json();
        toast.error(error.error || t('checkoutError'));
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error(t('checkoutError'));
    } finally {
      setProcessingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 dark:border-blue-800 mx-auto"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">{tCommon('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-200/20 to-blue-200/20 dark:from-indigo-600/15 dark:to-blue-600/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-100 dark:to-purple-200 bg-clip-text text-transparent">
              {t('title') || 'Carrito de Compras'}
            </h1>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <p className="text-lg font-medium">
              {cart.itemCount > 0 
                ? t('itemsInCart', { count: cart.itemCount })
                : t('emptyCart')
              }
            </p>
            <Sparkles className="h-5 w-5 text-purple-500" />
          </div>
        </div>

        {cart.items.length === 0 ? (
          /* Enhanced Empty Cart State */
          <div className="text-center py-20">
            <div className="relative mb-12">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mb-6 shadow-xl">
                <ShoppingCart className="h-16 w-16 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-bounce"></div>
              <div className="absolute top-4 right-1/2 transform translate-x-8 w-4 h-4 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-12 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {t('emptyCartTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-lg mx-auto text-lg leading-relaxed">
              {t('emptyCartDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={`/${locale}/catalog`}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <Heart className="mr-2 h-5 w-5" />
                  {t('browseCourses')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href={`/${locale}`}>
                <Button variant="outline" size="lg" className="px-8 py-4 rounded-2xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enhanced Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Users className="h-6 w-6 text-blue-500" />
                  Tus cursos seleccionados
                </h2>
                {cart.items.length > 1 && (
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl px-4 py-2"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('clearCart')}
                  </Button>
                )}
              </div>

              {cart.items.map((item, index) => (
                <Card key={item.courseId} className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-6 p-6">
                      {/* Enhanced Course Image */}
                      <div className="relative">
                        <div className="w-28 h-28 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                          <span className="text-3xl font-bold bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                            {item.courseName.charAt(0)}
                          </span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-white" />
                        </div>
                      </div>

                      {/* Enhanced Course Info */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/${locale}/course/${item.slug}/overview`}
                          className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        >
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                            {item.courseName}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="h-4 w-4" />
                            <span>Acceso de por vida</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <Award className="h-4 w-4" />
                            <span>Certificado incluido</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            ${item.price.toFixed(2)}
                          </span>
                          <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 border-0">
                            Producto digital
                          </Badge>
                        </div>
                      </div>

                      {/* Enhanced Actions */}
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.courseId, item.courseName)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-xl p-3"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-b border-gray-200/50 dark:border-gray-700/50">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Tag className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-100 bg-clip-text text-transparent">
                      {t('orderSummary')}
                    </span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6 space-y-6">
                  {/* Items breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      Cursos incluidos
                    </h4>
                    {cart.items.map((item) => (
                      <div key={item.courseId} className="flex justify-between text-sm p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <span className="truncate mr-2 font-medium">{item.courseName}</span>
                        <span className="font-bold text-green-600 dark:text-green-400">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

                  {/* Discount Code Input */}
                  <DiscountCodeInput
                    subtotal={subtotal}
                    onDiscountApplied={handleDiscountApplied}
                    onDiscountRemoved={handleDiscountRemoved}
                    appliedDiscount={appliedDiscount}
                  />

                  <Separator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

                  {/* Price breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Subtotal</span>
                      <span className="font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    {appliedDiscount && (
                      <div className="flex justify-between text-sm p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <span className="text-green-700 dark:text-green-300 font-medium">
                          Descuento ({appliedDiscount.discount.code})
                        </span>
                        <span className="text-green-700 dark:text-green-300 font-bold">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

                  {/* Total */}
                  <div className="flex justify-between text-xl font-bold p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl">
                    <span className="text-gray-800 dark:text-gray-200">{t('total')}</span>
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Security info */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200/50 dark:border-green-700/50">
                    <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                      <Lock className="h-4 w-4" />
                      <span className="font-medium">{t('secureCheckout')}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    onClick={proceedToCheckout}
                    disabled={processingOrder}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    size="lg"
                  >
                    {processingOrder ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span className="font-semibold">{t('processing')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <span className="font-semibold">{t('proceedToCheckout')}</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </Button>

                  {!isAuthenticated && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl">
                      {t('loginRequired')}
                    </p>
                  )}

                  {/* Continue Shopping */}
                  <Link href={`/${locale}/catalog`}>
                    <Button variant="outline" className="w-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl py-3 transition-all duration-300">
                      <Heart className="h-4 w-4 mr-2" />
                      {t('continueShopping')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}