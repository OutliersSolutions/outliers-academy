import {NextResponse} from 'next/server';
import {fetchCourses} from '@/lib/odooClient';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url);
    const slug = searchParams.get('slug') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const sortBy = searchParams.get('sortBy') || undefined;
    
    const data = await fetchCourses({slug, limit, sortBy});
    return NextResponse.json({courses: data});
  } catch (err: any) {
    return NextResponse.json({error: err.message}, {status: 500});
  }
} 