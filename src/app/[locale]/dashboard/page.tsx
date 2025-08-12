"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Award, Clock, PlayCircle, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

interface Course {
  id: number;
  name: string;
  completion: number;
  slides_count: number;
  slug?: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  const isSpanish = locale === 'es';

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/${locale}/login`);
      return;
    }

    if (status === "authenticated" && session?.user?.odooUserId) {
      fetchUserCourses();
    }
  }, [status, session, router, locale]);

  const fetchUserCourses = async () => {
    try {
      const res = await fetch('/api/odoo/courses');
      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: `/${locale}` });
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">
            {isSpanish ? 'Cargando tu panel...' : 'Loading your dashboard...'}
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const completedCourses = courses.filter(course => course.completion >= 100);
  const inProgressCourses = courses.filter(course => course.completion > 0 && course.completion < 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src={session.user.image || undefined} />
              <AvatarFallback>
                {session.user.name?.split(' ').map(n => n[0]).join('') || session.user.email?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                {isSpanish ? '¡Hola, ' : 'Hello, '}{session.user.name || session.user.email}!
              </h1>
              <p className="text-muted-foreground">
                {isSpanish ? 'Bienvenido a tu panel de estudiante' : 'Welcome to your student dashboard'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              {isSpanish ? 'Configuración' : 'Settings'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              {isSpanish ? 'Cerrar sesión' : 'Sign out'}
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isSpanish ? 'Cursos Inscritos' : 'Enrolled Courses'}
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isSpanish ? 'Cursos Completados' : 'Completed Courses'}
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isSpanish ? 'En Progreso' : 'In Progress'}
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCourses.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses">
              {isSpanish ? 'Mis Cursos' : 'My Courses'}
            </TabsTrigger>
            <TabsTrigger value="certificates">
              {isSpanish ? 'Certificaciones' : 'Certificates'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-6">
            {courses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {isSpanish ? 'No tienes cursos inscritos' : 'No enrolled courses'}
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {isSpanish 
                      ? 'Explora nuestro catálogo y comienza tu viaje de aprendizaje'
                      : 'Explore our catalog and start your learning journey'}
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
                {courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>
                        {course.slides_count} {isSpanish ? 'lecciones' : 'lessons'}
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
                      
                      <div className="flex items-center justify-between">
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
                        
                        <Button size="sm" asChild>
                          <Link href={`/${locale}/course/${course.slug || course.id}`}>
                            <PlayCircle className="h-4 w-4 mr-2" />
                            {course.completion > 0 
                              ? (isSpanish ? 'Continuar' : 'Continue')
                              : (isSpanish ? 'Comenzar' : 'Start')
                            }
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="certificates" className="space-y-6">
            {completedCourses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Award className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {isSpanish ? 'Sin certificaciones aún' : 'No certificates yet'}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {isSpanish 
                      ? 'Completa un curso para obtener tu primer certificado'
                      : 'Complete a course to earn your first certificate'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-yellow-500" />
                        {course.name}
                      </CardTitle>
                      <CardDescription>
                        {isSpanish ? 'Certificado de finalización' : 'Certificate of completion'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge className="bg-green-100 text-green-800">
                          {isSpanish ? 'Completado' : 'Completed'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          {isSpanish ? 'Descargar' : 'Download'}
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