import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);

  email = signal('');
  clave = signal('');
  confirmar = signal('');
  mensaje = signal('');
  tipoMensaje = signal<'error' | 'exito'>('error');
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

  mostrarError(texto: string): void {
    this.tipoMensaje.set('error');
    this.mensaje.set(texto);
  }

  async registrar(): Promise<void> {
    this.mensaje.set('');

    if (this.email() === '' || this.clave() === '' || this.confirmar() === '') {
      this.mostrarError('Completa todos los campos.');
      return;
    }

    if (this.clave().length < 6) {
      this.mostrarError('La contraseña debe tener mínimo 6 caracteres.');
      return;
    }

    if (this.clave() !== this.confirmar()) {
      this.mostrarError('Las contraseñas no coinciden.');
      return;
    }

    this.pendiente.set(true);

    const { data, error } = await this.auth.registrar(this.email(), this.clave());

    if (error) {
      this.mostrarError(this.traducirError(error.message));
    } else if (data.session) {
      await this.router.navigate(['/tareas']);
    } else {
      this.tipoMensaje.set('exito');
      this.mensaje.set('Cuenta creada. Revisa tu correo para confirmarla.');
    }

    this.pendiente.set(false);
  }

  traducirError(mensaje: string): string {
    if (mensaje === 'User already registered') {
      return 'Ese correo ya está registrado.';
    }

    return mensaje;
  }
}
