'use client';

import { usePathname } from 'next/navigation';
import { ChatFab } from '@/components/chat/ChatFab';
import { UserMenu } from '@/components/auth/UserMenu';
import { AuthGuard } from '@/components/auth/AuthGuard';

interface LayoutClientProps {
  children: React.ReactNode;
}

/**
 * Componente cliente del layout
 * Maneja autenticación y componentes globales
 */
export function LayoutClient({ children }: LayoutClientProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  // Si es la página de login, no aplicar AuthGuard
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Para todas las demás páginas, requerir autenticación
  return (
    <AuthGuard>
      {/* Menú de usuario */}
      <UserMenu />
      
      {/* Contenido de la página */}
      {children}
      
      {/* Chat flotante global */}
      <ChatFab />
    </AuthGuard>
  );
}

