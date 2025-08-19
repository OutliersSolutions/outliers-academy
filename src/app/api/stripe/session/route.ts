import {NextResponse} from 'next/server';
import {getStripe} from '@/lib/stripe';
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('session_id');
    if (!sessionId) {
      return NextResponse.json({error: 'Session ID is required'}, {status: 400});
    }
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      amount_total: session.amount_total,
      currency: session.currency,
      metadata: session.metadata,
      created: session.created,
    });
  } catch (err: any) {
    return NextResponse.json(
      {error: err.message || 'Error retrieving session'}, 
      {status: 500}
    );
  }
}
