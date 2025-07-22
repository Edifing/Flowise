#!/bin/bash

echo "🚀 Iniciando aplicación en Render con PM2..."

# Instalar PM2 globalmente si no está instalado
if ! command -v pm2 &> /dev/null; then
    echo "📦 Instalando PM2..."
    npm install -g pm2
fi

# Crear directorio de logs
echo "📁 Creando directorio de logs..."
mkdir -p logs

# Limpiar procesos PM2 anteriores (por si acaso)
echo "🧹 Limpiando procesos PM2 anteriores..."
pm2 kill 2>/dev/null || true

# Iniciar aplicación con PM2
echo "🔥 Iniciando aplicación con PM2..."
pm2 start ecosystem.config.js

# Mostrar estado
echo "📊 Estado de los procesos:"
pm2 status

# Mostrar logs en tiempo real
echo "📝 Mostrando logs en tiempo real..."
pm2 logs --lines 50
