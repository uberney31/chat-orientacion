# 📝 Guía de Uso del CV Funcional

## ✨ Funcionalidades Implementadas

### 🎯 **Modo de Edición**
- **Activar/Desactivar**: Haz clic en el botón "Modo Edición" en la esquina superior derecha
- Cuando está activo:
  - Aparecen botones de editar (✏️) en cada sección
  - Aparecen botones de eliminar (🗑️) en educación y habilidades
  - Aparecen botones de agregar (+) para nuevos elementos

---

## 📋 **Secciones Editables**

### 1. **Información Personal**
- **Editar**: Clic en el ícono ✏️ en la tarjeta
- **Campos**:
  - Nombre completo
  - Título profesional
  - Email
  - Teléfono
  - Ubicación
  - URL de foto (opcional)
- **Guardado**: Automático en Firestore al hacer clic en "Guardar"

### 2. **Resumen Profesional**
- **Editar**: Clic en el ícono ✏️ en la tarjeta de resumen
- **Campo**: Área de texto grande para tu descripción profesional
- **Guardado**: Automático en Firestore

### 3. **Educación**
- **Agregar**: Clic en "+ Agregar educación"
- **Campos**:
  - Título o Grado (Ej: Bachiller, Licenciatura)
  - Institución
  - Año o Período (Ej: 2020-2024)
  - Descripción
- **Eliminar**: Hover sobre un elemento → Clic en 🗑️
- **Guardado**: Cada cambio se guarda en Firestore

### 4. **Habilidades**
- **Agregar**: Clic en "+ Agregar habilidad"
- **Campos**:
  - Nombre de la habilidad
  - Nivel de dominio (0-100% con slider visual)
- **Eliminar**: Hover sobre una habilidad → Clic en 🗑️
- **Guardado**: Automático en Firestore

---

## 🔄 **Flujo de Trabajo**

### **Primera Vez**
1. Inicia sesión en la aplicación
2. Ve a la sección "Mi CV"
3. El sistema crea automáticamente un CV con tus datos de Firebase
4. Activa el "Modo Edición"
5. Completa tu información

### **Edición de Información**
1. Activa "Modo Edición"
2. Haz clic en el botón de editar (✏️) de la sección que deseas modificar
3. Se abre un modal con un formulario
4. Edita los campos necesarios
5. Haz clic en "Guardar"
6. El modal se cierra y los cambios se reflejan inmediatamente

### **Agregar Educación o Habilidades**
1. Activa "Modo Edición"
2. Haz clic en "+ Agregar educación" o "+ Agregar habilidad"
3. Completa el formulario en el modal
4. Haz clic en "Guardar" o "Agregar"
5. El nuevo elemento aparece en la lista

### **Eliminar Elementos**
1. Activa "Modo Edición"
2. Pasa el cursor sobre el elemento que deseas eliminar
3. Aparece el botón 🗑️
4. Haz clic para eliminar
5. Se borra de Firestore y desaparece de la vista

---

## 💾 **Almacenamiento**

Toda la información se guarda en **Firebase Firestore** con la siguiente estructura:

```
users/
  └── {tu-user-id}/
      └── cv/
          └── data/
              ├── personalInfo: {...}
              ├── summary: "..."
              ├── education: [...]
              ├── skills: [...]
              └── lastUpdated: timestamp
```

---

## ⌨️ **Atajos de Teclado**

- **ESC**: Cerrar cualquier modal abierto
- **Tab**: Navegar entre campos del formulario
- **Enter**: Enviar formulario (cuando está enfocado en un campo)

---

## 🎨 **Características de UI/UX**

### **Modales**
- Fondo con blur para mejor enfoque
- Cierre con ESC o clic fuera del modal
- Animaciones suaves de entrada
- Scroll automático si el contenido es largo

### **Formularios**
- Validación en tiempo real
- Campos requeridos marcados con *
- Estados de carga con spinner
- Mensajes de error claros
- Botones deshabilitados durante el guardado

### **Indicadores Visuales**
- Nivel de habilidades con barra de progreso animada
- Slider interactivo para seleccionar nivel
- Referencias visuales (Básico → Experto)
- Contador de caracteres en el resumen

### **Modo Edición**
- Botón activo cambia de color (azul)
- Botones de editar/eliminar aparecen suavemente
- Hover effects en todos los elementos interactivos

---

## 🔒 **Seguridad**

- Solo el usuario autenticado puede ver y editar su CV
- Los datos están protegidos por Firebase Auth
- Cada usuario solo puede acceder a sus propios datos
- Reglas de Firestore verifican la autenticación

---

## 🐛 **Solución de Problemas**

### **El CV no carga**
- Verifica que estés autenticado
- Revisa la consola del navegador por errores
- Asegúrate de tener conexión a internet

### **Los cambios no se guardan**
- Verifica que Firebase esté configurado correctamente
- Revisa las reglas de Firestore
- Mira la consola para errores de permisos

### **El modal no se cierra**
- Presiona ESC
- Haz clic fuera del modal
- Recarga la página si es necesario

---

## 📱 **Responsive**

El CV es completamente responsive:
- **Desktop**: Vista de dos columnas en información personal
- **Tablet**: Diseño adaptable
- **Mobile**: Vista apilada vertical optimizada para pantallas pequeñas

---

## 🎯 **Próximas Mejoras Posibles**

- [ ] Subida de foto de perfil desde el dispositivo
- [ ] Exportación del CV a PDF
- [ ] Templates de CV prediseñados
- [ ] Vista previa antes de guardar
- [ ] Historial de cambios
- [ ] Compartir CV con URL pública
- [ ] Sugerencias de IA para mejorar el CV
- [ ] Análisis de compatibilidad con ofertas laborales

---

**¡Disfruta creando tu CV profesional! 🚀**

