import { NextResponse } from 'next/server';
import { getAcademyStats } from '@/lib/odooClient';
//TODO REVIEW THIS
export async function GET() {
  try {
    const stats = await getAcademyStats();
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    //TODO SHOW TOAST ERROR
    // Return fallback data on error
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch stats',
      data: {
        totalStudents: 10000,
        averageRating: 4.8,
        totalReviews: 2340,
        totalCourses: 50
      }
    }, { status: 500 });
  }
}
