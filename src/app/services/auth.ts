import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  usuario = signal<string | null>(null);

  entrar(correo: string, clave: string): boolean {
    if (correo === 'user@mail.com' && clave === '123') {
      this.usuario.set(correo);
      return true;
    }

    return false;
  }

  salir(): void {
    this.usuario.set(null);
  }

  estaLogueado(): boolean {
    return this.usuario() !== null;
  }
}