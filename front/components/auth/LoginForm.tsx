'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Mail, Lock, User, Loader2, Sparkles } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = isRegister
      ? await registerWithEmail(email, password, name)
      : await loginWithEmail(email, password);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // Redirigir al home
      router.push('/');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    const result = await loginWithGoogle();
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Card principal con glassmorphism */}
      <div className="glass rounded-3xl p-8 shadow-2xl border border-white/20 backdrop-blur-xl animate-fade-in">
        {/* Header con gradiente */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {isRegister ? '¡Únete a Nosotros!' : '¡Bienvenido de Nuevo!'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isRegister 
              ? 'Crea tu cuenta para comenzar tu orientación profesional'
              : 'Inicia sesión para continuar con tu orientación'
            }
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de nombre (solo en registro) */}
          {isRegister && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-xl",
                  "bg-white/50 dark:bg-gray-800/50",
                  "border-2 border-gray-200 dark:border-gray-700",
                  "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20",
                  "transition-all duration-200",
                  "placeholder:text-gray-400",
                  "text-gray-900 dark:text-white"
                )}
              />
            </div>
          )}

          {/* Campo de email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-xl",
                "bg-white/50 dark:bg-gray-800/50",
                "border-2 border-gray-200 dark:border-gray-700",
                "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20",
                "transition-all duration-200",
                "placeholder:text-gray-400",
                "text-gray-900 dark:text-white"
              )}
              required
            />
          </div>

          {/* Campo de contraseña */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-xl",
                "bg-white/50 dark:bg-gray-800/50",
                "border-2 border-gray-200 dark:border-gray-700",
                "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20",
                "transition-all duration-200",
                "placeholder:text-gray-400",
                "text-gray-900 dark:text-white"
              )}
              required
              minLength={6}
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl animate-fade-in">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Botón de submit */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-3 px-4 rounded-xl font-semibold text-white",
              "bg-gradient-to-r from-blue-500 to-indigo-600",
              "hover:from-blue-600 hover:to-indigo-700",
              "shadow-lg hover:shadow-xl",
              "transform hover:scale-[1.02] active:scale-[0.98]",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
              "flex items-center justify-center gap-2"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Procesando...</span>
              </>
            ) : (
              <span>{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</span>
            )}
          </button>
        </form>

        {/* Divisor */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/50 dark:bg-gray-800/50 text-gray-500 rounded-full">
              O continúa con
            </span>
          </div>
        </div>

        {/* Botón de Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className={cn(
            "w-full py-3 px-4 rounded-xl font-medium",
            "bg-white dark:bg-gray-800",
            "border-2 border-gray-200 dark:border-gray-700",
            "hover:border-gray-300 dark:hover:border-gray-600",
            "hover:shadow-lg",
            "transform hover:scale-[1.02] active:scale-[0.98]",
            "transition-all duration-200",
            "flex items-center justify-center gap-3",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-gray-700 dark:text-gray-300">Google</span>
        </button>

        {/* Toggle entre login y registro */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
          >
            {isRegister
              ? '¿Ya tienes cuenta? Inicia sesión aquí'
              : '¿No tienes cuenta? Regístrate gratis'}
          </button>
        </div>
      </div>

      {/* Footer decorativo */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>Protegido por Firebase Authentication 🔒</p>
      </div>
    </div>
  );
}

