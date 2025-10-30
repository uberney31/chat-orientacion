# 🔥 Guía: Habilitar Firebase Firestore

## 📋 Situación Actual

El código está listo para usar Firestore, pero necesitas **habilitarlo en Firebase Console**. Actualmente:

- ✅ El código está configurado (sistema híbrido)
- ⚠️ Firestore no está habilitado en tu proyecto
- 💾 Funciona con localStorage mientras tanto

---

## 🚀 Pasos para Habilitar Firestore

### **Paso 1: Acceder a Firebase Console**

1. Abre tu navegador
2. Ve a: **https://console.firebase.google.com/**
3. Inicia sesión con tu cuenta de Google
4. Selecciona el proyecto **"chat-orientacion"**

---

### **Paso 2: Crear la Base de Datos Firestore**

1. En el **menú lateral izquierdo**, busca y haz clic en:
   - **"Firestore Database"** o 
   - **"Cloud Firestore"**

2. Haz clic en el botón **"Crear base de datos"** o **"Get started"**

3. **Selecciona el modo:**
   
   **Opción A: Modo de Producción (Recomendado)**
   - ✅ Más seguro
   - ✅ Necesita reglas de seguridad (las configuraré abajo)
   - Selecciona: **"Iniciar en modo de producción"**

   **Opción B: Modo de Prueba (Temporal)**
   - ⚠️ Abierto por 30 días
   - ⚠️ Menos seguro
   - Útil solo para desarrollo rápido
   - Selecciona: **"Iniciar en modo de prueba"**

4. **Selecciona la ubicación:**
   - Elige una región cercana a ti:
     - `us-east1` (Estados Unidos Este)
     - `southamerica-east1` (São Paulo - más cerca de Colombia)
     - `us-central1` (Estados Unidos Central)
   
   ⚠️ **IMPORTANTE:** No puedes cambiar la ubicación después

5. Haz clic en **"Habilitar"** o **"Enable"**

6. **Espera** de 1 a 3 minutos mientras se crea la base de datos

---

### **Paso 3: Configurar Reglas de Seguridad**

Una vez que la base de datos esté creada:

1. En Firestore Database, ve a la pestaña **"Reglas"** o **"Rules"**

2. **Borra** todo el contenido actual

3. **Copia y pega** estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir que solo usuarios autenticados lean y escriban sus propios datos
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. Haz clic en **"Publicar"** o **"Publish"**

5. Verás un mensaje de confirmación: **"Reglas publicadas correctamente"**

---

### **Paso 4: Verificar la Configuración**

1. Recarga tu aplicación web: `http://localhost:3000/cv`

2. Abre la **Consola del Navegador** (F12 → Consola)

3. Busca estos mensajes:
   ```
   📡 Intentando cargar desde Firestore...
   ✅ Datos guardados en Firestore
   ```

4. Si ves esos mensajes: **¡Funciona!** 🎉

5. Si ves errores: Ve a la sección de "Solución de Problemas" abajo

---

## 🔍 Verificar que Funciona

### **Test 1: Cargar Datos**
1. Ve a `/cv` en tu app
2. En la consola deberías ver: `✅ Datos cargados desde Firestore`

### **Test 2: Guardar Datos**
1. Activa "Modo Edición"
2. Edita tu información personal
3. Guarda
4. En la consola deberías ver:
   ```
   💾 Guardado en localStorage
   ✅ Guardado en Firestore
   ```

### **Test 3: Verificar en Firebase Console**
1. Ve a Firebase Console → Firestore Database → Pestaña "Datos"
2. Deberías ver:
   ```
   users/
     └── {tu-user-id}/
         └── cv/
             └── data/
   ```
3. Haz clic en `data` para ver tu CV guardado

---

## 🎯 ¿Cómo Funciona el Sistema Híbrido?

Tu CV ahora tiene **doble respaldo**:

### **Sistema de Guardado:**
1. **Guardas** → Se guarda en localStorage (instantáneo)
2. **Al mismo tiempo** → Intenta guardar en Firestore (nube)
3. **Si Firestore falla** → Sigue funcionando con localStorage

