import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);

  email = signal('');
  clave = signal('');
  mensaje = signal('');
  pendiente = signal(false);
  verClave = signal(false);

  async ngOnInit(): Promise<void> {
    const { data } = await this.auth.obtenerSesion();

    if (data.session) {
      await this.router.navigate(['/tareas']);
    }
  }

  alternarClave(): void {
    this.verClave.set(!this.verClave());
  }

  async entrar(): Promise<void> {
    this.mensaje.set('');

    if (this.email() === '' || this.clave() === '') {
      this.mensaje.set('Escribe el correo y la contraseña.');
      return;
    }

    this.pendiente.set(true);

    const { error } = await this.auth.entrar(this.email(), this.clave());

    if (error) {
      this.mensaje.set(this.traducirError(error.message));
    } else {
      await this.router.navigate(['/tareas']);
    }

    this.pendiente.set(false);
  }

  traducirError(mensaje: string): string {
    if (mensaje === 'Invalid login credentials') {
      return 'Correo o contraseña incorrectos.';
    }

    if (mensaje === 'Email not confirmed') {
      return 'Debes confirmar tu correo antes de entrar.';
    }

    return mensaje;
  }
}
