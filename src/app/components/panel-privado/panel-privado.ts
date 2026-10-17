import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-panel-privado',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './panel-privado.html',
  styleUrl: './panel-privado.css'
})
export class PanelPrivado {
  auth = inject(Auth);
  private router = inject(Router);

  salir(): void {
    this.auth.salir();
    this.router.navigate(['/login']);
  }
}