"use client";

export function CheckoutButton({priceId, successUrl, cancelUrl, children}: {priceId: string; successUrl: string; cancelUrl: string; children: React.ReactNode;}) {
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
    <button className="btn-primary" onClick={onClick}>{children}</button>
  );
} 