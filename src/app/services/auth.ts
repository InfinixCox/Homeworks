import { Injectable, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  usuario = signal<string | null>(null);

  listo: Promise<void>;

  constructor() {
    this.listo = new Promise<void>((resolve) => {
      onAuthStateChanged(auth, (usuarioFirebase) => {
        if (usuarioFirebase !== null) {
          this.usuario.set(usuarioFirebase.email);
        } else {
          this.usuario.set(null);
        }

        resolve();
      });
    });
  }

  estaLogueado(): boolean {
    return this.usuario() !== null;
  }

  async entrar(correo: string, clave: string) {
    const resultado = await signInWithEmailAndPassword(
      auth,
      correo,
      clave
    );

    this.usuario.set(resultado.user.email);
  }

  async registrar(correo: string, clave: string) {
    const resultado = await createUserWithEmailAndPassword(
      auth,
      correo,
      clave
    );

    this.usuario.set(resultado.user.email);
  }

  async salir() {
    await signOut(auth);
    this.usuario.set(null);
  }
}