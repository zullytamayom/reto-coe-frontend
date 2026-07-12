import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private sseUrl = 'http://localhost:8080/api/notificaciones/stream'
  private streamNotificaciones$ = new Subject<any>();

  constructor(private zone: NgZone) {
    this.conectarStreamReactivo();
  }

  private conectarStreamReactivo(): void {
    const eventSource = new EventSource(this.sseUrl);

    eventSource.onmessage = (event) => {
      this.zone.run(() => {
        try {
          // Parseamos el JSON que eyectó WebFlux desde AWS SQS
          const datos = JSON.parse(event.data);
          this.streamNotificaciones$.next(datos);
        } catch (error) {
          this.streamNotificaciones$.next({ titulo: 'Evento Interno', descripcion: event.data });
        }
      });
    };

    eventSource.onerror = (error) => {
      console.error('⚠️ Conexión interrumpida con el canal de AWS. Reintentando...', error);
    };
  }

  obtenerAlertasEnVivo(): Observable<any> {
    return this.streamNotificaciones$.asObservable();
  }
}
