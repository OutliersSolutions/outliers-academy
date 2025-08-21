import {NextResponse} from 'next/server';
import {fetchCourses} from '@/lib/odooClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch top 6 courses ordered by popularity (members_count)
    const data = await fetchCourses({
      limit: 6, 
      sortBy: 'popularity'
    });
    
    return NextResponse.json({courses: data});
  } catch (err: any) {
    return NextResponse.json({error: err.message}, {status: 500});
  }
}
