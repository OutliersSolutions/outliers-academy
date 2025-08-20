import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { getUserProfile, updateUserProfile, updateUserAvatar } from '@/lib/odooClient';

export async function GET(request: NextRequest) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const profile = await getUserProfile(session.uid);
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { name, email, phone } = await request.json();
    
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }
    
    // Update user profile in Odoo
    const updatedProfile = await updateUserProfile(session.uid, { name, email, phone });
    
    return NextResponse.json({ profile: updatedProfile });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { avatarBase64 } = await request.json();
    
    if (!avatarBase64) {
      return NextResponse.json({ error: 'Avatar data is required' }, { status: 400 });
    }
    
    // Update user avatar in Odoo
    const updatedProfile = await updateUserAvatar(session.uid, avatarBase64);
    
    return NextResponse.json({ profile: updatedProfile });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
