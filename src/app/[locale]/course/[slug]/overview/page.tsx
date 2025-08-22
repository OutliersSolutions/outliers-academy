"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNewAuth } from '@/components/providers/AuthProvider';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckoutButton } from '@/components/CheckoutButton';
import { AddToCartButton } from '@/components/AddToCartButton';
import { 
  BookOpen, 
  PlayCircle, 
  Clock, 
  Users, 
  Award,
  CheckCircle,
  Star,
  ChevronRight,
  Globe,
  Download,
  Smartphone,
  Trophy,
  Target,
  Zap,
  Lock
} from 'lucide-react';
import { useTranslations } from 'next-intl';
interface CourseLesson {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  is_preview?: boolean;
  completed?: boolean;
  order?: number;
}
interface Course {
  id: number;
  slug: string;
  name: string;
  description: string;
  image?: string;
  instructor?: string;
  instructor_image?: string;
  instructor_bio?: string;
  duration?: number;
  students_count?: number;
  rating?: number;
  reviews_count?: number;
  price?: number;
  product_id?: number;
  published?: boolean;
  lessons?: CourseLesson[];
  lessons_count?: number;
  is_enrolled?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  tags?: string[];
  last_updated?: string;
  what_you_learn?: string[];
  prerequisites?: string[];
  includes?: string[];
}
interface Review {
  id: number;
  user_name: string;
  user_avatar?: string;
  rating: number;
  comment: string;
  date: string;
}
export default function CourseOverviewPage({
  params
}: {
  params: { slug: string; locale: string }
}) {
  const { isAuthenticated, user } = useNewAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const locale = params.locale || 'es';
  const t = useTranslations('course');
  const tCommon = useTranslations('common');
  const isSpanish = locale === 'es';
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const courseRes = await fetch(`/api/courses/${params.slug}`);
        if (!courseRes.ok) {
          if (courseRes.status === 404) {
            notFound();
          }
          throw new Error('Failed to fetch course');
        }
        const courseData = await courseRes.json();
        
        // Use real data from API - no more mock data generation
        setCourse(courseData);
        
        // For now, reviews will be empty until we implement real reviews from Odoo
        setReviews([]);
        
      } catch (error) {
        console.error('Error fetching course:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [params.slug]);
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('loading')}</p>
        </div>
      </div>
    );
  }
  if (!course) {
    return notFound();
  }
  
  // Use real data from Odoo instead of mock lessons
  const totalLessons = course.lessons_count || 0;
  const previewLessons = 2; // Default to 2 preview lessons for now
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href={`/${locale}`} className="hover:text-gray-700 dark:hover:text-gray-300">
              {t('home')}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${locale}/catalog`} className="hover:text-gray-700 dark:hover:text-gray-300">
              {t('catalog')}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-gray-100">{course.name}</span>
          </nav>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary" className={getDifficultyColor(course.difficulty)}>
                  {t(`difficulty.${course.difficulty}`)}
                </Badge>
                <Badge variant="outline">{course.category}</Badge>
                {course.tags?.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {course.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {course.description}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                {course.rating && course.rating > 0 ? (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating.toFixed(1)}</span>
                    <span>(rating)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-gray-400" />
                    <span>Sin calificaciones aún</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{course.students_count?.toLocaleString() || '0'} {t('students')}</span>
                </div>
                
                {course.duration && course.duration > 0 && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}h {t('total')}</span>
                  </div>
                )}
                
                {totalLessons > 0 && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{totalLessons} {t('lessons')}</span>
                  </div>
                )}
              </div>
            </div>
            {/* What you'll learn */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {t('whatYouLearn')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.what_you_learn?.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Course content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {t('content')}
                </CardTitle>
                <CardDescription>
                  {totalLessons} {t('lessons')} • {course.duration}h {t('total')} • {previewLessons} {t('freePreviews')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* Show real lessons count info instead of mock lessons */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <PlayCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          Contenido del curso disponible
                        </h4>
                        <p className="text-sm text-gray-500">
                          {totalLessons > 0 ? `${totalLessons} lecciones disponibles` : 'Contenido estructurado por módulos'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/${locale}/course/${params.slug}/learn`)}
                    >
                      <PlayCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Placeholder for when we have real lesson data */}
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>El contenido detallado se mostrará una vez inscrito al curso</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  {t('prerequisites')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.prerequisites?.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>{t('yourInstructor')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={course.instructor_image} alt={course.instructor} />
                    <AvatarFallback>{course.instructor?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                      {course.instructor}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {course.instructor_bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  {t('studentReviews')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map(review => (
                      <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-6 last:pb-0">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.user_avatar} alt={review.user_name} />
                            <AvatarFallback>{review.user_name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {review.user_name}
                              </h4>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aún no hay reseñas para este curso</p>
                    <p className="text-sm mt-2">¡Sé el primero en inscribirte y compartir tu experiencia!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="overflow-hidden">
                {/* Course preview */}
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
                  {course.image ? (
                    <>
                      <img 
                        src={course.image} 
                        alt={course.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
                    </>
                  ) : null}
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 relative z-10"
                    onClick={() => {
                      router.push(`/${locale}/course/${params.slug}/learn`);
                    }}
                  >
                    <PlayCircle className="h-6 w-6 mr-2" />
                    {t('preview')}
                  </Button>
                </div>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      ${course.price?.toFixed(2)}
                    </div>
                    <p className="text-sm text-gray-500">
                      {t('oneTimePayment')}
                    </p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <CheckoutButton courseId={course.id} className="w-full">
                      {t('enrollNowButton')}
                    </CheckoutButton>
                    <AddToCartButton
                      courseId={course.id}
                      productId={course.product_id}
                      courseName={course.name}
                      variant="outline"
                      className="w-full"
                    />
                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => router.push(`/${locale}/course/${params.slug}/learn`)}
                    >
                      {t('viewFreeLessons')}
                    </Button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{t('lifetimeAccess')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-4 w-4 text-green-500" />
                      <span>{t('mobileDesktopAccess')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Trophy className="h-4 w-4 text-green-500" />
                      <span>{t('certificateCompletion')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Download className="h-4 w-4 text-green-500" />
                      <span>{t('courseFeaturesResources')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-green-500" />
                      <span>{t('communitySupport')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
