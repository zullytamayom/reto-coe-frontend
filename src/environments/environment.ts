// Detectamos si el usuario abrió la página desde el S3 de AWS o localmente
const isProduction = window.location.hostname.includes('amazonaws.com');

export const environment = {
  production: isProduction,
  sseUrl: isProduction
    ? 'http://54.242.176.6'
    : 'http://localhost:8080/api/notificaciones/stream',
  apiUrl: isProduction
    ? 'http://54.242.176.6'
    : 'http://localhost:8081/api/solicitudes'
};
