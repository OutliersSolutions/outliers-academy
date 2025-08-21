'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { StarRating } from '@/components/ui/StarRating';
import { UserAvatars } from '@/components/ui/UserAvatars';
interface AcademyStatsData {
  totalStudents: number;
  averageRating: number;
  totalReviews: number;
  totalCourses: number;
}
interface AcademyStatsProps {
  locale: string;
}
export function AcademyStats({ locale }: AcademyStatsProps) {
  const [stats, setStats] = useState<AcademyStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('courses.stats');
  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/academy/stats');
        const result = await response.json();
        if (result.success && result.data) {
          setStats(result.data);
        } else {
          // Fallback data if API fails
          setStats({
            totalStudents: 10000,
            averageRating: 4.8,
            totalReviews: 2340,
            totalCourses: 50
          });
        }
      } catch (error) {
        // Fallback data
        setStats({
          totalStudents: 10000,
          averageRating: 4.8,
          totalReviews: 2340,
          totalCourses: 50
        });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center gap-8 text-sm text-neutral-600 dark:text-neutral-300 animate-pulse">
        <div className="flex items-center gap-2">
          <UserAvatars />
          <span className="bg-gray-200 h-4 w-24 rounded"></span>
        </div>
        <div className="flex items-center gap-1">
          <StarRating rating={4.8} />
          <span className="bg-gray-200 h-4 w-20 rounded"></span>
        </div>
      </div>
    );
  }
  if (!stats) return null;
  const formatStudentCount = (count: number) => {
    if (count >= 10000) {
      return `+${Math.floor(count / 1000)}K`;
    } else if (count >= 1000) {
      return `+${(count / 1000).toFixed(1)}K`;
    }
    return `+${count}`;
  };
  const formatReviewCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };
  const studentsText = `${formatStudentCount(stats.totalStudents)} ${t('students')}`;
  const reviewsText = `${stats.averageRating} (${formatReviewCount(stats.totalReviews)} ${t('reviews')})`;
  return (
    <div className="flex items-center gap-8 text-sm text-neutral-600 dark:text-neutral-300">
      <div className="flex items-center gap-2">
        <UserAvatars />
        <span className="font-medium">{studentsText}</span>
      </div>
      <div className="flex items-center gap-1">
        <StarRating rating={stats.averageRating} />
        <span className="font-medium">{reviewsText}</span>
      </div>
    </div>
  );
}
