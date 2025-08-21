import { NextRequest, NextResponse } from 'next/server';
import { getCart, clearCart, cartToString, CART_COOKIE } from '@/lib/cart';
import { verifyAuth } from '@/lib/auth';
import { odooExecuteKw } from '@/lib/odooClient';

export async function POST(request: NextRequest) {
  try {
    const { discountCode, discountAmount } = await request.json();
    
    // Get authenticated user
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Get cart contents
    const cart = getCart(request);
    
    if (cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Create sale order in Odoo
    const orderData: any = {
      partner_id: user.uid,
      state: 'draft',
      origin: 'Academy Online Store'
    };

    // Add discount information if applicable
    if (discountCode && discountAmount) {
      orderData.note = `Discount Applied: ${discountCode} (-$${discountAmount.toFixed(2)})`;
    }

    const orderId = await odooExecuteKw('sale.order', 'create', [orderData]);

    // Add product lines for each cart item
    for (const item of cart.items) {
      const lineData: any = {
        order_id: orderId,
        product_id: item.productId,
        product_uom_qty: item.quantity,
        price_unit: item.price,
        name: item.courseName
      };

      await odooExecuteKw('sale.order.line', 'create', [lineData]);
    }

    // Apply discount if provided
    if (discountCode && discountAmount && discountAmount > 0) {
      // Create a discount line item
      try {
        // Try to find a discount product or create a generic discount line
        const discountLineData = {
          order_id: orderId,
          name: `Discount: ${discountCode}`,
          price_unit: -discountAmount,
          product_uom_qty: 1,
          // Note: In a real implementation, you'd have a specific discount product_id
        };

        await odooExecuteKw('sale.order.line', 'create', [discountLineData]);
      } catch (error) {
        console.error('Failed to apply discount in Odoo:', error);
        // Continue with order creation even if discount fails
      }
    }

    // Confirm the order
    await odooExecuteKw('sale.order', 'action_confirm', [[orderId]]);

    // Build redirect URL to Odoo checkout
    const odooUrl = process.env.ODOO_URL?.replace(/\/+$/, '');
    const redirectUrl = `${odooUrl}/shop/cart`;

    // Clear the cart after successful order creation
    const emptyCart = clearCart();
    const response = NextResponse.json({
      success: true,
      orderId,
      redirectUrl,
      message: 'Order created successfully. Redirecting to secure checkout...',
      cart: emptyCart
    });

    // Clear cart cookie
    response.cookies.delete(CART_COOKIE);

    return response;

  } catch (error) {
    console.error('Cart checkout error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Checkout failed',
        details: 'Please try again or contact support if the problem persists'
      }, 
      { status: 500 }
    );
  }
}