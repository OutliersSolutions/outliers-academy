import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 /api/auth/verify called');
    const session = await verifyAuth(request);
    console.log('🔍 verifyAuth result:', session);
    
    if (session) {
      console.log('✅ Session valid, returning authenticated');
      return NextResponse.json({
        authenticated: true,
        user: session
      });
    }
    
    console.log('❌ No session found, returning unauthenticated');
    return NextResponse.json({
      authenticated: false,
      user: null
    });
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json({
      authenticated: false,
      user: null
    });
  }
}