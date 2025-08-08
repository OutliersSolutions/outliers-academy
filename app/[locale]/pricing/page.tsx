import {CheckoutButton} from '@/components/CheckoutButton';

export default function PricingPage() {
  const starter = process.env.STRIPE_PRICE_ID_STARTER || '';
  const pro = process.env.STRIPE_PRICE_ID_PRO || '';

  const successUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/es`;
  const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/es/pricing`;

  return (
    <div className="container py-16">
      <h1 className="h2-section">Planes</h1>
      <p className="p-lead mt-2">Elige el plan que mejor se adapte a tu objetivo.</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-xl font-extrabold">Starter</h3>
          <p className="mt-2 text-neutral-700">Acceso a cursos introductorios y comunidad.</p>
          <div className="mt-4 text-2xl font-extrabold">US$9</div>
          {starter ? (
            <div className="mt-6">
              <CheckoutButton priceId={starter} successUrl={successUrl} cancelUrl={cancelUrl}>Comprar</CheckoutButton>
            </div>
          ) : (
            <p className="mt-6 text-sm text-neutral-500">Configura STRIPE_PRICE_ID_STARTER en .env</p>
          )}
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-extrabold">Pro</h3>
          <p className="mt-2 text-neutral-700">Todo Starter + proyectos avanzados y mentoría.</p>
          <div className="mt-4 text-2xl font-extrabold">US$29</div>
          {pro ? (
            <div className="mt-6">
              <CheckoutButton priceId={pro} successUrl={successUrl} cancelUrl={cancelUrl}>Comprar</CheckoutButton>
            </div>
          ) : (
            <p className="mt-6 text-sm text-neutral-500">Configura STRIPE_PRICE_ID_PRO en .env</p>
          )}
        </div>
      </div>
    </div>
  );
} 