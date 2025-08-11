import {NextRequest, NextResponse} from 'next/server';
import {createSaleOrder} from '@/lib/odooClient';
import {verifyAuth} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const {courseId, productId} = await request.json();
    
    if (!courseId || !productId) {
      return NextResponse.json({error: 'Missing courseId or productId'}, {status: 400});
    }

    // Get authenticated user
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({error: 'Authentication required'}, {status: 401});
    }

    // Create sale order in Odoo
    const orderId = await createSaleOrder(user.uid, productId);
    
    // Build redirect URL to Odoo checkout
    const odooUrl = process.env.ODOO_URL?.replace(/\/+$/, '');
    const redirectUrl = `${odooUrl}/shop/cart`;
    
    return NextResponse.json({
      success: true,
      orderId,
      redirectUrl,
      message: 'Redirecting to secure checkout...'
    });

  } catch (error) {
    console.error('Odoo checkout error:', error);
    return NextResponse.json(
      {error: error instanceof Error ? error.message : 'Checkout failed'}, 
      {status: 500}
    );
  }
}