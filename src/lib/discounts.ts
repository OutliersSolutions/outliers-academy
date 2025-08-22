export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  minAmount?: number;
  maxAmount?: number;
  expiresAt?: Date;
  usageLimit?: number;
  usedCount?: number;
  isActive: boolean;
}

export interface AppliedDiscount {
  discount: Discount;
  discountAmount: number;
}

// Function to validate discount codes from Odoo
export async function validateDiscountCode(code: string, cartTotal: number): Promise<AppliedDiscount | null> {
  throw new Error('🤦‍♂️ ¡Ups! No configuraste Odoo, cuy. Los descuentos necesitan conexión real con Odoo para validar códigos.');
}

export function calculateDiscount(subtotal: number, discount: Discount): AppliedDiscount | null {
  // Check minimum amount requirement
  if (discount.minAmount && subtotal < discount.minAmount) {
    return null;
  }

  let discountAmount = 0;

  if (discount.type === 'percentage') {
    discountAmount = (subtotal * discount.value) / 100;
  } else if (discount.type === 'fixed') {
    discountAmount = discount.value;
  }

  // Apply maximum discount limit
  if (discount.maxAmount && discountAmount > discount.maxAmount) {
    discountAmount = discount.maxAmount;
  }

  // Don't exceed the subtotal
  if (discountAmount > subtotal) {
    discountAmount = subtotal;
  }

  return {
    discount,
    discountAmount: Math.round(discountAmount * 100) / 100 // Round to 2 decimal places
  };
}

export function formatDiscountDescription(discount: Discount): string {
  if (discount.type === 'percentage') {
    return `${discount.value}% de descuento`;
  } else {
    return `$${discount.value} de descuento`;
  }
}