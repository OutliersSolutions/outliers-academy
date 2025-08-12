"use client";

interface CheckoutButtonProps {
  courseId?: number;
  productId?: number; 
  priceId?: string;
  successUrl?: string; 
  cancelUrl?: string; 
  children: React.ReactNode;
  className?: string;
  odooCheckout?: boolean;
}

export function CheckoutButton({
  courseId, 
  productId, 
  priceId, 
  successUrl, 
  cancelUrl, 
  children, 
  className = "btn-primary",
  odooCheckout = true
}: CheckoutButtonProps) {
  
  async function onClick() {
    try {
      if (odooCheckout && productId) {
        // Odoo-centric checkout flow
        const res = await fetch('/api/odoo/checkout', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({courseId, productId})
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Checkout error');
        
        // Redirect to Odoo shop product page or sale order
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        }
      } else if (priceId) {
        // Fallback to Stripe direct checkout
        const res = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({priceId, successUrl, cancelUrl})
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Checkout error');
        if (data.url) window.location.href = data.url as string;
      }
    } catch (e) {
      console.error('Checkout error:', e);
      alert((e as Error).message);
    }
  }

  return (
    <button className={className} onClick={onClick}>{children}</button>
  );
} 