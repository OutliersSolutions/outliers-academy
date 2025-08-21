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
  Lock
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{tCommon('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {cart.itemCount > 0 
              ? t('itemsInCart', { count: cart.itemCount })
              : t('emptyCart')
            }
          </p>
        </div>

        {cart.items.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {t('emptyCartTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {t('emptyCartDescription')}
            </p>
            <Link href={`/${locale}/catalog`}>
              <Button size="lg">
                {t('browseCourses')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <Card key={item.courseId}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Course Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                          {item.courseName.charAt(0)}
                        </span>
                      </div>

                      {/* Course Info */}
                      <div className="flex-1">
                        <Link 
                          href={`/${locale}/course/${item.slug}/overview`}
                          className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {item.courseName}
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {t('courseAccess')}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            ${item.price.toFixed(2)}
                          </span>
                          <Badge variant="secondary">
                            {t('digitalProduct')}
                          </Badge>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.courseId, item.courseName)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Clear Cart Button */}
              {cart.items.length > 1 && (
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('clearCart')}
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    {t('orderSummary')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items breakdown */}
                  <div className="space-y-2">
                    {cart.items.map((item) => (
                      <div key={item.courseId} className="flex justify-between text-sm">
                        <span className="truncate mr-2">{item.courseName}</span>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Discount Code Input */}
                  <DiscountCodeInput
                    subtotal={subtotal}
                    onDiscountApplied={handleDiscountApplied}
                    onDiscountRemoved={handleDiscountRemoved}
                    appliedDiscount={appliedDiscount}
                  />

                  <Separator />

                  {/* Price breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {appliedDiscount && (
                      <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                        <span>Descuento ({appliedDiscount.discount.code})</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('total')}</span>
                    <span className="text-green-600 dark:text-green-400">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Security info */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Lock className="h-4 w-4" />
                      <span>{t('secureCheckout')}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    onClick={proceedToCheckout}
                    disabled={processingOrder}
                    className="w-full"
                    size="lg"
                  >
                    {processingOrder ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {t('processing')}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        {t('proceedToCheckout')}
                      </div>
                    )}
                  </Button>

                  {!isAuthenticated && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      {t('loginRequired')}
                    </p>
                  )}

                  {/* Continue Shopping */}
                  <Link href={`/${locale}/catalog`}>
                    <Button variant="outline" className="w-full">
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