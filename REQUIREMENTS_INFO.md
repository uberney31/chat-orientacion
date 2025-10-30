# Información sobre archivos de Requirements

## Archivos de Dependencias

### `requirements.txt` (Producción Linux)
- **Uso**: Railway, Cloud Run, servidores Linux
- **Contenido**: Todas las dependencias **SIN** `pywin32`
- **Instalación**: `pip install -r requirements.txt`

### `requirements.windows.txt` (Desarrollo Local Windows)
- **Uso**: Desarrollo en computadoras Windows
- **Contenido**: Todas las dependencias **CON** `pywin32`
- **Instalación**: `pip install -r requirements.windows.txt`

### `requirements.production.txt` (Backup)
- Copia de seguridad de la versión de producción
- Mismo contenido que `requirements.txt`

## ¿Por qué dos archivos?

`pywin32` es una librería específica de Windows que **no funciona en Linux**. Los servidores de deployment (Railway, Cloud Run, etc.) usan Linux, por lo que necesitamos una versión sin esta dependencia.

## Desarrollo Local

### Windows:
```bash
pip install -r requirements.windows.txt
```

### Mac/Linux:
```bash
pip install -r requirements.txt
```

