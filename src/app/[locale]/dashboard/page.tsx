"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Award, Clock, PlayCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { useNewAuth } from "@/components/providers/AuthProvider";

interface Course {
  id: number;
  name: string;
  completion: number;
  slides_count: number;
  slug?: string;
}

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const router = useRouter();
  const t = useTranslations('dashboard');
  const { isAuthenticated, loading: isLoading, user, logout } = useNewAuth();

  // Don't redirect here - let middleware handle auth protection
  // The middleware already protects this route and redirects unauthenticated users
  
  // Show loading spinner while auth provider is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">
            {locale === 'es' ? 'Cargando dashboard...' : 'Loading dashboard...'}
          </p>
        </div>
      </div>
    );
  }

  // If we reach here, middleware has already verified auth
  // If user is still null, show a loading state instead of unauthorized
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">
            {locale === 'es' ? 'Cargando perfil de usuario...' : 'Loading user profile...'}
          </p>
        </div>
      </div>
    );
  }


  const handleSignOut = () => {
    logout(); // Use AuthProvider logout for consistency
  };


  const completedCourses = courses.filter(course => course.completion >= 100);
  const inProgressCourses = courses.filter(course => course.completion > 0 && course.completion < 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback>
                {user.name?.split(' ').map(n => n[0]).join('') || user.email?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                {t('welcome', { name: user.name || user.email })}
              </h1>
              <p className="text-muted-foreground">
                {t('welcomeSubtitle')}
              </p>
            </div>
          </div>
          
          <Button variant="outline" onClick={handleSignOut}>
            {locale === 'es' ? 'Cerrar Sesión' : 'Sign Out'}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('stats.enrolledCourses')}
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
                {t('stats.completedCourses')}
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
                {t('stats.inProgress')}
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
              {t('tabs.myCourses')}
            </TabsTrigger>
            <TabsTrigger value="certificates">
              {t('tabs.certificates')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-6">
            {courses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {t('emptyState.noCourses')}
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {t('emptyState.exploreMessage')}
                  </p>
                  <Button asChild>
                    <Link href={`/${locale}/catalog`}>
                      {t('emptyState.browseButton')}
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
                        {course.slides_count} {t('course.lessons')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{t('course.progress')}</span>
                          <span>{Math.round(course.completion)}%</span>
                        </div>
                        <Progress value={course.completion} className="w-full" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={course.completion >= 100 ? "default" : course.completion > 0 ? "secondary" : "outline"}
                        >
                          {course.completion >= 100 
                            ? t('course.completed')
                            : course.completion > 0 
                            ? t('course.inProgress')
                            : t('course.notStarted')
                          }
                        </Badge>
                        
                        <Button size="sm" asChild>
                          <Link href={`/${locale}/course/${course.slug || course.id}`}>
                            <PlayCircle className="h-4 w-4 mr-2" />
                            {course.completion > 0 
                              ? t('course.continue')
                              : t('course.start')
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
                    {t('certificates.noCertificates')}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {t('certificates.completeMessage')}
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
                        {t('certificates.certificateOfCompletion')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge className="bg-green-100 text-green-800">
                          {t('certificates.completed')}
                        </Badge>
                        <Button size="sm" variant="outline">
                          {t('certificates.download')}
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