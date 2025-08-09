"use client";

interface CheckoutButtonProps {
  priceId: string; 
  successUrl: string; 
  cancelUrl: string; 
  children: React.ReactNode;
  className?: string;
}

export function CheckoutButton({priceId, successUrl, cancelUrl, children, className = "btn-primary"}: CheckoutButtonProps) {
  async function onClick() {
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({priceId, successUrl, cancelUrl})
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout error');
      if (data.url) window.location.href = data.url as string;
    } catch (e) {
      alert((e as Error).message);
    }
  }

  return (
    <button className={className} onClick={onClick}>{children}</button>
  );
} 