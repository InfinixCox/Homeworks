import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { Auth } from '../../services/auth';
import { DatosTareas } from '../../services/datos-tareas';

@Component({
  selector: 'app-panel-privado',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './panel-privado.html',
  styleUrl: './panel-privado.css'
})
export class PanelPrivado {
  auth = inject(Auth);
  private datos = inject(DatosTareas);
  private router = inject(Router);

  pendiente = false;

  async salir(): Promise<void> {
    this.pendiente = true;

    const resultado = await this.auth.salir();

    if (resultado) {
      this.datos.detener();
      await this.router.navigate(['/login']);
    }

    this.pendiente = false;
  }
}