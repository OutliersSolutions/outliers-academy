import { NextResponse } from 'next/server';
import { getAcademyStats } from '@/lib/odooClient';

export async function GET() {
  try {
    const stats = await getAcademyStats();
    
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching academy stats:', error);
    
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