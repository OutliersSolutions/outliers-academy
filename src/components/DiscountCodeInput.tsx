'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, X, Tag, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import type { Discount } from '@/lib/discounts';

interface DiscountCodeInputProps {
  subtotal: number;
  onDiscountApplied: (discount: Discount, discountAmount: number) => void;
  onDiscountRemoved: () => void;
  appliedDiscount?: { discount: Discount; discountAmount: number } | null;
}

export function DiscountCodeInput({
  subtotal,
  onDiscountApplied,
  onDiscountRemoved,
  appliedDiscount
}: DiscountCodeInputProps) {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const t = useTranslations('cart');

  const handleApplyDiscount = async () => {
    if (!code.trim()) {
      toast.error('Ingresa un código de descuento');
      return;
    }

    setIsValidating(true);
    
    try {
      const response = await fetch('/api/discount/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.trim(),
          subtotal
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onDiscountApplied(data.discount, data.discountAmount);
        setCode('');
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error applying discount:', error);
      toast.error('Error al aplicar el código de descuento');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveDiscount = () => {
    onDiscountRemoved();
    toast.success('Código de descuento removido');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApplyDiscount();
    }
  };

  return (
    <div className="space-y-3">
      {/* Discount Code Input */}
      {!appliedDiscount && (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Código de descuento"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              className="pl-10"
              disabled={isValidating}
            />
          </div>
          <Button
            onClick={handleApplyDiscount}
            disabled={!code.trim() || isValidating}
            variant="outline"
          >
            {isValidating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Aplicar'
            )}
          </Button>
        </div>
      )}

      {/* Applied Discount Display */}
      {appliedDiscount && (
        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                {appliedDiscount.discount.code}
              </Badge>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                {appliedDiscount.discount.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-600 dark:text-green-400">
              -${appliedDiscount.discountAmount.toFixed(2)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveDiscount}
              className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:text-green-300"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Discount Hints */}
      {!appliedDiscount && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>Códigos de prueba: <span className="font-mono">WELCOME10</span>, <span className="font-mono">STUDENT20</span>, <span className="font-mono">FIRST50</span></p>
        </div>
      )}
    </div>
  );
}