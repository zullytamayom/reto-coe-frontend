import { Routes } from '@angular/router';
import { BandejaEntradaPage } from './modules/solicitudes/pages/bandeja-entrada/bandeja-entrada.page';
import { NuevaSolicitudPage } from './modules/solicitudes/pages/nueva-solicitud/nueva-solicitud.page';

export const routes: Routes = [
  { path: '', redirectTo: 'bandeja-entrada', pathMatch: 'full' },
  { path: 'bandeja-entrada', component: BandejaEntradaPage },
  { path: 'nueva-solicitud', component: NuevaSolicitudPage }
];
