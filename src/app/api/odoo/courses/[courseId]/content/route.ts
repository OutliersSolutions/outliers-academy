import {NextRequest, NextResponse} from 'next/server';
import {fetchCourseContent} from '@/lib/odooClient';
import {verifyAuth} from '@/lib/auth';

export async function GET(
  request: NextRequest,
  {params}: {params: {courseId: string}}
) {
  try {
    const courseId = parseInt(params.courseId);
    if (!courseId) {
      return NextResponse.json({error: 'Invalid course ID'}, {status: 400});
    }

    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({error: 'Authentication required'}, {status: 401});
    }

    const content = await fetchCourseContent(courseId, user.uid);
    
    if (!content) {
      return NextResponse.json({error: 'Course not found or access denied'}, {status: 404});
    }

    return NextResponse.json({
      success: true,
      courseId,
      content,
      totalSlides: content.length
    });

  } catch (error) {
    console.error('Fetch course content error:', error);
    
    if (error instanceof Error && error.message === 'Access denied to this course') {
      return NextResponse.json({error: 'Access denied to this course'}, {status: 403});
    }
    
    return NextResponse.json(
      {error: error instanceof Error ? error.message : 'Failed to fetch course content'}, 
      {status: 500}
    );
  }
}