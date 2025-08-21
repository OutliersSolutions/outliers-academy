import { NextRequest, NextResponse } from 'next/server';
import { validateDiscountCode, calculateDiscount } from '@/lib/discounts';

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json();
    
    if (!code) {
      return NextResponse.json({ error: 'Discount code is required' }, { status: 400 });
    }

    if (!subtotal || subtotal <= 0) {
      return NextResponse.json({ error: 'Valid subtotal is required' }, { status: 400 });
    }

    const discount = await validateDiscountCode(code);
    
    if (!discount) {
      return NextResponse.json({ 
        error: 'Código de descuento inválido o expirado' 
      }, { status: 404 });
    }

    const appliedDiscount = calculateDiscount(subtotal, discount);
    
    if (!appliedDiscount) {
      return NextResponse.json({ 
        error: `Este descuento requiere un mínimo de $${discount.minAmount}` 
      }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      discount,
      discountAmount: appliedDiscount.discountAmount,
      message: `Código aplicado: ${appliedDiscount.discountAmount.toFixed(2)} de descuento`
    });

  } catch (error) {
    console.error('Error validating discount:', error);
    return NextResponse.json({ error: 'Error al validar el código de descuento' }, { status: 500 });
  }
}