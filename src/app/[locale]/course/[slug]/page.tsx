"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader } from '@/components/ui/loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  PlayCircle, 
  Clock, 
  Users, 
  Award,
  CheckCircle,
  Lock,
  Download,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  MessageCircle
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CourseLesson {
  id: number;
  title: string;
  description?: string;
  duration?: number; // in minutes
  video_url?: string;
  content?: string;
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
  duration?: number; // total duration in hours
  students_count?: number;
  rating?: number;
  reviews_count?: number;
  price?: number;
  product_id?: number;
  published?: boolean;
  lessons?: CourseLesson[];
  completion_percentage?: number;
  is_enrolled?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  tags?: string[];
  last_updated?: string;
}

export default function CoursePage({
  params
}: {
  params: { slug: string; locale: string }
}) {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<CourseLesson | null>(null);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = params.locale || 'es';
  const t = useTranslations('course');
  const tLoader = useTranslations('loader');

  const isSpanish = locale === 'es';

  useEffect(() => {
    fetchCourse();
  }, [params.slug]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      
      // Fetch course details
      const courseRes = await fetch(`/api/courses/${params.slug}`);
      if (!courseRes.ok) {
        if (courseRes.status === 404) {
          notFound();
        }
        throw new Error('Failed to fetch course');
      }
      
      const courseData = await courseRes.json();
      
      // If user is authenticated, get their progress
      if (isAuthenticated && user?.odooUserId) {
        try {
          const progressRes = await fetch(`/api/odoo/courses/${courseData.id}/content`);
          if (progressRes.ok) {
            const progressData = await progressRes.json();
            courseData.lessons = progressData.lessons;
            courseData.completion_percentage = progressData.completion_percentage;
            courseData.is_enrolled = progressData.is_enrolled;
          }
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      }
      
      // Add mock data for better demonstration
      courseData.lessons = courseData.lessons || generateMockLessons();
      courseData.instructor = courseData.instructor || 'Dr. María González';
      courseData.instructor_image = courseData.instructor_image || `https://i.pravatar.cc/150?img=${courseData.id}`;
      courseData.duration = courseData.duration || Math.floor(Math.random() * 20) + 5;
      courseData.students_count = courseData.students_count || Math.floor(Math.random() * 1000) + 100;
      courseData.rating = courseData.rating || (4 + Math.random());
      courseData.reviews_count = courseData.reviews_count || Math.floor(Math.random() * 200) + 50;
      courseData.difficulty = courseData.difficulty || ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)];
      courseData.category = courseData.category || ['Inteligencia Artificial', 'Desarrollo Web', 'Data Science', 'Machine Learning'][Math.floor(Math.random() * 4)];
      courseData.tags = courseData.tags || ['Python', 'JavaScript', 'React', 'Node.js', 'AI'].slice(0, Math.floor(Math.random() * 3) + 2);
      courseData.last_updated = courseData.last_updated || new Date().toISOString();
      
      setCourse(courseData);
      
      // Set first lesson as current
      if (courseData.lessons && courseData.lessons.length > 0) {
        setCurrentLesson(courseData.lessons[0]);
        setLessonIndex(0);
      }
      
    } catch (error) {
      console.error('Error fetching course:', error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  const generateMockLessons = (): CourseLesson[] => {
    const lessonTitles = [
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
    ];

    return lessonTitles.map((title, index) => ({
      id: index + 1,
      title,
      description: `En esta lección aprenderás sobre ${title.toLowerCase()}`,
      duration: Math.floor(Math.random() * 30) + 10,
      video_url: `https://example.com/video/${index + 1}`,
      is_preview: index < 2,
      completed: Math.random() > 0.7,
      order: index + 1
    }));
  };

  const nextLesson = () => {
    if (course?.lessons && lessonIndex < course.lessons.length - 1) {
      const newIndex = lessonIndex + 1;
      setLessonIndex(newIndex);
      setCurrentLesson(course.lessons[newIndex]);
    }
  };

  const previousLesson = () => {
    if (lessonIndex > 0) {
      const newIndex = lessonIndex - 1;
      setLessonIndex(newIndex);
      setCurrentLesson(course.lessons![newIndex]);
    }
  };

  const selectLesson = (lesson: CourseLesson, index: number) => {
    if (lesson.is_preview || course?.is_enrolled) {
      setCurrentLesson(lesson);
      setLessonIndex(index);
    }
  };

  const markLessonComplete = async () => {
    if (!currentLesson || !course?.is_enrolled) return;
    
    try {
      await fetch(`/api/odoo/courses/${course.id}/lessons/${currentLesson.id}/complete`, {
        method: 'POST'
      });
      
      // Update local state
      if (course.lessons) {
        const updatedLessons = course.lessons.map(lesson => 
          lesson.id === currentLesson.id ? { ...lesson, completed: true } : lesson
        );
        setCourse({ ...course, lessons: updatedLessons });
      }
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return isSpanish ? 'Principiante' : 'Beginner';
      case 'intermediate': return isSpanish ? 'Intermedio' : 'Intermediate';
      case 'advanced': return isSpanish ? 'Avanzado' : 'Advanced';
      default: return isSpanish ? 'Sin definir' : 'Undefined';
    }
  };

  if (authLoading || loading) {
    return (
      <Loader 
        message={tLoader('pages.course')} 
        fullScreen 
        size="lg"
        showMotivationalMessages 
      />
    );
  }

  if (!course) {
    return notFound();
  }

  const completedLessons = course.lessons?.filter(lesson => lesson.completed).length || 0;
  const totalLessons = course.lessons?.length || 0;
  const completionPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
              
              <nav className="hidden lg:flex items-center space-x-2 text-sm text-gray-500">
                <Link href={`/${locale}`} className="hover:text-gray-700">
                  {isSpanish ? 'Inicio' : 'Home'}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href={`/${locale}/catalog`} className="hover:text-gray-700">
                  {isSpanish ? 'Catálogo' : 'Catalog'}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-gray-900 dark:text-gray-100 font-medium">{course.name}</span>
              </nav>
            </div>

            <div className="flex items-center space-x-2">
              {course.is_enrolled && (
                <div className="hidden sm:flex items-center space-x-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {isSpanish ? 'Progreso:' : 'Progress:'}
                  </span>
                  <div className="w-24">
                    <Progress value={completionPercentage} className="h-2" />
                  </div>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    {Math.round(completionPercentage)}%
                  </span>
                </div>
              )}
              
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              {isSpanish ? 'Contenido del curso' : 'Course content'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {totalLessons} {isSpanish ? 'lecciones' : 'lessons'} • {course.duration}h {isSpanish ? 'total' : 'total'}
            </p>
          </div>
          
          <div className="overflow-y-auto h-full pb-20">
            {course.lessons?.map((lesson, index) => (
              <div
                key={lesson.id}
                onClick={() => selectLesson(lesson, index)}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  currentLesson?.id === lesson.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' : ''
                } ${!lesson.is_preview && !course.is_enrolled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {lesson.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : lesson.is_preview || course.is_enrolled ? (
                      <PlayCircle className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                      {lesson.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{lesson.duration} min</span>
                      {lesson.is_preview && (
                        <Badge variant="secondary" className="text-xs">
                          {isSpanish ? 'Vista previa' : 'Preview'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentLesson ? (
            <>
              {/* Video player */}
              <div className="bg-black relative group">
                <div className="aspect-video flex items-center justify-center">
                  {currentLesson.is_preview || course.is_enrolled ? (
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                      <div className="text-center text-white">
                        <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-80" />
                        <h3 className="text-xl font-semibold mb-2">{currentLesson.title}</h3>
                        <p className="text-gray-300">{currentLesson.duration} {isSpanish ? 'minutos' : 'minutes'}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Lock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold mb-2">
                          {isSpanish ? 'Contenido bloqueado' : 'Content locked'}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {isSpanish ? 'Inscríbete para acceder a este contenido' : 'Enroll to access this content'}
                        </p>
                        <Button onClick={() => router.push(`/${locale}/course/${params.slug}#pricing`)}>
                          {isSpanish ? 'Inscribirse' : 'Enroll now'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video controls */}
                {(currentLesson.is_preview || course.is_enrolled) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-white hover:bg-white/20"
                        >
                          <PlayCircle className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsMuted(!isMuted)}
                          className="text-white hover:bg-white/20"
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                        >
                          <Settings className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                        >
                          <Maximize className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Lesson navigation */}
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={previousLesson}
                      disabled={lessonIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      {isSpanish ? 'Anterior' : 'Previous'}
                    </Button>
                    
                    <div className="text-center">
                      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {currentLesson.title}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {isSpanish ? 'Lección' : 'Lesson'} {lessonIndex + 1} {isSpanish ? 'de' : 'of'} {totalLessons}
                      </p>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextLesson}
                      disabled={lessonIndex === totalLessons - 1}
                    >
                      {isSpanish ? 'Siguiente' : 'Next'}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  {course.is_enrolled && !currentLesson.completed && (
                    <Button onClick={markLessonComplete}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {isSpanish ? 'Marcar completada' : 'Mark complete'}
                    </Button>
                  )}
                </div>
              </div>

              {/* Lesson content tabs */}
              <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto p-6">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">
                        {isSpanish ? 'Resumen' : 'Overview'}
                      </TabsTrigger>
                      <TabsTrigger value="notes">
                        {isSpanish ? 'Notas' : 'Notes'}
                      </TabsTrigger>
                      <TabsTrigger value="discussion">
                        {isSpanish ? 'Discusión' : 'Discussion'}
                      </TabsTrigger>
                      <TabsTrigger value="resources">
                        {isSpanish ? 'Recursos' : 'Resources'}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>{isSpanish ? 'Sobre esta lección' : 'About this lesson'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {currentLesson.description || 
                              `${isSpanish ? 'En esta lección exploraremos' : 'In this lesson we will explore'} ${currentLesson.title.toLowerCase()}. ${isSpanish ? 'Aprenderás conceptos fundamentales y técnicas prácticas que podrás aplicar inmediatamente en tus proyectos.' : 'You will learn fundamental concepts and practical techniques that you can apply immediately in your projects.'}`
                            }
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="notes" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>{isSpanish ? 'Mis notas' : 'My notes'}</CardTitle>
                          <CardDescription>
                            {isSpanish ? 'Toma notas mientras estudias' : 'Take notes while you study'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <textarea
                              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                              placeholder={isSpanish ? 'Escribe tus notas aquí...' : 'Write your notes here...'}
                            />
                            <Button>
                              {isSpanish ? 'Guardar notas' : 'Save notes'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="discussion" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            <MessageCircle className="h-5 w-5 inline mr-2" />
                            {isSpanish ? 'Discusión' : 'Discussion'}
                          </CardTitle>
                          <CardDescription>
                            {isSpanish ? 'Participa en la conversación con otros estudiantes' : 'Join the conversation with other students'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-8 text-gray-500">
                            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>{isSpanish ? 'Sé el primero en comentar' : 'Be the first to comment'}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="resources" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            <Download className="h-5 w-5 inline mr-2" />
                            {isSpanish ? 'Recursos descargables' : 'Downloadable resources'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                                  <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-gray-100">
                                    {isSpanish ? 'Material de estudio' : 'Study material'}
                                  </p>
                                  <p className="text-sm text-gray-500">PDF • 2.3 MB</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {isSpanish ? 'Selecciona una lección' : 'Select a lesson'}
                </h2>
                <p className="text-gray-500">
                  {isSpanish ? 'Elige una lección del menú lateral para comenzar' : 'Choose a lesson from the sidebar to get started'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}