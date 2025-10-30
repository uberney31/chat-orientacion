# 🚀 Guía de Despliegue

## 📦 URLs del Proyecto en Producción

- **Frontend (Vercel)**: [Se actualizará después del despliegue]
- **Backend (Railway)**: [Se actualizará después del despliegue]
- **Repositorio GitHub**: https://github.com/uberney31/chat-orientacion

---

## 👥 Credenciales de Prueba

Para que el profesor pueda probar el sistema:

**Opción 1 - Email/Password:**
- Email: `demo@test.com`
- Password: `Demo123456`

**Opción 2 - Google OAuth:**
- Puede iniciar sesión con cualquier cuenta de Google

---

## 🏗️ Arquitectura

```
┌─────────────────┐
│   Usuario       │
└────────┬────────┘
         │
         ↓
┌─────────────────┐      ┌──────────────────┐
│  Vercel         │      │  Firebase        │
│  (Frontend)     │←────→│  - Auth          │
│  Next.js 15     │      │  - Firestore     │
└────────┬────────┘      └──────────────────┘
         │
         ↓
┌─────────────────┐      ┌──────────────────┐
│  Railway        │      │  OpenAI          │
│  (Backend)      │─────→│  GPT-4o          │
│  Python + ADK   │      │                  │
└─────────────────┘      └──────────────────┘
```

---

## ✨ Funcionalidades Implementadas

### 🔐 Autenticación
- [x] Login con Email y Password
- [x] Login con Google OAuth
- [x] Registro de nuevos usuarios
- [x] Cierre de sesión
- [x] Protección de rutas privadas

### 💬 Chat con IA
- [x] Agente orientador profesional
- [x] Streaming en tiempo real
- [x] Historial de conversaciones
- [x] Botón flotante (FAB) accesible desde todas las páginas
- [x] Diseño responsive mobile-first

### 📄 Gestión de CV
- [x] Editor de información personal
- [x] Gestión de educación
- [x] Gestión de habilidades
- [x] Resumen profesional
- [x] Guardado en Firestore (sincronización cloud)
- [x] Respaldo en localStorage

### 💼 Experiencia Laboral
- [x] Tabla de trabajos
- [x] CRUD de experiencia laboral
- [x] Diseño profesional

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 15.1.4 | Framework React |
| TypeScript | 5.7.2 | Tipado estático |
| React | 19.0.0 | Librería UI |
| Tailwind CSS | 3.4.17 | Estilos |
| Firebase | 12.4.0 | Auth + Firestore |
| Zustand | 5.0.2 | Estado global |
| Lucide React | 0.460.0 | Iconos |

### Backend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Python | 3.12 | Lenguaje |
| Google ADK | 1.14.1 | Framework de agentes |
| LiteLLM | 1.77.1 | Abstracción de LLMs |
| OpenAI | 1.108.0 | Cliente GPT-4o |
| FastAPI | 0.116.2 | API REST |
| Uvicorn | 0.35.0 | Servidor ASGI |

---

## 📊 Estructura del Proyecto

```
chat-orientacion/
├── front/                    # Frontend Next.js
│   ├── app/                 # Páginas (App Router)
│   │   ├── page.tsx        # Inicio
│   │   ├── login/          # Autenticación
│   │   ├── cv/             # Hoja de vida
│   │   └── jobs/           # Experiencia laboral
│   ├── components/          # Componentes React
│   │   ├── auth/           # Autenticación
│   │   ├── chat/           # Chat con IA
│   │   ├── resume/         # Gestión de CV
│   │   └── layout/         # Layout general
│   ├── lib/                # Utilidades
│   │   ├── firebase.ts     # Config Firebase
│   │   ├── chatApi.ts      # API del chat
│   │   └── utils.ts        # Helpers
│   ├── hooks/              # Custom hooks
│   ├── store/              # Estado Zustand
│   └── types/              # Tipos TypeScript
│
├── orientational_agent/     # Backend Python
│   ├── __init__.py
│   └── agent.py            # Definición del agente
│
├── requirements.txt         # Dependencias Python
├── Procfile                # Config Railway
└── README.md               # Documentación
```

---

## 🔧 Configuración de Despliegue

### Variables de Entorno - Frontend (Vercel)

```bash
NEXT_PUBLIC_API_URL=https://tu-backend.railway.app
NEXT_PUBLIC_APP_NAME=orientational_agent
```

### Variables de Entorno - Backend (Railway)

```bash
OPENAI_API_KEY=sk-tu-openai-api-key
FRONTEND_URL=https://tu-frontend.vercel.app
PORT=8000
```

---

## 🎯 Flujo de Usuario

1. Usuario accede a la aplicación
2. Sistema redirige a `/login` si no está autenticado
3. Usuario se registra o inicia sesión (Email/Google)
4. Acceso completo a todas las funcionalidades:
   - Página de inicio con navegación
   - Chat flotante disponible en todas las páginas
   - Gestión de CV
   - Experiencia laboral
5. Datos sincronizados en Firebase Firestore
6. Chat conectado al backend con streaming en tiempo real

---

## 💰 Costos (Proyecto Estudiantil)

### Servicios Gratuitos
- ✅ Vercel: Hosting frontend (100 GB/mes)
- ✅ Railway: $5 crédito mensual (~500 horas)
- ✅ Firebase Auth: Ilimitado
- ✅ Firebase Firestore: 50K lecturas/día, 20K escrituras/día

### Servicio de Pago
- OpenAI API: ~$0.01 por conversación
- **Estimado mensual**: $1 - $3 (uso estudiantil ligero)

---

## 🧪 Testing

### Testing Manual
1. Registro de nuevo usuario
2. Login con credenciales existentes
3. Editar información del CV
4. Iniciar conversación con el agente
5. Verificar persistencia de datos
6. Cerrar sesión y volver a entrar

### URLs de Prueba
- Frontend: https://[tu-proyecto].vercel.app
- Backend Health: https://[tu-proyecto].railway.app

---

## 📝 Notas para el Profesor

- El proyecto está completamente funcional
- Se puede probar sin necesidad de instalación local
- Los datos se guardan en la nube (Firebase)
- El chat usa GPT-4o de OpenAI
- Diseño responsive optimizado para móviles
- Código limpio y bien documentado

---

## 🙏 Créditos

**Desarrollado por**: [Tu Nombre]  
**Curso**: [Nombre del Curso]  
**Institución**: [Tu Universidad/Institución]  
**Fecha**: Octubre 2025

---

## 📚 Enlaces Útiles

- [Documentación Next.js](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Google ADK](https://developers.google.com/adk)
- [Vercel Deploy](https://vercel.com/docs)
- [Railway Deploy](https://docs.railway.app/)

