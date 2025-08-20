"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useNewAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/ui/loader";
import { User, Mail, Calendar, Shield, Edit2, Save, X, Camera, Phone, Globe, Briefcase, Languages, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  mobile?: string;
  website?: string;
  title?: string;
  function?: string;
  street?: string;
  city?: string;
  country_id?: [number, string];
  image_1920?: string;
  create_date?: string;
  timezone?: string;
}
export default function ProfilePage() {
  const { isAuthenticated, loading: authLoading, user } = useNewAuth();
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    mobile: '', 
    website: '', 
    title: '', 
    function: '', 
    street: '', 
    city: '' 
  });
  const [avatarUploading, setAvatarUploading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const tLoader = useTranslations('loader');
  const isSpanish = locale === 'es';
  const fetchUserProfile = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch('/api/odoo/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data.profile);
        setEditForm({ 
          name: data.profile.name, 
          email: data.profile.email,
          phone: data.profile.phone || '',
          mobile: data.profile.mobile || '',
          website: data.profile.website || '',
          title: data.profile.title || '',
          function: data.profile.function || '',
          street: data.profile.street || '',
          city: data.profile.city || ''
        });
      } else {
        // If profile not found, create a fallback profile from user data
        if (res.status === 404 && user) {
          const fallbackProfile = {
            id: user.odooUserId || user.uid,
            name: user.name || user.login,
            email: user.login,
            phone: '',
            create_date: new Date().toISOString()
          };
          setProfile(fallbackProfile);
          setEditForm({ 
            name: fallbackProfile.name, 
            email: fallbackProfile.email,
            phone: '',
            mobile: '',
            website: '',
            title: '',
            function: '',
            street: '',
            city: ''
          });
        } else {
          setError(`Error ${res.status}: ${res.statusText}`);
        }
      }
    } catch (error: any) {
      setError(error.message || 'Network error');
      // Create fallback profile if we have user data
      if (user) {
        const fallbackProfile = {
          id: user.odooUserId || user.uid,
          name: user.name || user.login,
          email: user.login,
          phone: '',
          create_date: new Date().toISOString()
        };
        setProfile(fallbackProfile);
        setEditForm({ 
          name: fallbackProfile.name, 
          email: fallbackProfile.email,
          phone: '',
          mobile: '',
          website: '',
          title: '',
          function: '',
          street: '',
          city: ''
        });
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/${locale}/login`);
      return;
    }
    if (isAuthenticated && user?.odooUserId) {
      fetchUserProfile();
    }
  }, [isAuthenticated, authLoading, user, router, locale, fetchUserProfile]);
  const handleEditToggle = () => {
    if (editing) {
      // Cancel editing
      setEditForm({ 
        name: profile?.name || '', 
        email: profile?.email || '',
        phone: profile?.phone || '',
        mobile: profile?.mobile || '',
        website: profile?.website || '',
        title: profile?.title || '',
        function: profile?.function || '',
        street: profile?.street || '',
        city: profile?.city || ''
      });
    }
    setEditing(!editing);
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(isSpanish ? 'Por favor selecciona una imagen válida' : 'Please select a valid image');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error(isSpanish ? 'La imagen es muy grande. Máximo 2MB' : 'Image is too large. Maximum 2MB');
      return;
    }

    setAvatarUploading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1]; // Remove data:image/...;base64, prefix

        const res = await fetch('/api/odoo/profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatarBase64: base64Data })
        });

        if (res.ok) {
          const data = await res.json();
          setProfile(data.profile);
          toast.success(
            isSpanish ? 'Avatar actualizado correctamente' : 'Avatar updated successfully',
            {
              description: isSpanish ? 'Tu imagen de perfil se ha guardado exitosamente' : 'Your profile picture has been saved successfully'
            }
          );
        } else {
          toast.error(
            isSpanish ? 'Error al actualizar el avatar' : 'Error updating avatar',
            {
              description: isSpanish ? 'Por favor intenta de nuevo o contacta soporte' : 'Please try again or contact support'
            }
          );
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error(isSpanish ? 'Error al subir la imagen' : 'Error uploading image');
    } finally {
      setAvatarUploading(false);
    }
  };
  const handleSaveProfile = async () => {
    try {
      
      const res = await fetch('/api/odoo/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      
      
      if (res.ok) {
        const data = await res.json();
        setProfile(data.profile);
        setEditing(false);
        toast.success(
          isSpanish ? 'Perfil actualizado correctamente' : 'Profile updated successfully',
          {
            description: isSpanish ? 'Tus datos personales se han guardado exitosamente' : 'Your personal information has been saved successfully'
          }
        );
      } else {
        toast.error(isSpanish ? `Error al actualizar el perfil: ${res.status}` : `Error updating profile: ${res.status}`);
      }
    } catch (error) {
      toast.error(isSpanish ? 'Error de conexión al guardar los cambios' : 'Connection error saving changes');
    }
  };
  if (authLoading || loading) {
    return (
      <Loader 
        message={tLoader('pages.profile')} 
        fullScreen 
        size="lg"
        showMotivationalMessages 
      />
    );
  }
  if (!isAuthenticated || !user || !profile) {
    return null;
  }
  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-gradient"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 animate-fade-in">
          <div className="mb-6 md:mb-0">
            <h1 className="h1-hero bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {isSpanish ? 'Mi Perfil' : 'My Profile'}
            </h1>
            <p className="p-lead mt-2">
              {isSpanish ? 'Gestiona tu información personal y preferencias' : 'Manage your personal information and preferences'}
            </p>
          </div>
          <Button asChild variant="outline" className="glass border-primary/20 backdrop-blur-sm hover:bg-primary/10 transition-all duration-300">
            <Link href={`/${locale}/dashboard`}>
              {isSpanish ? 'Volver al Dashboard' : 'Back to Dashboard'}
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-in-left">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="glass border-primary/10 backdrop-blur-md hover-lift transition-all duration-300 animate-scale-in">
              <CardHeader className="text-center relative">
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-t-lg"></div>
                
                <div className="relative mx-auto mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full p-1 animate-glow">
                      <div className="bg-background rounded-full p-1">
                        <UserAvatar 
                          name={profile.name}
                          email={profile.email}
                          image={profile.image_1920}
                          size="xl"
                        />
                      </div>
                    </div>
                    <UserAvatar 
                      name={profile.name}
                      email={profile.email}
                      image={profile.image_1920}
                      size="xl"
                    />
                  </div>
                  
                  <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2">
                    <Button size="sm" className="rounded-full h-10 w-10 p-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-accent" disabled={avatarUploading} asChild>
                      <span>
                        {avatarUploading ? (
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <Camera className="h-4 w-4 text-white" />
                        )}
                      </span>
                    </Button>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    disabled={avatarUploading}
                  />
                </div>
                
                <CardTitle className="h3-title gradient-text">{profile.name}</CardTitle>
                <CardDescription className="text-muted-foreground/80">{profile.email}</CardDescription>
                
                <Badge variant="secondary" className="w-fit mx-auto mt-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 text-primary font-medium px-4 py-1">
                  {isSpanish ? 'Estudiante Activo' : 'Active Student'}
                </Badge>
              </CardHeader>
              
              <CardContent className="text-center space-y-4 relative">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    {isSpanish ? 'Miembro desde ' : 'Member since '}
                    {profile.create_date ? new Date(profile.create_date).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-3 border border-primary/10">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-xs text-muted-foreground">{isSpanish ? 'Cursos' : 'Courses'}</div>
                  </div>
                  <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg p-3 border border-accent/10">
                    <div className="text-2xl font-bold text-accent">85%</div>
                    <div className="text-xs text-muted-foreground">{isSpanish ? 'Progreso' : 'Progress'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Profile Information */}
          <div className="lg:col-span-2 animate-slide-in-right">
            <Tabs defaultValue="info" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 glass border-primary/10 backdrop-blur-md">
                <TabsTrigger value="info" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white transition-all duration-300">
                  <User className="h-4 w-4 mr-2" />
                  {isSpanish ? 'Información' : 'Information'}
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white transition-all duration-300">
                  <Shield className="h-4 w-4 mr-2" />
                  {isSpanish ? 'Seguridad' : 'Security'}
                </TabsTrigger>
                <TabsTrigger value="preferences" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white transition-all duration-300">
                  <User className="h-4 w-4 mr-2" />
                  {isSpanish ? 'Preferencias' : 'Preferences'}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-8 animate-fade-in">
                <Card className="glass border-primary/10 backdrop-blur-md hover-lift transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-lg"></div>
                    <div className="relative">
                      <CardTitle className="h3-title text-foreground flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        {isSpanish ? 'Información Personal' : 'Personal Information'}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground/80 mt-1">
                        {isSpanish ? 'Actualiza tu información personal y mantén tu perfil actualizado' : 'Update your personal information and keep your profile current'}
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleEditToggle}
                      className="glass border-primary/20 hover:bg-primary/10 transition-all duration-300 relative"
                    >
                      {editing ? (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          {isSpanish ? 'Cancelar' : 'Cancel'}
                        </>
                      ) : (
                        <>
                          <Edit2 className="h-4 w-4 mr-2" />
                          {isSpanish ? 'Editar' : 'Edit'}
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {isSpanish ? 'Nombre Completo' : 'Full Name'}
                        </Label>
                        {editing ? (
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                            className="glass border-primary/20 backdrop-blur-sm focus:border-primary/40 transition-all duration-300"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gradient-to-r from-muted/30 to-muted/20 border-muted/40 hover:border-primary/20 transition-all duration-300">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium text-foreground">{profile.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {isSpanish ? 'Correo Electrónico' : 'Email Address'}
                        </Label>
                        {editing ? (
                          <Input
                            id="email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                            className="glass border-primary/20 backdrop-blur-sm focus:border-primary/40 transition-all duration-300"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gradient-to-r from-muted/30 to-muted/20 border-muted/40 hover:border-primary/20 transition-all duration-300">
                            <div className="p-2 bg-accent/10 rounded-full">
                              <Mail className="h-4 w-4 text-accent" />
                            </div>
                            <span className="font-medium text-foreground">{profile.email}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {isSpanish ? 'Teléfono' : 'Phone'}
                        </Label>
                        {editing ? (
                          <Input
                            id="phone"
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder={isSpanish ? 'Opcional' : 'Optional'}
                            className="glass border-primary/20 backdrop-blur-sm focus:border-primary/40 transition-all duration-300"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gradient-to-r from-muted/30 to-muted/20 border-muted/40 hover:border-primary/20 transition-all duration-300">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <Phone className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium text-foreground">{profile.phone || (isSpanish ? 'No especificado' : 'Not specified')}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile">
                          {isSpanish ? 'Móvil' : 'Mobile'}
                        </Label>
                        {editing ? (
                          <Input
                            id="mobile"
                            type="tel"
                            value={editForm.mobile}
                            onChange={(e) => setEditForm(prev => ({ ...prev, mobile: e.target.value }))}
                            placeholder={isSpanish ? 'Opcional' : 'Optional'}
                            className="glass border-primary/20 backdrop-blur-sm focus:border-primary/40 transition-all duration-300"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gradient-to-r from-muted/30 to-muted/20 border-muted/40 hover:border-primary/20 transition-all duration-300">
                            <div className="p-2 bg-accent/10 rounded-full">
                              <Phone className="h-4 w-4 text-accent" />
                            </div>
                            <span className="font-medium text-foreground">{profile.mobile || (isSpanish ? 'No especificado' : 'Not specified')}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">
                          {isSpanish ? 'Título/Cargo' : 'Title/Position'}
                        </Label>
                        {editing ? (
                          <Input
                            id="title"
                            value={editForm.title}
                            onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder={isSpanish ? 'Ej: Ingeniero, Estudiante' : 'Ex: Engineer, Student'}
                            className="glass border-primary/20 backdrop-blur-sm focus:border-primary/40 transition-all duration-300"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gradient-to-r from-muted/30 to-muted/20 border-muted/40 hover:border-primary/20 transition-all duration-300">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <Briefcase className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium text-foreground">{profile.title || (isSpanish ? 'No especificado' : 'Not specified')}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">
                          {isSpanish ? 'Sitio Web' : 'Website'}
                        </Label>
                        {editing ? (
                          <Input
                            id="website"
                            type="url"
                            value={editForm.website}
                            onChange={(e) => setEditForm(prev => ({ ...prev, website: e.target.value }))}
                            placeholder={isSpanish ? 'https://tusitio.com' : 'https://yoursite.com'}
                            className="glass border-primary/20 backdrop-blur-sm focus:border-primary/40 transition-all duration-300"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gradient-to-r from-muted/30 to-muted/20 border-muted/40 hover:border-primary/20 transition-all duration-300">
                            <div className="p-2 bg-accent/10 rounded-full">
                              <Globe className="h-4 w-4 text-accent" />
                            </div>
                            <span className="font-medium text-foreground">{profile.website || (isSpanish ? 'No especificado' : 'Not specified')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {editing && (
                      <div className="flex space-x-3 pt-6 animate-fade-in">
                        <Button 
                          onClick={handleSaveProfile}
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {isSpanish ? 'Guardar Cambios' : 'Save Changes'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleEditToggle}
                          className="glass border-muted/40 hover:bg-muted/20 transition-all duration-300"
                        >
                          <X className="h-4 w-4 mr-2" />
                          {isSpanish ? 'Cancelar' : 'Cancel'}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="security" className="space-y-8 animate-fade-in">
                <Card className="glass border-primary/10 backdrop-blur-md hover-lift transition-all duration-300">
                  <CardHeader className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-lg"></div>
                    <CardTitle className="h3-title text-foreground flex items-center gap-2 relative">
                      <Shield className="h-5 w-5 text-primary" />
                      {isSpanish ? 'Configuración de Seguridad' : 'Security Settings'}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground/80 mt-1 relative">
                      {isSpanish ? 'Gestiona tu contraseña y configuraciones de seguridad' : 'Manage your password and security settings'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-6 border rounded-xl bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200/50 dark:border-green-800/50 hover:border-green-300/50 dark:hover:border-green-700/50 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{isSpanish ? 'Contraseña' : 'Password'}</p>
                          <p className="text-sm text-muted-foreground/80">
                            {isSpanish ? 'Última actualización hace 30 días' : 'Last updated 30 days ago'}
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                            {isSpanish ? '🔒 Segura' : '🔒 Secure'}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline"
                        className="glass border-green-200/50 hover:bg-green-50/50 dark:border-green-800/50 dark:hover:bg-green-950/30 transition-all duration-300"
                      >
                        {isSpanish ? 'Cambiar' : 'Change'}
                      </Button>
                    </div>
                    
                    {/* Additional Security Features */}
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-lg bg-gradient-to-r from-muted/20 to-muted/10 border-muted/40 hover:border-primary/20 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <Shield className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{isSpanish ? 'Autenticación de dos factores' : 'Two-factor authentication'}</p>
                              <p className="text-sm text-muted-foreground">{isSpanish ? 'Próximamente disponible' : 'Coming soon'}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">{isSpanish ? 'Próximamente' : 'Soon'}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="preferences" className="space-y-8 animate-fade-in">
                <Card className="glass border-primary/10 backdrop-blur-md hover-lift transition-all duration-300">
                  <CardHeader className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-lg"></div>
                    <CardTitle className="h3-title text-foreground flex items-center gap-2 relative">
                      <User className="h-5 w-5 text-primary" />
                      {isSpanish ? 'Preferencias' : 'Preferences'}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground/80 mt-1 relative">
                      {isSpanish ? 'Personaliza tu experiencia de aprendizaje y configura tus preferencias' : 'Customize your learning experience and configure your preferences'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-6 border rounded-xl bg-gradient-to-r from-muted/20 to-muted/10 border-muted/40 hover:border-primary/20 transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <Languages className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{isSpanish ? 'Idioma' : 'Language'}</p>
                            <p className="text-sm text-muted-foreground/80">
                              {isSpanish ? 'Español (España)' : 'English (US)'}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          className="glass border-primary/20 hover:bg-primary/10 transition-all duration-300"
                        >
                          {isSpanish ? 'Cambiar' : 'Change'}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-6 border rounded-xl bg-gradient-to-r from-muted/20 to-muted/10 border-muted/40 hover:border-primary/20 transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-accent/10 rounded-full">
                            {theme === 'dark' ? <Moon className="h-6 w-6 text-accent" /> : <Sun className="h-6 w-6 text-accent" />}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{isSpanish ? 'Tema' : 'Theme'}</p>
                            <p className="text-sm text-muted-foreground/80">
                              {theme === 'dark' ? (isSpanish ? 'Modo oscuro' : 'Dark mode') : (isSpanish ? 'Modo claro' : 'Light mode')}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                          className="glass border-accent/20 hover:bg-accent/10 transition-all duration-300"
                        >
                          {isSpanish ? 'Cambiar' : 'Toggle'}
                        </Button>
                      </div>
                      
                      <div className="p-6 border rounded-xl bg-gradient-to-r from-muted/20 to-muted/10 border-muted/40">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <Mail className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{isSpanish ? 'Notificaciones por email' : 'Email notifications'}</p>
                            <p className="text-sm text-muted-foreground/80">
                              {isSpanish ? 'Recibe actualizaciones sobre cursos y novedades' : 'Receive updates about courses and news'}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span className="text-sm">{isSpanish ? 'Nuevos cursos disponibles' : 'New courses available'}</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span className="text-sm">{isSpanish ? 'Actualizaciones de progreso' : 'Progress updates'}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
