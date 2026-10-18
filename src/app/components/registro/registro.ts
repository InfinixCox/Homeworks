import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-registro',
  imports: [RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro implements OnInit {
  auth = inject(Auth);
  private router = inject(Router);

  correo = signal('');
  clave = signal('');
  confirmarClave = signal('');
  mensaje = signal('');
  pendiente = signal(true);

  async ngOnInit(): Promise<void> {
    this.auth.error.set('');

    await this.auth.listo;

    if (this.auth.estaLogueado()) {
      await this.router.navigate(['/tareas']);
    } else {
      this.pendiente.set(false);
    }
  }

  capturarCorreo(evento: any): void {
    this.correo.set(evento.target.value);
  }

  capturarClave(evento: any): void {
    this.clave.set(evento.target.value);
  }

  capturarConfirmarClave(evento: any): void {
    this.confirmarClave.set(evento.target.value);
  }

  async registrar(): Promise<void> {
    this.mensaje.set('');
    this.auth.error.set('');

    if (
      this.correo() === '' ||
      this.clave() === '' ||
      this.confirmarClave() === ''
    ) {
      this.mensaje.set('Completa todos los campos.');
      return;
    }

    if (this.clave() !== this.confirmarClave()) {
      this.mensaje.set('Las contraseñas no coinciden.');
      return;
    }

    this.pendiente.set(true);

    const resultado = await this.auth.registrar(
      this.correo(),
      this.clave()
    );

    if (resultado) {
      await this.router.navigate(['/tareas']);
    }

    this.pendiente.set(false);
  }
}