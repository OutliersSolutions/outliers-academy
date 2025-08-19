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
    const generateMockLessons = (): CourseLesson[] => {
      const lessonTitles = isSpanish ? [
        'Introducción y conceptos básicos',
        'Configuración del entorno de desarrollo',
        'Primeros pasos con el framework',
        'Creando tu primer proyecto',
        'Manejo de datos y estado',
        'Componentes y reutilización',
        'Estilizado y diseño responsivo',
        'Integración con APIs',
        'Testing y debugging',
        'Despliegue y producción'
      ] : [
        'Introduction and basic concepts',
        'Development environment setup',
        'First steps with the framework',
        'Creating your first project',
        'Data and state management',
        'Components and reusability',
        'Styling and responsive design',
        'API integration',
        'Testing and debugging',
        'Deployment and production'
      ];

      return lessonTitles.map((title, index) => ({
        id: index + 1,
        title,
        description: isSpanish ? 
          `En esta lección aprenderás sobre ${title.toLowerCase()}` :
          `In this lesson you will learn about ${title.toLowerCase()}`,
        duration: Math.floor(Math.random() * 30) + 10,
        is_preview: index < 2,
        completed: false,
        order: index + 1
      }));
    };

    const generateMockReviews = (): Review[] => {
      const names = ['Ana García', 'Carlos Rodríguez', 'Sofia Martín', 'Diego López', 'Elena Ruiz'];
      const comments = isSpanish ? [
        'Excelente curso, muy bien explicado y con ejemplos prácticos.',
        'Me encantó la metodología, aprendí muchísimo.',
        'Perfecto para principiantes, todo muy claro.',
        'El instructor explica de manera muy didáctica.',
        'Recomiendo este curso 100%, vale la pena cada minuto.'
      ] : [
        'Excellent course, very well explained with practical examples.',
        'I loved the methodology, I learned a lot.',
        'Perfect for beginners, everything very clear.',
        'The instructor explains in a very didactic way.',
        'I recommend this course 100%, worth every minute.'
      ];

      return names.map((name, index) => ({
        id: index + 1,
        user_name: name,
        user_avatar: `https://i.pravatar.cc/40?img=${index + 10}`,
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
        comment: comments[index],
        date: new Date(Date.now() - Math.random() * 10000000000).toISOString()
      }));
    };

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
        
        // Add enhanced mock data for better demonstration
        courseData.lessons = courseData.lessons || generateMockLessons();
        courseData.instructor = courseData.instructor || 'Dr. María González';
        courseData.instructor_image = courseData.instructor_image || `https://i.pravatar.cc/150?img=${courseData.id}`;
        courseData.instructor_bio = courseData.instructor_bio || (isSpanish ? 
          'Experta en desarrollo de software con más de 10 años de experiencia en la industria tech. Ha trabajado en Google, Microsoft y ahora se dedica a la educación.' :
          'Software development expert with over 10 years of experience in the tech industry. Has worked at Google, Microsoft and now focuses on education.'
        );
        courseData.duration = courseData.duration || Math.floor(Math.random() * 20) + 5;
        courseData.students_count = courseData.students_count || Math.floor(Math.random() * 1000) + 100;
        courseData.rating = courseData.rating || (4 + Math.random());
        courseData.reviews_count = courseData.reviews_count || Math.floor(Math.random() * 200) + 50;
        courseData.difficulty = courseData.difficulty || ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)];
        courseData.category = courseData.category || ['Inteligencia Artificial', 'Desarrollo Web', 'Data Science', 'Machine Learning'][Math.floor(Math.random() * 4)];
        courseData.tags = courseData.tags || ['Python', 'JavaScript', 'React', 'Node.js', 'AI'].slice(0, Math.floor(Math.random() * 3) + 2);
        
        // Enhanced course details with translations
        courseData.what_you_learn = courseData.what_you_learn || (isSpanish ? [
          'Dominar los conceptos fundamentales del tema',
          'Desarrollar proyectos prácticos desde cero',
          'Aplicar mejores prácticas de la industria',
          'Trabajar con herramientas profesionales',
          'Resolver problemas complejos de manera eficiente',
          'Prepararte para oportunidades laborales'
        ] : [
          'Master fundamental concepts of the topic',
          'Develop practical projects from scratch',
          'Apply industry best practices',
          'Work with professional tools',
          'Solve complex problems efficiently',
          'Prepare for job opportunities'
        ]);
        
        courseData.prerequisites = courseData.prerequisites || (isSpanish ? [
          'Conocimientos básicos de programación',
          'Computadora con acceso a internet',
          'Ganas de aprender y practicar'
        ] : [
          'Basic programming knowledge',
          'Computer with internet access',
          'Willingness to learn and practice'
        ]);
        
        courseData.includes = courseData.includes || (isSpanish ? [
          `${courseData.lessons?.length || 10} lecciones en video`,
          'Ejercicios prácticos',
          'Proyectos descargables',
          'Certificado de finalización',
          'Acceso de por vida',
          'Soporte de la comunidad'
        ] : [
          `${courseData.lessons?.length || 10} video lessons`,
          'Practical exercises',
          'Downloadable projects',
          'Certificate of completion',
          'Lifetime access',
          'Community support'
        ]);
        
        setCourse(courseData);
        
        // Generate mock reviews
        setReviews(generateMockReviews());
        
      } catch (error) {
        console.error('Error fetching course:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.slug, isSpanish]);


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

  const totalLessons = course.lessons?.length || 0;
  const previewLessons = course.lessons?.filter(lesson => lesson.is_preview).length || 0;

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
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating?.toFixed(1)}</span>
                  <span>({course.reviews_count} {t('reviews')})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{course.students_count?.toLocaleString()} {t('students')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}h {t('total')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{totalLessons} {t('lessons')}</span>
                </div>
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
                  {course.lessons?.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {lesson.is_preview ? (
                            <PlayCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Lock className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {lesson.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {lesson.duration} {t('minutes')}
                            {lesson.is_preview && (
                              <span className="ml-2 text-green-600 font-medium">
                                {t('preview')}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      {lesson.is_preview && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/${locale}/course/${params.slug}/learn`)}
                        >
                          <PlayCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
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
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="overflow-hidden">
                {/* Course preview */}
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => {
                      const firstPreview = course.lessons?.find(l => l.is_preview);
                      if (firstPreview) {
                        router.push(`/${locale}/course/${params.slug}/learn`);
                      }
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
                    
                    <Button 
                      variant="outline" 
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