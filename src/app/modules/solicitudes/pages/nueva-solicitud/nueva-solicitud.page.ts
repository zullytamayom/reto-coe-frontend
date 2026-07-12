import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudService } from '../../../../data/services/solicitud.service';

@Component({
  selector: 'app-nueva-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nueva-solicitud.page.html',
  styleUrls: ['./nueva-solicitud.page.css']
})
export class NuevaSolicitudPage implements OnInit {
  formularioBancario!: FormGroup;
  cargando: boolean = false;
  mensajeExito: string | null = null;

  // Catálogo controlado de tipos de requerimientos
  tiposSolicitud = ['Despliegue', 'Acceso a Base de Datos', 'Apertura de Puertos (Firewall)', 'Aumento de Recursos'];

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.formularioBancario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      solicitante: ['carlos.dev', [Validators.required]], // Simulación de usuario de red autenticado
      responsable: ['', [Validators.required]], // Líder encargado de auditar y decidir
      tipoSolicitud: ['', [Validators.required]]
    });
  }

  enviarSolicitud(): void {
    if (this.formularioBancario.invalid) {
      this.formularioBancario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    const datosEnvio = this.formularioBancario.value;

    this.solicitudService.crearSolicitud(datosEnvio).subscribe({
      next: () => {
        this.mensajeExito = '🏛️ Operación registrada con éxito en el CoE de Auditoría.';
        setTimeout(() => {
          this.router.navigate(['/bandeja-entrada']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error al registrar la solicitud en Spring:', err);
        this.cargando = false;
      }
    });
  }
}
