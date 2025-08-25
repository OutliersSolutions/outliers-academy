'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as CartIcon, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNewAuth } from '@/components/providers/AuthProvider';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

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

interface FloatingCartButtonProps {
  className?: string;
}

export function FloatingCartButton({ 
  className = "" 
}: FloatingCartButtonProps) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isAuthenticated, loading: authLoading } = useNewAuth();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  // Show button after a delay with smooth animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Delay for better user experience

    return () => clearTimeout(timer);
  }, []);

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      } else if (response.status === 401) {
        // User not authenticated, clear cart
        setCart({ items: [], total: 0, itemCount: 0 });
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
      } else if (response.status === 401) {
        toast.error('Debes iniciar sesión para gestionar el carrito');
        window.location.href = `/${locale}/login`;
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
      } else if (response.status === 401) {
        toast.error('Debes iniciar sesión para gestionar el carrito');
        window.location.href = `/${locale}/login`;
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
    // Always try to fetch cart (API will handle authentication)
    if (!authLoading) {
      fetchCart();
    }

    const handleCartUpdate = () => {
      if (!authLoading) {
        fetchCart();
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [authLoading]);

  const handleClick = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
    
    // Reset animation after a delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Always show the cart button - authentication is handled by individual actions

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Cart Button */}
          <motion.div 
            className={`fixed bottom-6 left-6 z-[60] ${className}`}
            initial={{ 
              y: 60, 
              opacity: 0, 
              scale: 0.9 
            }}
            animate={{ 
              y: 0, 
              opacity: 1, 
              scale: 1 
            }}
            exit={{ 
              y: 60, 
              opacity: 0, 
              scale: 0.9 
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            {/* Cart button with better styling */}
            <motion.button
              onClick={handleClick}
              className={`
                relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600
                rounded-full shadow-lg hover:shadow-xl flex items-center justify-center 
                transition-all duration-300 transform
                border border-white/10 backdrop-blur-sm
                ${isAnimating ? 'animate-pulse' : ''}
              `}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              aria-label="Open shopping cart"
            >
              <CartIcon className="w-8 h-8 text-white drop-shadow-sm" />
              
              {/* Cart item count badge - only show for authenticated users with items */}
              {isAuthenticated && cart.itemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold"
                >
                  {cart.itemCount > 99 ? '99+' : cart.itemCount}
                </Badge>
              )}
            </motion.button>

            {/* Subtle pulse effect ring */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-blue-500/20 pointer-events-none -z-10"
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.1, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Cart Panel */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="fixed inset-0 z-[55] bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              >
                <motion.div 
                  className="fixed right-0 top-0 h-full w-[400px] bg-white dark:bg-gray-800 shadow-lg p-6 overflow-y-auto"
                  initial={{ x: 400 }}
                  animate={{ x: 0 }}
                  exit={{ x: 400 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <CartIcon className="h-5 w-5" />
                      <h2 className="text-lg font-semibold">
                        {!isAuthenticated ? 'Carrito' : `Carrito ${cart.itemCount > 0 ? `(${cart.itemCount})` : ''}`}
                      </h2>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {cart.items.length === 0 ? (
                    <div className="text-center py-8">
                      <CartIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      {!isAuthenticated ? (
                        <>
                          <p className="text-gray-500 mb-2">Inicia sesión para ver tu carrito</p>
                          <Button 
                            onClick={() => {
                              setIsOpen(false);
                              window.location.href = `/${locale}/login`;
                            }}
                            className="mt-2"
                          >
                            Iniciar Sesión
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-500 mb-2">Tu carrito está vacío</p>
                          <p className="text-sm text-gray-400">
                            Explora nuestros cursos y añade los que te interesen
                          </p>
                        </>
                      )}
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}