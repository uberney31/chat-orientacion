#!/bin/bash
set -e

echo "================================================"
echo "Starting Orientational Agent Backend"
echo "================================================"
echo "Frontend URL: ${FRONTEND_URL}"
echo "Port: ${PORT}"
echo "================================================"

# Verificar que las variables estén configuradas
if [ -z "$FRONTEND_URL" ]; then
    echo "ERROR: FRONTEND_URL is not set!"
    exit 1
fi

if [ -z "$OPENAI_API_KEY" ]; then
    echo "ERROR: OPENAI_API_KEY is not set!"
    exit 1
fi

# Iniciar servidor ADK con CORS configurado
exec adk web --port ${PORT} --allow_origins="${FRONTEND_URL}" .

