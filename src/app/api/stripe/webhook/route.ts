import {NextResponse} from 'next/server';
import {getStripe} from '@/lib/stripe';
import Stripe from 'stripe';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';
export async function POST(request: Request) {
  const stripe = getStripe();
  const sig = request.headers.get('stripe-signature');
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !whSecret) {
    return NextResponse.json({error: 'Missing signature'}, {status: 400});
  }
  const buf = Buffer.from(await request.arrayBuffer());
  try {
    const event = stripe.webhooks.constructEvent(buf, sig, whSecret);
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;
      default:
    }
    return NextResponse.json({received: true});
  } catch (err: any) {
    return NextResponse.json({error: `Webhook Error: ${err.message}`}, {status: 400});
  }
}
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    // Here you would typically:
    // 1. Save the successful payment to your database
    // 2. Grant access to the purchased content
    // 3. Send confirmation emails
    // 4. Update user subscription status
    const metadata = session.metadata;
    const customerEmail = session.customer_email;
    const amountTotal = session.amount_total;
    // TODO: Implement your business logic here
    // Example: await updateUserSubscription(customerEmail, metadata);
  } catch (error) {
  }
}
async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  // TODO: Additional payment success logic
}
async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  // TODO: Handle failed payments (notify user, retry logic, etc.)
}
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // TODO: Handle subscription changes (upgrade, downgrade, cancellation)
}
