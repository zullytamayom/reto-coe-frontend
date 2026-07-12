export interface Solicitud {
  id: number;
  titulo: string;
  descripcion: string;
  solicitante: string;
  responsable: string;
  tipoSolicitud: string;
  estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  fechaCreacion: string;
}

export interface AprobacionRequest {
  usuarioAccion: string;
  comentarios: string;
}
