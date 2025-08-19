import { LoginForm } from '@/components/auth/LoginForm';
import { UserMenu } from '@/components/auth/UserMenu';

export default function AuthTestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Prueba de Autenticación</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Componente UserMenu</h2>
          <div className="border p-4 rounded">
            <UserMenu />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Formulario de Login</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}