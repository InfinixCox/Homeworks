import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  auth = inject(Auth);
  private router = inject(Router);

  correo = signal('');
  clave = signal('');
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

  async entrar(): Promise<void> {
    this.mensaje.set('');
    this.auth.error.set('');

    if (this.correo() === '' || this.clave() === '') {
      this.mensaje.set('Completa el correo y la contraseña.');
      return;
    }

    this.pendiente.set(true);

    const resultado = await this.auth.entrar(
      this.correo(),
      this.clave()
    );

    if (resultado) {
      await this.router.navigate(['/tareas']);
    }

    this.pendiente.set(false);
  }
}