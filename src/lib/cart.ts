import { NextRequest } from 'next/server';

export interface CartItem {
  courseId: number;
  productId: number;
  courseName: string;
  price: number;
  slug: string;
  image?: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const CART_COOKIE = 'oa_cart';

export function getCart(request: NextRequest): Cart {
  try {
    const cartCookie = request.cookies.get(CART_COOKIE)?.value;
    if (!cartCookie) {
      return { items: [], total: 0, itemCount: 0 };
    }
    
    const cart = JSON.parse(cartCookie) as Cart;
    return {
      items: cart.items || [],
      total: calculateTotal(cart.items || []),
      itemCount: (cart.items || []).reduce((sum, item) => sum + item.quantity, 0)
    };
  } catch {
    return { items: [], total: 0, itemCount: 0 };
  }
}

export function addToCart(cart: Cart, item: CartItem): Cart {
  const existingItem = cart.items.find(i => i.courseId === item.courseId);
  
  if (existingItem) {
    // For courses, we don't increase quantity, just ensure it's added
    return cart;
  }
  
  const newItems = [...cart.items, { ...item, quantity: 1 }];
  
  return {
    items: newItems,
    total: calculateTotal(newItems),
    itemCount: newItems.length
  };
}

export function removeFromCart(cart: Cart, courseId: number): Cart {
  const newItems = cart.items.filter(item => item.courseId !== courseId);
  
  return {
    items: newItems,
    total: calculateTotal(newItems),
    itemCount: newItems.length
  };
}

export function clearCart(): Cart {
  return { items: [], total: 0, itemCount: 0 };
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export function cartToString(cart: Cart): string {
  return JSON.stringify(cart);
}

export { CART_COOKIE };