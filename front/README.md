# 🎓 Chat Orientación Profesional - Frontend

Sistema de orientación profesional con IA. Frontend construido con Next.js 15, TypeScript, Tailwind CSS, Firebase y Zustand.

## Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar backend
En otra terminal:
```bash
cd ..
adk web --port 8000 --allow_origins="http://localhost:3000" .
```

### 4. Iniciar frontend
```bash
npm run dev
```

### 5. Abrir navegador
```
http://localhost:3000
```

---

## Características

###  **Autenticación Firebase**
- Login con Email/Password
- Login con Google OAuth
- Registro de usuarios
- Protección automática de rutas
- UserMenu con avatar y logout

###  **Chat Flotante**
- Botón FAB siempre visible
- Streaming en tiempo real (SSE)
- Historial de mensajes
- Conectado al backend Google ADK
- Usa Firebase UID como identificador

###  **Páginas**
- `/` - Inicio con navegación
- `/login` - Login animado con glassmorphism
- `/cv` - Hoja de vida (mockup)
- `/jobs` - Experiencia laboral (mockup)

###  **Diseño**
- Mobile-first responsive
- Glassmorphism effects
- Animaciones suaves
- Dark mode ready
- Accesibilidad WCAG AA

---

##  Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| Framework | Next.js 15 |
| Lenguaje | TypeScript 5.7 |
| UI | React 19 |
| Estilos | Tailwind CSS 3.4 |
| Estado | Zustand 5.0 |
| Auth | Firebase 11.1 |
| Iconos | Lucide React |
| Backend | Google ADK + GPT-4o |

---

##  Estructura

```
front/
├── app/              # Páginas (App Router)
├── components/       # Componentes React
├── lib/             # Utilidades y APIs
├── hooks/           # Custom hooks
├── store/           # Estado global (Zustand)
└── middleware.ts    # Middleware de Next.js
```

---

## 🔌 Backend

El frontend se conecta a un backend Google ADK con GPT-4o.

**Endpoints:**
- `POST /apps/{app}/users/{user}/sessions` - Crear sesión
- `POST /run_sse` - Enviar mensaje (streaming)

**Iniciar backend:**
```bash
adk web --port 8000 --allow_origins="http://localhost:3000" .
```

---

## 🔑 Firebase Setup

### 1. Crear proyecto en Firebase Console
https://console.firebase.google.com/

### 2. Habilitar Authentication
- Email/Password ✅
- Google OAuth ✅

### 3. Obtener credenciales
Settings → Project settings → Your apps → Web app

### 4. Copiar a `front/lib/firebase.ts`

---

## 📝 Scripts

```bash
npm run dev         # Desarrollo (puerto 3000)
npm run build       # Build para producción
npm run start       # Servidor de producción
npm run lint        # Linting con ESLint
npm run type-check  # Verificar tipos TypeScript
```

---

##  Flujo de Usuario

```
1. Usuario visita http://localhost:3000
2. AuthGuard redirige a /login (si no está autenticado)
3. Login con Email/Password o Google
4. Redirect automático a /
5. Acceso a todas las páginas
6. Chat disponible globalmente
7. Logout → volver a /login
```

---

## 🐛 Solución de Problemas

### Chat no conecta
- Verificar que backend esté en puerto 8000

### Login no funciona
- Habilitar Email/Password y Google en Firebase Console
- Verificar credenciales en `.env.local`

### Error al compilar
```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📦 Instalación desde Cero

```bash
# 1. Clonar o descargar el proyecto
cd front

# 2. Instalar dependencias
npm install

# 3. Iniciar
npm run dev
```

## 🔒 Seguridad

- ✅ Autenticación con Firebase
- ✅ Tokens JWT automáticos
- ✅ Rutas protegidas con AuthGuard
- ✅ Variables sensibles en .env.local
- ✅ .env.local en .gitignore

---

## 📚 Más Información

- **REQUIREMENTS.md** - Este archivo (dependencias detalladas)
- **Firebase Docs**: https://firebase.google.com/docs/auth
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

---


**Desarrollado con ❤️ usando Next.js 15, Firebase y Google ADK**
