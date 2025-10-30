'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <button
        onClick={() => router.push('/login')}
        className={cn(
          "fixed top-4 right-4 z-40",
          "px-4 py-2 rounded-xl",
          "bg-gradient-to-r from-blue-500 to-indigo-600",
          "hover:from-blue-600 hover:to-indigo-700",
          "text-white font-medium",
          "shadow-lg hover:shadow-xl",
          "transform hover:scale-105",
          "transition-all duration-200"
        )}
      >
        Iniciar Sesión
      </button>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="fixed top-4 right-4 z-40 glass rounded-xl p-2 shadow-lg flex items-center gap-2 animate-fade-in">
      {/* Avatar */}
      <div className="flex items-center gap-2 px-2">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'Usuario'}
            className="w-8 h-8 rounded-full ring-2 ring-blue-500"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user.displayName || 'Usuario'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>

      {/* Botón de logout */}
      <button
        onClick={handleLogout}
        className={cn(
          "px-3 py-2 rounded-lg",
          "bg-red-500 hover:bg-red-600",
          "text-white text-sm font-medium",
          "flex items-center gap-2",
          "transform hover:scale-105",
          "transition-all duration-200",
          "shadow-md hover:shadow-lg"
        )}
        title="Cerrar sesión"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">Salir</span>
      </button>
    </div>
  );
}

