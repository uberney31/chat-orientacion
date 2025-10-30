# 🎓 Chat Orientación Profesional

Sistema de orientación profesional con Inteligencia Artificial que ayuda a estudiantes a descubrir su carrera ideal mediante conversaciones guiadas.

## 🌟 Características

- **Chat con IA**: Agente conversacional impulsado por GPT-4o
- **Autenticación**: Login con Email/Password y Google OAuth
- **Gestión de CV**: Crear y editar hoja de vida con sincronización en la nube
- **Diseño Moderno**: UI responsive con glassmorphism y animaciones
- **Experiencia Laboral**: Registro de trabajos y experiencia

## 🛠️ Tecnologías

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Firebase** - Autenticación y base de datos
- **Zustand** - Gestión de estado

### Backend
- **Python 3.12** - Lenguaje principal
- **Google ADK** - Framework de agentes IA
- **GPT-4o** - Modelo de lenguaje
- **FastAPI** - Framework web

## 🚀 Despliegue

### Frontend
Desplegado en Vercel: [URL se actualizará después del despliegue]

### Backend
Desplegado en Railway: [URL se actualizará después del despliegue]

## 📋 Requisitos Locales

### Frontend
```bash
cd front
npm install
npm run dev
```

### Backend
```bash
python -m venv env
env\Scripts\activate  # Windows
source env/bin/activate  # Mac/Linux
pip install -r requirements.txt
adk web --port 8000 --allow_origins="http://localhost:3000" .
```

## 🔑 Variables de Entorno

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=orientational_agent
```

### Backend (.env)
```
OPENAI_API_KEY=tu-api-key-aqui
FRONTEND_URL=http://localhost:3000
```

## 👤 Autor

Desarrollado como proyecto estudiantil

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

