'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

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
  const t = useTranslations('cart');

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