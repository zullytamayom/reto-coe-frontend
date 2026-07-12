import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../../../data/services/solicitud.service';
import { Solicitud } from '../../../../core/models/solicitud.model';

@Component({
  selector: 'app-bandeja-entrada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bandeja-entrada.page.html',
  styleUrls: ['./bandeja-entrada.page.css']
})
export class BandejaEntradaPage implements OnInit {
  solicitudes: Solicitud[] = [];
  solicitudesPaginadas: Solicitud[] = [];
  usuarioActual: string = 'laura.lead';

  paginaActual: number = 0;
  registrosPorPagina: number = 5;
  totalPaginas: number = 1;

  constructor(private solicitudService: SolicitudService,
    private cdr: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.solicitudService.listarSolicitudes().subscribe({
      next: (data)=>{
        console.log('Datos crudos recibidos desde Spring Boot:', data);
        this.solicitudes = data;
        this.totalPaginas = Math.ceil(this.solicitudes.length / this.registrosPorPagina);
        this.segmentarDatosLocales();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al conectar con el backend bancario:', err)
    });
  }

  segmentarDatosLocales(): void {
    // Calculamos los índices de corte para extraer el segmento
    const inicio = this.paginaActual * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;


    this.solicitudesPaginadas = this.solicitudes.slice(inicio, fin);

    this.cdr.detectChanges();
  }

  cambiarPagina(avanzar: boolean): void {
    if (avanzar && this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
    } else if (!avanzar && this.paginaActual > 0) {
      this.paginaActual--;
    }
    this.segmentarDatosLocales();
  }

  procesarAccion(id: number, aprobar: boolean): void {
    const comentario = prompt(`¿Desea ${aprobar ? 'APROBAR' : 'RECHAZAR'} esta operación? Ingrese los comentarios de auditoría:`);
    if (comentario === null) return;

    const request = { usuarioAccion: this.usuarioActual, comentarios: comentario };

    if (aprobar) {
      this.solicitudService.aprobarSolicitud(id, request).subscribe(() => this.cargarSolicitudes());
    } else {
      this.solicitudService.rechazarSolicitud(id, request).subscribe(() => this.cargarSolicitudes());
    }
  }
}
