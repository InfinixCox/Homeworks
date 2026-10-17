import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  correo = signal('');
  clave = signal('');
  mensaje = signal('');

  capturarCorreo(evento: any): void {
    this.correo.set(evento.target.value);
  }

  capturarClave(evento: any): void {
    this.clave.set(evento.target.value);
  }

  entrar(): void {
    if (this.correo() === '' || this.clave() === '') {
      this.mensaje.set('Completa el correo y la contraseña.');
      return;
    }

    if (this.auth.entrar(this.correo(), this.clave())) {
      this.mensaje.set('');
      this.router.navigate(['/arbol']);
    } else {
      this.mensaje.set('El correo o la contraseña son incorrectos.');
    }
  }
}