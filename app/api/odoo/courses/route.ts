import {NextRequest, NextResponse} from 'next/server';
import {fetchUserCourses} from '@/lib/odooClient';
import {verifyAuth} from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({error: 'Authentication required'}, {status: 401});
    }

    const courses = await fetchUserCourses(user.uid);
    
    return NextResponse.json({
      success: true,
      courses,
      total: courses.length
    });

  } catch (error) {
    console.error('Fetch user courses error:', error);
    return NextResponse.json(
      {error: error instanceof Error ? error.message : 'Failed to fetch courses'}, 
      {status: 500}
    );
  }
}