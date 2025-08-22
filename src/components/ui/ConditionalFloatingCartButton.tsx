'use client'

import { usePathname } from 'next/navigation'
import { FloatingCartButton } from './FloatingCartButton'

export function ConditionalFloatingCartButton() {
  const pathname = usePathname()
  
  // Don't show cart button on these pages:
  // - cart page (since user is already in cart)
  // - dashboard (since it has its own navigation)
  // - checkout pages
  // - login/signup pages
  const excludedPaths = [
    '/cart',
    '/dashboard', 
    '/checkout',
    '/login',
    '/signup',
    '/auth',
  ]

  // Check if current path should hide the cart button
  const shouldHideCart = excludedPaths.some(excludedPath => {
    // Remove locale prefix for comparison
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    return pathWithoutLocale.startsWith(excludedPath)
  })

  // Also check for localized versions (with /es/ or /en/ prefix)
  const shouldHideCartWithLocale = excludedPaths.some(excludedPath => {
    return pathname.includes(excludedPath)
  })

  if (shouldHideCart || shouldHideCartWithLocale) {
    return null
  }

  return <FloatingCartButton />
}