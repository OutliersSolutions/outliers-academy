"use client";
import {useState} from 'react';
import {Loader2} from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function onClick() {
    setIsLoading(true);
    setError(null);
    try {
      if (odooCheckout && productId) {
        // Odoo-centric checkout flow
        const res = await fetch('/api/odoo/checkout', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({courseId, productId})
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error en el checkout con Odoo');
        //TODO SHOW TOAST
        // Redirect to Odoo shop product page or sale order
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        }
      } else if (priceId) {
        // Stripe checkout flow
        const res = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({priceId, successUrl, cancelUrl})
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error en el checkout con Stripe');
        //TODO SHOW TOAST
        if (data.url) {
          window.location.href = data.url as string;
        } else {
          throw new Error('No se recibió URL de checkout');
        }
      } else {
        throw new Error('No se especificó método de pago válido');
      }
    } catch (e) {
      //TODO SHOW TOAST ERROR
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full">
      <button 
        className={`${className} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`} 
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Procesando...
          </div>
        ) : (
          children
        )}
      </button>
      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
          {error}
        </div>
      )}
    </div>
  );
}
