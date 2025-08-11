import {NextResponse} from 'next/server';
import {fetchCourses} from '@/lib/odooClient';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url);
    const slug = searchParams.get('slug') || undefined;
    const data = await fetchCourses({slug});
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({error: err.message}, {status: 500});
  }
} 