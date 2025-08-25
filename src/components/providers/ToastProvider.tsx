'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      expand={true}
      offset={20}
      dir="ltr"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '0.5rem',
          fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif',
          fontSize: '0.875rem',
          fontWeight: '400',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          padding: '12px 16px',
        },
        className: 'toast-custom',
      }}
    />
  );
}