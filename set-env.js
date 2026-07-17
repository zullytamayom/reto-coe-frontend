const fs = require('fs');

// process.argv[2] captura el primer argumento real enviado ('prod' o 'local')
const target = process.argv[2];
const envFilePath = './src/environments/environment.ts';

const localConfig = `export const environment = {
  production: false,
  sseUrl: 'http://localhost:8080/api/notificaciones/stream',
  apiUrl: 'http://localhost:8081/api/solicitudes'
};`;

const prodConfig = `export const environment = {
  production: true,
  sseUrl: 'http://54.242.176.6',
  apiUrl: 'http://54.242.176.6'
};`;


const config = target === 'prod' ? prodConfig : localConfig;

fs.writeFileSync(envFilePath, config, { encoding: 'utf8' });
console.log(`\x1b[32m[Environment] Configurado exitosamente para: ${target ? target.toUpperCase() : 'LOCAL'}\x1b[0m`);

