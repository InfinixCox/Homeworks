import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-barra-navegacion',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './barra-navegacion.html',
  styleUrl: './barra-navegacion.scss',
})
export class BarraNavegacion {
  auth = inject(Auth);
  private router = inject(Router);

  async salir(): Promise<void> {
    await this.auth.salir();
    await this.router.navigate(['/login']);
  }
}
