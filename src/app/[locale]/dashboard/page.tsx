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
            {t('loadingDashboard')}
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
            {t('loadingProfile')}
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                {user.name?.split(' ').map(n => n[0]).join('') || user.email?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                {t('welcome', { name: user.name || user.email })}
              </h1>
              <p className="text-muted-foreground font-medium">
                {t('welcomeSubtitle')}
              </p>
            </div>
          </div>
          
          <Button variant="outline" onClick={handleSignOut} className="font-semibold">
            {t('signOut')}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 hover:shadow-lg transition-all duration-200 hover:border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {t('stats.enrolledCourses')}
              </CardTitle>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{courses.length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:shadow-lg transition-all duration-200 hover:border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {t('stats.completedCourses')}
              </CardTitle>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{completedCourses.length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:shadow-lg transition-all duration-200 hover:border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {t('stats.inProgress')}
              </CardTitle>
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{inProgressCourses.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 h-12">
            <TabsTrigger value="courses" className="font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground">
              {t('tabs.myCourses')}
            </TabsTrigger>
            <TabsTrigger value="certificates" className="font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground">
              {t('tabs.certificates')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-6">
            {courses.length === 0 ? (
              <Card className="border-2">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="bg-muted/50 rounded-full p-6 w-24 h-24 flex items-center justify-center mb-6">
                    <BookOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
                    {t('emptyState.noCourses')}
                  </h3>
                  <p className="text-muted-foreground text-center mb-6 max-w-md text-lg">
                    {t('emptyState.exploreMessage')}
                  </p>
                  <Button asChild size="lg" className="font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
                    <Link href={`/${locale}/catalog`}>
                      {t('emptyState.browseButton')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="border-2 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-bold text-foreground line-clamp-2">{course.name}</CardTitle>
                      <CardDescription className="text-muted-foreground font-medium">
                        {course.slides_count} {t('course.lessons')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-muted-foreground">{t('course.progress')}</span>
                          <span className="text-foreground font-semibold">{Math.round(course.completion)}%</span>
                        </div>
                        <Progress value={course.completion} className="w-full h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <Badge 
                          variant={course.completion >= 100 ? "default" : course.completion > 0 ? "secondary" : "outline"}
                          className="font-semibold"
                        >
                          {course.completion >= 100 
                            ? t('course.completed')
                            : course.completion > 0 
                            ? t('course.inProgress')
                            : t('course.notStarted')
                          }
                        </Badge>
                        
                        <Button size="sm" asChild className="font-semibold">
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
              <Card className="border-2">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="bg-muted/50 rounded-full p-6 w-24 h-24 flex items-center justify-center mb-6">
                    <Award className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
                    {t('certificates.noCertificates')}
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md text-lg">
                    {t('certificates.completeMessage')}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedCourses.map((course) => (
                  <Card key={course.id} className="border-2 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center text-xl font-bold text-foreground">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg mr-3">
                          <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        {course.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground font-medium ml-14">
                        {t('certificates.certificateOfCompletion')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="ml-14">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-semibold">
                          {t('certificates.completed')}
                        </Badge>
                        <Button size="sm" variant="outline" className="font-semibold">
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