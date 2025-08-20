"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useNewAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader } from "@/components/ui/loader";
import { 
  BookOpen, 
  PlayCircle, 
  Clock, 
  Award, 
  Search, 
  Filter,
  Calendar,
  Star,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
interface Course {
  id: number;
  name: string;
  completion: number;
  slides_count: number;
  slug?: string;
  description?: string;
  lastAccessed?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: number; // in hours
  rating?: number;
  instructor?: string;
  thumbnail?: string;
}
export default function MyCoursesPage() {
  const { isAuthenticated, loading: authLoading, user } = useNewAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const tLoader = useTranslations('loader');
  const isSpanish = locale === 'es';
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/${locale}/login`);
      return;
    }
    if (isAuthenticated && user?.odooUserId) {
      fetchUserCourses();
    }
  }, [isAuthenticated, authLoading, user, router, locale]);
  const filterCourses = useCallback(() => {
    let filtered = courses;
    // Filter by tab
    if (selectedTab === 'in-progress') {
      filtered = filtered.filter(course => course.completion > 0 && course.completion < 100);
    } else if (selectedTab === 'completed') {
      filtered = filtered.filter(course => course.completion >= 100);
    } else if (selectedTab === 'not-started') {
      filtered = filtered.filter(course => course.completion === 0);
    }
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredCourses(filtered);
  }, [courses, searchQuery, selectedTab]);
  useEffect(() => {
    filterCourses();
  }, [filterCourses]);
  const fetchUserCourses = async () => {
    try {
      const res = await fetch('/api/odoo/courses');
      if (res.ok) {
        const data = await res.json();
        // Add mock data for better visualization
        const enhancedCourses = (data.courses || []).map((course: Course) => ({
          ...course,
          difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as any,
          duration: Math.floor(Math.random() * 10) + 1,
          rating: 4 + Math.random(),
          instructor: 'Instructor ' + (Math.floor(Math.random() * 5) + 1),
          lastAccessed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        }));
        setCourses(enhancedCourses);
      }
    } catch (error) {
      //TODO SHOW TOAST ERROR
    } finally {
      setLoading(false);
    }
  };
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400'; // Verde claro (Auto)
      case 'intermediate': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'; // Verde (Easy/Normal)
      case 'advanced': return 'bg-gradient-to-r from-red-100 to-purple-100 text-red-800 dark:from-red-900/30 dark:to-purple-900/30 dark:text-red-400'; // Rojo-Morado (Harder/Insane)
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
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
        message={tLoader('pages.courses')} 
        fullScreen 
        size="lg"
        showMotivationalMessages 
      />
    );
  }
  if (!isAuthenticated || !user) {
    return null;
  }
  const completedCourses = courses.filter(course => course.completion >= 100);
  const inProgressCourses = courses.filter(course => course.completion > 0 && course.completion < 100);
  const notStartedCourses = courses.filter(course => course.completion === 0);
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {isSpanish ? 'Mis Cursos' : 'My Courses'}
            </h1>
            <p className="text-muted-foreground">
              {isSpanish ? 'Gestiona y continúa tu aprendizaje' : 'Manage and continue your learning'}
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button asChild variant="outline">
              <Link href={`/${locale}/catalog`}>
                {isSpanish ? 'Explorar Cursos' : 'Explore Courses'}
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/${locale}/dashboard`}>
                {isSpanish ? 'Dashboard' : 'Dashboard'}
              </Link>
            </Button>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{courses.length}</p>
                  <p className="text-sm text-muted-foreground">
                    {isSpanish ? 'Total' : 'Total'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{inProgressCourses.length}</p>
                  <p className="text-sm text-muted-foreground">
                    {isSpanish ? 'En progreso' : 'In Progress'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{completedCourses.length}</p>
                  <p className="text-sm text-muted-foreground">
                    {isSpanish ? 'Completados' : 'Completed'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <PlayCircle className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{notStartedCourses.length}</p>
                  <p className="text-sm text-muted-foreground">
                    {isSpanish ? 'Sin iniciar' : 'Not Started'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isSpanish ? 'Buscar cursos...' : 'Search courses...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="md:ml-4">
            <Filter className="h-4 w-4 mr-2" />
            {isSpanish ? 'Filtros' : 'Filters'}
          </Button>
        </div>
        {/* Course Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              {isSpanish ? 'Todos' : 'All'} ({courses.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              {isSpanish ? 'En progreso' : 'In Progress'} ({inProgressCourses.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              {isSpanish ? 'Completados' : 'Completed'} ({completedCourses.length})
            </TabsTrigger>
            <TabsTrigger value="not-started">
              {isSpanish ? 'Sin iniciar' : 'Not Started'} ({notStartedCourses.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value={selectedTab} className="space-y-6">
            {filteredCourses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {isSpanish ? 'No se encontraron cursos' : 'No courses found'}
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {isSpanish 
                      ? 'Intenta ajustar tus filtros o explora nuevos cursos'
                      : 'Try adjusting your filters or explore new courses'}
                  </p>
                  <Button asChild>
                    <Link href={`/${locale}/catalog`}>
                      {isSpanish ? 'Explorar Cursos' : 'Browse Courses'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-all duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {getDifficultyText(course.difficulty)}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating?.toFixed(1)}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {course.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description || isSpanish ? 'Descripción del curso' : 'Course description'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{isSpanish ? 'Progreso:' : 'Progress:'}</span>
                          <span>{Math.round(course.completion)}%</span>
                        </div>
                        <Progress value={course.completion} className="w-full" />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{course.duration}h</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="h-3 w-3" />
                          <span>{course.slides_count} {isSpanish ? 'lecciones' : 'lessons'}</span>
                        </div>
                      </div>
                      {course.lastAccessed && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {isSpanish ? 'Último acceso: ' : 'Last accessed: '}
                            {new Date(course.lastAccessed).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <Badge 
                          variant={course.completion >= 100 ? "default" : course.completion > 0 ? "secondary" : "outline"}
                        >
                          {course.completion >= 100 
                            ? (isSpanish ? 'Completado' : 'Completed')
                            : course.completion > 0 
                            ? (isSpanish ? 'En progreso' : 'In progress')
                            : (isSpanish ? 'No iniciado' : 'Not started')
                          }
                        </Badge>
                        <Button size="sm" asChild className="group">
                          <Link href={`/${locale}/course/${course.slug || course.id}`}>
                            {course.completion > 0 
                              ? (isSpanish ? 'Continuar' : 'Continue')
                              : (isSpanish ? 'Comenzar' : 'Start')
                            }
                            <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
