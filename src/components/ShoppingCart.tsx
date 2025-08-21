'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingCart as CartIcon, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CartItem {
  courseId: number;
  productId: number;
  courseName: string;
  price: number;
  slug: string;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export function ShoppingCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('cart');

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (courseId: number) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove', courseId })
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear' })
      });

      if (response.ok) {
        setCart({ items: [], total: 0, itemCount: 0 });
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Checkout cart
  const checkoutCart = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (response.ok) {
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        }
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Listen for cart updates
  useEffect(() => {
    fetchCart();

    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  return (
    <div className="relative">
      {/* Cart Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CartIcon className="h-5 w-5" />
        {cart.itemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {cart.itemCount > 99 ? '99+' : cart.itemCount}
          </Badge>
        )}
      </Button>

      {/* Cart Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-[400px] bg-white dark:bg-gray-800 shadow-lg p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CartIcon className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Carrito ({cart.itemCount})</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {cart.items.length === 0 ? (
              <div className="text-center py-8">
                <CartIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.courseId} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {item.courseName.charAt(0)}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.courseName}</h4>
                        <p className="text-green-600 font-bold">${item.price}</p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.courseId)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg text-green-600">
                      ${cart.total.toFixed(2)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button 
                      onClick={checkoutCart}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Procesando...' : 'Finalizar Compra'}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={clearCart}
                      className="w-full"
                      disabled={isLoading}
                    >
                      Vaciar Carrito
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}