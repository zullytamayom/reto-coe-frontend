export interface Solicitud {
  id: number;
  titulo: string;
  descripcion: string;
  solicitante: string;
  responsable: string;
  tiposolicitud: string;
  estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  fechacreacion: string;
}

export interface AprobacionRequest {
  usuarioAccion: string;
  comentarios: string;
}
