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
import { User, Mail, Calendar, Shield, Edit2, Save, X, Camera, Phone } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { toast } from 'sonner';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  image_1920?: string;
  create_date?: string;
}
export default function ProfilePage() {
  const { isAuthenticated, loading: authLoading, user } = useNewAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '' });
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
          phone: data.profile.phone || ''
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
            phone: ''
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
          phone: ''
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
        phone: profile?.phone || ''
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
          toast.success(isSpanish ? 'Avatar actualizado correctamente' : 'Avatar updated successfully');
        } else {
          toast.error(isSpanish ? 'Error al actualizar el avatar' : 'Error updating avatar');
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
        toast.success(isSpanish ? 'Perfil actualizado correctamente' : 'Profile updated successfully');
      } else {
        toast.error(isSpanish ? 'Error al actualizar el perfil' : 'Error updating profile');
      }
    } catch (error) {
      toast.error(isSpanish ? 'Error al guardar los cambios' : 'Error saving changes');
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {isSpanish ? 'Mi Perfil' : 'My Profile'}
            </h1>
            <p className="text-muted-foreground">
              {isSpanish ? 'Gestiona tu información personal' : 'Manage your personal information'}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={`/${locale}/dashboard`}>
              {isSpanish ? 'Volver al Dashboard' : 'Back to Dashboard'}
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <UserAvatar 
                    name={profile.name}
                    email={profile.email}
                    image={profile.image_1920}
                    size="xl"
                  />
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0">
                    <Button size="sm" className="rounded-full h-8 w-8 p-0" disabled={avatarUploading} asChild>
                      <span>
                        {avatarUploading ? (
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <Camera className="h-4 w-4" />
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
                <CardTitle className="text-xl">{profile.name}</CardTitle>
                <CardDescription>{profile.email}</CardDescription>
                <Badge variant="secondary" className="w-fit mx-auto mt-2">
                  {isSpanish ? 'Estudiante' : 'Student'}
                </Badge>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {isSpanish ? 'Miembro desde ' : 'Member since '}
                    {profile.create_date ? new Date(profile.create_date).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="info" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">
                  {isSpanish ? 'Información' : 'Information'}
                </TabsTrigger>
                <TabsTrigger value="security">
                  {isSpanish ? 'Seguridad' : 'Security'}
                </TabsTrigger>
                <TabsTrigger value="preferences">
                  {isSpanish ? 'Preferencias' : 'Preferences'}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{isSpanish ? 'Información Personal' : 'Personal Information'}</CardTitle>
                      <CardDescription>
                        {isSpanish ? 'Actualiza tu información personal' : 'Update your personal information'}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleEditToggle}>
                      {editing ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
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
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{profile.name}</span>
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
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{profile.email}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2 md:col-span-2">
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
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{profile.phone || (isSpanish ? 'No especificado' : 'Not specified')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {editing && (
                      <div className="flex space-x-2 pt-4">
                        <Button onClick={handleSaveProfile}>
                          <Save className="h-4 w-4 mr-2" />
                          {isSpanish ? 'Guardar' : 'Save'}
                        </Button>
                        <Button variant="outline" onClick={handleEditToggle}>
                          {isSpanish ? 'Cancelar' : 'Cancel'}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{isSpanish ? 'Configuración de Seguridad' : 'Security Settings'}</CardTitle>
                    <CardDescription>
                      {isSpanish ? 'Gestiona tu contraseña y configuraciones de seguridad' : 'Manage your password and security settings'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">{isSpanish ? 'Contraseña' : 'Password'}</p>
                          <p className="text-sm text-muted-foreground">
                            {isSpanish ? 'Última actualización hace 30 días' : 'Last updated 30 days ago'}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">
                        {isSpanish ? 'Cambiar' : 'Change'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{isSpanish ? 'Preferencias' : 'Preferences'}</CardTitle>
                    <CardDescription>
                      {isSpanish ? 'Personaliza tu experiencia de aprendizaje' : 'Customize your learning experience'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{isSpanish ? 'Idioma' : 'Language'}</p>
                        <p className="text-sm text-muted-foreground">
                          {isSpanish ? 'Español' : 'English'}
                        </p>
                      </div>
                      <Button variant="outline">
                        {isSpanish ? 'Cambiar' : 'Change'}
                      </Button>
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
