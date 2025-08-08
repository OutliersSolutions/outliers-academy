import {NextResponse} from 'next/server';
import {getStripe} from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';

export async function POST(request: Request) {
  const stripe = getStripe();
  const sig = request.headers.get('stripe-signature');
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !whSecret) return NextResponse.json({error: 'Missing signature'}, {status: 400});

  const buf = Buffer.from(await request.arrayBuffer());

  try {
    const event = stripe.webhooks.constructEvent(buf, sig, whSecret);
    // TODO: handle events (checkout.session.completed, etc.)
    return NextResponse.json({received: true});
  } catch (err: any) {
    return NextResponse.json({error: `Webhook Error: ${err.message}`}, {status: 400});
  }
} 