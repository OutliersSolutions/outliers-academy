import {NextResponse} from 'next/server';
import {getStripe} from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const {priceId, successUrl, cancelUrl, metadata = {}} = await request.json();
    
    if (!priceId) {
      return NextResponse.json({error: 'Price ID is required'}, {status: 400});
    }

    const stripe = getStripe();
    
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        }
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing/cancelled`,
      metadata: {
        ...metadata,
        source: 'outliers_academy',
        timestamp: new Date().toISOString(),
      },
      // Allow promotion codes
      allow_promotion_codes: true,
      // Custom billing address collection
      billing_address_collection: 'auto',
      // Invoice creation for business customers
      invoice_creation: {
        enabled: true,
      },
    });

    return NextResponse.json({
      id: session.id,
      url: session.url,
      customer_email: session.customer_email,
    });
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      {error: err.message || 'Error creating checkout session'}, 
      {status: 500}
    );
  }
} 