'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useNewAuth } from '@/components/providers/AuthProvider';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface AddToCartButtonProps {
  courseId: number;
  productId?: number;
  courseName: string;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
}

export function AddToCartButton({
  courseId,
  productId,
  courseName,
  className,
  variant = 'outline',
  size = 'default',
  children
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { isAuthenticated } = useNewAuth();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const t = useTranslations('cart');

  // If user is not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <Link href={`/${locale}/login`}>
        <Button
          variant={variant}
          size={size}
          className={className}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {children || t('loginToAdd') || 'Inicia sesión para añadir'}
        </Button>
      </Link>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add',
          courseId,
          productId
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        
        // Handle authentication error specifically
        if (response.status === 401) {
          toast.error('Debes iniciar sesión para añadir cursos al carrito');
          // Redirect to login page
          window.location.href = `/${locale}/login`;
          return;
        }
        
        throw new Error(error.error || 'Failed to add to cart');
      }

      setIsAdded(true);
      toast.success(t('addedToCart', { courseName }));
      
      // Reset the added state after 2 seconds
      setTimeout(() => setIsAdded(false), 2000);
      
      // Dispatch custom event to update cart count
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(t('addToCartError'));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding || isAdded}
      variant={variant}
      size={size}
      className={className}
    >
      {isAdded ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          {t('addedToCart')}
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          {children || t('addToCart')}
        </>
      )}
    </Button>
  );
}