### **Sistema de Carga:**
1. **Al cargar** → Intenta leer de Firestore primero
2. **Si Firestore funciona** → Usa esos datos
3. **Si Firestore falla** → Lee de localStorage
4. **Si no hay datos** → Crea datos por defecto

### **Ventajas:**
- ✅ Siempre funciona (con o sin Firestore)
- ✅ Datos sincronizados en la nube (cuando Firestore está habilitado)
- ✅ Respaldo local automático
- ✅ Acceso desde múltiples dispositivos

---

## 🛠️ Solución de Problemas

### **Problema 1: "Permission denied" o Error 403**

**Causa:** Las reglas de seguridad están mal configuradas

**Solución:**
1. Ve a Firestore → Reglas
2. Verifica que las reglas sean exactamente:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
3. Haz clic en "Publicar"

---

### **Problema 2: Error 400 "Bad Request"**

**Causa:** Firestore no está habilitado correctamente

**Solución:**
1. Ve a Firebase Console → Firestore Database
2. Asegúrate de que esté en estado **"Activo"** o **"Active"**
3. Si dice "No habilitado", sigue los Pasos 1-2 de arriba

---

### **Problema 3: "Client is offline"**

**Causa:** Tu navegador no puede conectarse a Firestore

**Soluciones:**
1. Verifica tu conexión a internet
2. Desactiva extensiones del navegador (bloqueadores de ads)
3. Prueba en modo incógnito
4. Limpia la caché del navegador
5. Verifica el firewall/antivirus

---

### **Problema 4: Los datos no se sincronizan entre dispositivos**

**Causa:** Estás usando solo localStorage

**Solución:**
1. Verifica que Firestore esté habilitado
2. En la consola, deberías ver: `✅ Guardado en Firestore`
3. Si ves: `⚠️ No se pudo guardar en Firestore`, revisa los pasos de configuración

---

## 📊 Monitorear el Estado

### **En la Consola del Navegador:**

**Firestore funcionando:**
```
📡 Intentando cargar desde Firestore...
✅ Datos cargados desde Firestore
💾 Guardado en localStorage
✅ Guardado en Firestore
```

**Firestore no disponible (usa localStorage):**
```
📡 Intentando cargar desde Firestore...
❌ Firestore no disponible: [error]
💾 Usando localStorage como respaldo...
✅ Datos cargados desde localStorage
```

---

## 🔐 Seguridad

Las reglas configuradas garantizan que:

- ✅ Solo usuarios **autenticados** pueden acceder
- ✅ Cada usuario solo puede ver/editar **sus propios datos**
- ✅ No se pueden leer datos de otros usuarios
- ✅ No se pueden escribir datos sin autenticación

**Estructura en Firestore:**
```
users/
  └── {user-id-1}/
      └── cv/
          └── data/  ← Solo user-id-1 puede acceder
  └── {user-id-2}/
      └── cv/
          └── data/  ← Solo user-id-2 puede acceder
```

---

## 📝 Notas Importantes

1. **Ubicación:** Una vez elegida, no puedes cambiarla
2. **Costo:** Firestore es gratuito hasta cierto límite (muy generoso para desarrollo)
3. **Límites gratuitos:**
   - 50,000 lecturas/día
   - 20,000 escrituras/día
   - 1 GB de almacenamiento
   - Más que suficiente para desarrollo

---

## ✅ Checklist Final

- [ ] Firestore Database habilitado en Firebase Console
- [ ] Ubicación seleccionada (no se puede cambiar después)
- [ ] Reglas de seguridad configuradas y publicadas
- [ ] App recargada y probada
- [ ] Mensaje `✅ Guardado en Firestore` aparece en consola
- [ ] Datos visibles en Firebase Console → Firestore Database → Datos

---

## 🎉 Una vez Configurado

Cuando Firestore esté funcionando:

1. Tus datos se **sincronizarán en la nube**
2. Podrás acceder desde **múltiples dispositivos**
3. Los datos **persisten** aunque borres el caché del navegador
4. Tienes **respaldo automático** en localStorage

---

**¿Necesitas ayuda?** Revisa la consola del navegador para ver los mensajes de diagnóstico.


