import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);

  correo = signal('');
  clave = signal('');
  mensaje = signal('');
  pendiente = signal(true);

  async ngOnInit() {
    await this.auth.listo;

    if (this.auth.estaLogueado()) {
      await this.router.navigate(['/explorador']);
    } else {
      this.pendiente.set(false);
    }
  }

  async entrar() {
    this.mensaje.set('');

    if (this.correo() === '' || this.clave() === '') {
      this.mensaje.set('Escribe el correo y la contraseña.');
      return;
    }

    this.pendiente.set(true);

    try {
      await this.auth.entrar(this.correo(), this.clave());
      await this.router.navigate(['/explorador']);
    } catch (error: any) {
      this.mensaje.set(error.message);
    }

    this.pendiente.set(false);
  }

  async registrar() {
    this.mensaje.set('');

    if (this.correo() === '' || this.clave() === '') {
      this.mensaje.set('Escribe el correo y la contraseña.');
      return;
    }

    this.pendiente.set(true);

    try {
      await this.auth.registrar(this.correo(), this.clave());
      await this.router.navigate(['/explorador']);
    } catch (error: any) {
      this.mensaje.set(error.message);
    }

    this.pendiente.set(false);
  }
}