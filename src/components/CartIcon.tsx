'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function CartIcon() {
  const [itemCount, setItemCount] = useState(0);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  useEffect(() => {
    // Fetch initial cart count
    fetchCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const cart = await response.json();
        setItemCount(cart.itemCount || 0);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  return (
    <Link href={`/${locale}/cart`}>
      <Button variant="ghost" size="sm" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-[20px]"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
}