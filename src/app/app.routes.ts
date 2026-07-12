import { Routes } from '@angular/router';
import { BandejaEntradaPage } from './modules/solicitudes/pages/bandeja-entrada/bandeja-entrada.page';

export const routes: Routes = [
  { path: '', redirectTo: 'bandeja-entrada', pathMatch: 'full' },
  { path: 'bandeja-entrada', component: BandejaEntradaPage }
];
