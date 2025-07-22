const https = require('https');

// URL de tu aplicación en Render (se configura automáticamente)
const APP_URL = process.env.RENDER_EXTERNAL_URL || `https://${process.env.RENDER_SERVICE_NAME}.onrender.com` || 'http://localhost:3000';

// Intervalo en milisegundos (14 minutos = 840000ms)
const INTERVAL = 14 * 60 * 1000;

console.log(`🔄 Keepalive iniciado para: ${APP_URL}`);
console.log(`⏰ Intervalo: ${INTERVAL / 1000 / 60} minutos`);

function ping() {
  const url = new URL(APP_URL);
  
  const options = {
    hostname: url.hostname,
    port: url.port || 443,
    path: '/',
    method: 'GET',
    timeout: 30000, // 30 segundos de timeout
    headers: {
      'User-Agent': 'Keepalive-Bot/1.0'
    }
  };

  const req = https.request(options, (res) => {
    const timestamp = new Date().toISOString();
    console.log(`✅ [${timestamp}] Ping exitoso - Status: ${res.statusCode}`);
  });

  req.on('error', (error) => {
    const timestamp = new Date().toISOString();
    console.error(`❌ [${timestamp}] Error en ping:`, error.message);
  });

  req.on('timeout', () => {
    const timestamp = new Date().toISOString();
    console.error(`⏰ [${timestamp}] Timeout en ping`);
    req.destroy();
  });

  req.end();
}

// Ping inicial
ping();

// Configurar intervalo
setInterval(ping, INTERVAL);

// Manejar señales de terminación
process.on('SIGTERM', () => {
  console.log('🛑 Keepalive detenido (SIGTERM)');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Keepalive detenido (SIGINT)');
  process.exit(0);
});
