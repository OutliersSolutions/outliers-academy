import {NextResponse} from 'next/server';
import {authenticate, getUserProfile} from '@/lib/odooClient';

export async function GET() {
  try {
    const ODOO_URL = process.env.ODOO_URL;
    const ODOO_DB = process.env.ODOO_DB;
    const ODOO_USERNAME = process.env.ODOO_USERNAME;
    
    if (!ODOO_URL || !ODOO_DB || !ODOO_USERNAME) {
      return NextResponse.json({
        status: 'error',
        message: 'Odoo configuration missing',
        configuration: {
          ODOO_URL: !!ODOO_URL,
          ODOO_DB: !!ODOO_DB,
          ODOO_USERNAME: !!ODOO_USERNAME,
          ODOO_PASSWORD: !!process.env.ODOO_PASSWORD
        }
      }, {status: 500});
    }

    // Test authentication
    const uid = await authenticate();
    
    if (!uid) {
      return NextResponse.json({
        status: 'error',
        message: 'Authentication failed'
      }, {status: 401});
    }

    // Get user profile
    const profile = await getUserProfile(uid);

    return NextResponse.json({
      status: 'connected',
      database: ODOO_DB,
      url: ODOO_URL,
      user: ODOO_USERNAME,
      uid: uid,
      profile: profile ? {
        id: profile.id,
        name: profile.name,
        email: profile.email
      } : null
    });

  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      error: error.toString()
    }, {status: 500});
  }
}
