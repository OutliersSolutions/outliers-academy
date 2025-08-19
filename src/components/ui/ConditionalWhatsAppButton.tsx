'use client'

import { usePathname } from 'next/navigation'
import { WhatsAppButton } from './WhatsAppButton'

export function ConditionalWhatsAppButton() {
  const pathname = usePathname()
  
  // Show WhatsApp button only on home page
  // Check for home paths: /es, /en, /es/, /en/, /, etc.
  const isHomePage = pathname === '/' || 
                     pathname === '/es' || 
                     pathname === '/en' ||
                     pathname === '/es/' || 
                     pathname === '/en/' ||
                     /^\/[a-z]{2}$/.test(pathname) ||
                     /^\/[a-z]{2}\/$/.test(pathname)

  if (!isHomePage) {
    return null
  }

  return <WhatsAppButton />
}
