'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-left"
      richColors
      closeButton
      expand={true}
      offset={16}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '0.75rem',
          fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif',
          fontSize: '0.875rem',
          fontWeight: '500',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(8px)',
        },
        className: 'toast-custom',
      }}
    />
  );
}