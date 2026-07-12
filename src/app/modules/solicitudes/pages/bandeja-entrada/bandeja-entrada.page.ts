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
  usuarioActual: string = 'laura.lead';
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
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al conectar con el backend bancario:', err)
    });
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
