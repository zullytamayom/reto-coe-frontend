import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud, AprobacionRequest } from '../../core/models/solicitud.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listarSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.apiUrl);
  }

  crearSolicitud(solicitud: Partial<Solicitud>): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.apiUrl, solicitud);
  }

  aprobarSolicitud(id: number, request: AprobacionRequest): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.apiUrl}/${id}/aprobar`, request);
  }

  rechazarSolicitud(id: number, request: AprobacionRequest): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.apiUrl}/${id}/rechazar`, request);
  }
}
