const http = require('http');
const https = require('https');

// Tu URL de Render - LA CAMBIARÁS DESPUÉS
const RENDER_URL = process.env.RENDER_EXTERNAL_URL || 'https://flowise-i93x.onrender.com';

function keepAlive() {
    // Usar el endpoint de ping de Flowise
    const url = RENDER_URL + '/api/v1/ping';
    
    const timestamp = new Date().toISOString();
    console.log(`🏓 [${timestamp}] Keep-alive ping iniciado`);
    
    // Decidir si usar http o https
    const client = RENDER_URL.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
        console.log(`✅ [${timestamp}] Keep-alive exitoso: ${res.statusCode}`);
        
        // Leer la respuesta para cerrar la conexión correctamente
        res.on('data', () => {}); // Consumir datos
        res.on('end', () => {
            console.log(`🔚 [${timestamp}] Conexión cerrada correctamente`);
        });
    });
    
    // Manejar errores de conexión
    req.on('error', (err) => {
        console.log(`❌ [${timestamp}] Keep-alive error: ${err.message}`);
    });
    
    // Timeout de 30 segundos
    req.setTimeout(30000, () => {
        req.destroy();
        console.log(`⏰ [${timestamp}] Keep-alive timeout - conexión cerrada`);
    });
    
    // Finalizar la request
    req.end();
}

// Ejecutar cada 14 minutos (840,000 ms)
// Render duerme después de 15 minutos, así que hacemos ping antes
const INTERVAL = 14 * 60 * 1000; // 14 minutos en milisegundos

console.log('🚀 Iniciando servicio Keep-Alive...');
console.log(`📍 URL objetivo: ${RENDER_URL}`);
console.log(`⏱️  Intervalo: ${INTERVAL / 1000 / 60} minutos`);

// Configurar el intervalo
setInterval(keepAlive, INTERVAL);

// Hacer un ping inicial inmediatamente
setTimeout(keepAlive, 5000); // Esperar 5 segundos después del inicio

console.log('✅ Keep-alive service configurado correctamente');

// Manejar cierre graceful
process.on('SIGTERM', () => {
    console.log('🛑 Keep-alive service deteniendo...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Keep-alive service deteniendo...');
    process.exit(0);
});