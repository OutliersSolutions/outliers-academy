import { NextResponse } from 'next/server';
import { getCompanyInfo } from '@/lib/odooClient';

export async function GET() {
  try {
    const companyInfo = await getCompanyInfo();
    
    return NextResponse.json({
      success: true,
      data: companyInfo
    });
  } catch (error) {
    console.error('Error getting company info:', error);
    
    // Return fallback data in case of error
    return NextResponse.json({
      success: false,
      data: {
        email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@outliersacademy.com',
        phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+51999999999',
        whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51999999999',
        calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/outliersacademy'
      }
    });
  }
}