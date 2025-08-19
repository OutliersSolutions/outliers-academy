import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
export async function GET(request: NextRequest) {
  try {
    const session = await verifyAuth(request);
    if (session) {
      return NextResponse.json({
        authenticated: true,
        user: session
      });
    }
    return NextResponse.json({
      authenticated: false,
      user: null
    });
  } catch (error) {
    return NextResponse.json({
      authenticated: false,
      user: null
    });
  }
}
