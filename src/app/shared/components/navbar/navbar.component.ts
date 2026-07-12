import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuarioSimulado = {
    nombre: 'Laura Lead',
    rol: 'Líder de CoE / Auditor',
    avatar: 'https://dicebear.com'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Escucha cambios de ruta para mutar dinámicamente el usuario simulado según el contexto
    this.router.events.subscribe(() => {
      if (this.router.url.includes('nueva-solicitud')) {
        this.usuarioSimulado = {
          nombre: 'Carlos Dev',
          rol: 'Desarrollador Solicitante',
          avatar: 'https://dicebear.com'
        };
      } else {
        this.usuarioSimulado = {
          nombre: 'Laura Lead',
          rol: 'Líder de CoE / Auditor',
          avatar: 'https://dicebear.com'
        };
      }
    });
  }
}
