#  Requisitos y Dependencias - Chat Orientación Profesional

## 🚀Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir http://localhost:3000
```


## 📋 Dependencias de Producción

### **Framework y UI**
```json
{
  "next": "^15.1.4",              // Framework React con SSR/SSG
  "react": "^19.0.0",             // Librería UI
  "react-dom": "^19.0.0"          // React DOM renderer
}
```

### **Estado Global**
```json
{
  "zustand": "^5.0.2"             // Estado global ligero (alternativa a Redux)
}
```

### **Autenticación**
```json
{
  "firebase": "^11.1.0"           // Firebase Authentication, Firestore, Analytics
}
```

### **UI Components y Estilos**
```json
{
  "lucide-react": "^0.460.0",     // Iconos modernos y ligeros
  "clsx": "^2.1.1",               // Utility para clases condicionales
  "tailwind-merge": "^2.6.0",     // Merge inteligente de clases Tailwind
  "class-variance-authority": "^0.7.1"  // Variantes de componentes
}
```

---

## 🛠️ Dependencias de Desarrollo

### **TypeScript**
```json
{
  "@types/node": "^22.10.2",      // Tipos de Node.js
  "@types/react": "^19.0.1",      // Tipos de React
  "@types/react-dom": "^19.0.2",  // Tipos de React DOM
  "typescript": "^5.7.2"          // Compilador TypeScript
}
```

### **CSS y PostCSS**
```json
{
  "tailwindcss": "^3.4.17",       // Framework CSS utility-first
  "postcss": "^8.4.49",           // Procesador CSS
  "autoprefixer": "^10.4.20"      // Autoprefixer para compatibilidad
}
```

### **Linting**
```json
{
  "eslint": "^9.17.0",            // Linter JavaScript/TypeScript
  "eslint-config-next": "^15.1.4" // Configuración ESLint para Next.js
}

```
## 🔧 Scripts Disponibles

```json
{
  "dev": "next dev",              // Servidor de desarrollo
  "build": "next build",          // Build para producción
  "start": "next start",          // Servidor de producción
  "lint": "next lint",            // Ejecutar ESLint
  "type-check": "tsc --noEmit"    // Verificar tipos TypeScript
}
```

### Uso:
```bash
npm run dev        # Desarrollo
npm run build      # Build
npm run start      # Producción
npm run lint       # Linting
npm run type-check # Verificar tipos
```


## ⚙️ Versiones Mínimas Requeridas

| Software | Versión Mínima |
|----------|----------------|
| Node.js  | 18.17.0        |
| npm      | 9.0.0          |
| Python (backend) | 3.10.0 |

### Verificar versiones:
```bash
node --version    # >= 18.17.0
npm --version     # >= 9.0.0
python --version  # >= 3.10.0 

---

## 🏗️ Estructura del Proyecto

```
front/
├── app/                        # App Router de Next.js
│   ├── layout.tsx             # Layout raíz
│   ├── page.tsx               # Página inicio (/)
│   ├── globals.css            # Estilos globales
│   ├── login/
│   │   └── page.tsx           # Página de login (/login)
│   ├── cv/
│   │   └── page.tsx           # Página CV (/cv)
│   └── jobs/
│       └── page.tsx           # Página experiencia (/jobs)
│
├── components/                 # Componentes React
│   ├── auth/                  # Autenticación
│   │   ├── LoginForm.tsx      # Formulario login
│   │   ├── UserMenu.tsx       # Menú de usuario
│   │   ├── AuthGuard.tsx      # Protección de rutas
│   │   └── ProtectedRoute.tsx # HOC de protección
│   ├── chat/                  # Chat
│   │   ├── ChatFab.tsx        # Botón flotante
│   │   ├── ChatWindow.tsx     # Ventana chat
│   │   ├── MessageBubble.tsx  # Burbujas de mensaje
│   │   └── ChatInput.tsx      # Input mensajes
│   ├── layout/                # Layout
│   │   └── LayoutClient.tsx   # Layout cliente
│   ├── resume/                # CV
│   │   └── ResumeCard.tsx     # Cards del CV
│   └── jobs/                  # Experiencia
│       └── JobsTable.tsx      # Tabla trabajos
│
├── lib/                       # Utilidades
│   ├── firebase.ts            # Config Firebase
│   ├── chatApi.ts             # Cliente API backend
│   └── utils.ts               # Helper cn()
│
├── hooks/                     # Custom hooks
│   └── useAuth.ts             # Hook autenticación
│
├── store/                     # Estado global
│   └── useChatStore.ts        # Store Zustand
│
└── middleware.ts              # Middleware Next.js
```

---

##  Servicios de Firebase Utilizados

- ✅ **Firebase Authentication** - Login con Email/Password y Google OAuth
- ✅ **Firebase Analytics** - Métricas de uso (opcional)

---

## 📡 Backend Requirements

El frontend se conecta a un backend Google ADK que debe estar corriendo en `http://localhost:8000`

### Endpoints utilizados:
- `POST /apps/{app}/users/{user}/sessions` - Crear sesión
- `POST /run_sse` - Enviar mensaje con streaming

---

## 💾 Instalación

### 1. Instalar dependencias:
```bash
cd front
npm install
```

### 2. Iniciar desarrollo:
```bash
npm run dev
```


## 🎯 Características Implementadas

### **Autenticación**
- Login con Email/Password
- Login con Google OAuth
- Registro de usuarios
- Protección de rutas
- UserMenu con logout

### **Chat**
- Chat flotante global (FAB)
- Streaming en tiempo real (SSE)
- Historial de mensajes
- Integración con Firebase UID
- Auto-scroll, loading states

### **Páginas**
- `/` - Inicio
- `/login` - Login animado
- `/cv` - Hoja de vida (mockup)
- `/jobs` - Experiencia laboral (mockup)

### **Diseño**
- Glassmorphism effects
- Animaciones suaves
- Responsive (mobile-first)
- Dark mode ready
- Accesibilidad WCAG AA

---

##  Troubleshooting

### Error: "Cannot find module 'firebase'"
```bash
npm install
```

### Error: "client-only" en login
 `login/page.tsx` tiene `'use client'`

### Backend no conecta
1. Verificar que backend esté en puerto 8000
2. Revisar `NEXT_PUBLIC_API_URL` en `.env.local`

### Login no funciona
1. Habilitar Google Sign-In en Firebase Console
2. Verificar credenciales en `.env.local`

---

## 📚 Documentación Adicional

- **README.md** - Documentación completa del proyecto
- Este archivo - Lista de dependencias

---

## 🚀 Para Producción

### Build:
```bash
npm run build
npm start
```

### Variables de entorno:
Actualizar `NEXT_PUBLIC_API_URL` con la URL de producción del backend

---

**Total de paquetes: 471**  
**Última actualización: Octubre 2025**  
**Versión: 0.1.0**
