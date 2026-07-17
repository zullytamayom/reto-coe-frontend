import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../../data/services/notificacion.service';

interface AlertaBancaria {
  id: number;
  tipo: string;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-notificacion-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificacion-toast.component.html',
  styleUrls: ['./notificacion-toast.component.css']
})
export class NotificacionToastComponent implements OnInit {
  alertas: AlertaBancaria[] = [];
  private contadorId = 0;

  constructor(
    private notificacionService: NotificacionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.notificacionService.obtenerAlertasEnVivo().subscribe((evento) => {
      this.inyectarToastEnPantalla(evento);
    });
  }

private inyectarToastEnPantalla(evento: any): void {
  const estadoReal = (evento.estado || 'PENDIENTE').toLowerCase();

  let tituloPersonalizado = '';
  let descripcionPersonalizada = '';

  // Evaluamos el estado real que viaja en el objeto JSON de SQS
  switch (estadoReal) {
    case 'pendiente':
      tituloPersonalizado = 'Nueva Operación Pendiente';
      descripcionPersonalizada = `El usuario ${evento.usuario || 'un operador'} ha registrado "${evento.titulo}". Requiere revisión.`;
      break;

    case 'aprobado':
      tituloPersonalizado = 'Transacción Autorizada';
      descripcionPersonalizada = `La operación "${evento.titulo}" ha sido aprobada con éxito por ${evento.usuario || 'el supervisor'}.`;
      break;

    case 'rechazado':
      tituloPersonalizado = 'Operación Denegada';
      descripcionPersonalizada = `La solicitud "${evento.titulo}" fue rechazada por ${evento.usuario || 'auditoría'}.`;
      break;

    default:
      tituloPersonalizado = 'Actualización de Sistema';
      descripcionPersonalizada = `Cambio de estado en la transacción: ${evento.titulo}`;
  }

  const nuevaAlerta: AlertaBancaria = {
    id: this.contadorId++,
    tipo: estadoReal, // 'pendiente', 'aprobado' o 'rechazado'
    titulo: tituloPersonalizado,
    descripcion: descripcionPersonalizada
  };

  this.alertas.push(nuevaAlerta);
  this.cdr.detectChanges();

  setTimeout(() => {
    this.alertas = this.alertas.filter(a => a.id !== nuevaAlerta.id);
    this.cdr.detectChanges();
  }, 5000);
}

}
