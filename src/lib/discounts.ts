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

// Mock discount codes for demo purposes
const MOCK_DISCOUNTS: Discount[] = [
  {
    id: '1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    description: 'Descuento de bienvenida del 10%',
    minAmount: 30,
    isActive: true,
  },
  {
    id: '2',
    code: 'STUDENT20',
    type: 'percentage',
    value: 20,
    description: 'Descuento estudiantil del 20%',
    minAmount: 50,
    isActive: true,
  },
  {
    id: '3',
    code: 'SAVE15',
    type: 'fixed',
    value: 15,
    description: 'Descuento fijo de $15',
    minAmount: 50,
    maxAmount: 100,
    isActive: true,
  },
  {
    id: '4',
    code: 'FIRST50',
    type: 'percentage',
    value: 50,
    description: 'Primer curso 50% de descuento',
    usageLimit: 1,
    usedCount: 0,
    isActive: true,
  },
];

export async function validateDiscountCode(code: string): Promise<Discount | null> {
  // In a real app, this would make an API call to validate the code
  const discount = MOCK_DISCOUNTS.find(d => 
    d.code.toLowerCase() === code.toLowerCase() && 
    d.isActive &&
    (!d.expiresAt || d.expiresAt > new Date()) &&
    (!d.usageLimit || (d.usedCount || 0) < d.usageLimit)
  );
  
  return discount || null;
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