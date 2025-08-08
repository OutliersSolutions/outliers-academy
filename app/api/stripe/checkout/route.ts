import {NextResponse} from 'next/server';
import {getStripe} from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const {priceId, successUrl, cancelUrl} = await request.json();
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{price: priceId, quantity: 1}],
      success_url: successUrl,
      cancel_url: cancelUrl
    });
    return NextResponse.json({id: session.id, url: session.url});
  } catch (err: any) {
    return NextResponse.json({error: err.message}, {status: 500});
  }
} 