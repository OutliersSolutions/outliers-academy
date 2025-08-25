'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNewAuth } from '@/components/providers/AuthProvider';

export function CartLink() {
  const [itemCount, setItemCount] = useState(0);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const { isAuthenticated } = useNewAuth();

  useEffect(() => {
    // Only fetch cart count if user is authenticated
    if (isAuthenticated) {
      fetchCartCount();
    } else {
      setItemCount(0);
    }

    // Listen for cart updates
    const handleCartUpdate = () => {
      if (isAuthenticated) {
        fetchCartCount();
      } else {
        setItemCount(0);
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [isAuthenticated]);

  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const cart = await response.json();
        setItemCount(cart.itemCount || 0);
      } else {
        setItemCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setItemCount(0);
    }
  };

  return (
    <Link 
      href={`/${locale}/cart`}
      className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <ShoppingCart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      {itemCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-[20px] rounded-full"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
    </Link>
  );
} 