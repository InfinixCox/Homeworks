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
  uid = signal<string | null>(null);
  error = signal('');

  listo: Promise<void>;

  constructor() {
    this.listo = new Promise<void>((resolve) => {
      onAuthStateChanged(
        auth,
        (usuarioFirebase) => {
          if (usuarioFirebase !== null) {
            this.usuario.set(usuarioFirebase.email);
            this.uid.set(usuarioFirebase.uid);
          } else {
            this.usuario.set(null);
            this.uid.set(null);
          }

          resolve();
        },
        (error) => {
          this.error.set(error.message);
          this.usuario.set(null);
          this.uid.set(null);
          resolve();
        }
      );
    });
  }

  estaLogueado(): boolean {
    return this.uid() !== null;
  }

  async entrar(correo: string, clave: string): Promise<boolean> {
    this.error.set('');

    try {
      const resultado = await signInWithEmailAndPassword(
        auth,
        correo,
        clave
      );

      this.usuario.set(resultado.user.email);
      this.uid.set(resultado.user.uid);

      return true;
    } catch (error: any) {
      this.error.set(error.message);
      return false;
    }
  }

  async registrar(correo: string, clave: string): Promise<boolean> {
    this.error.set('');

    try {
      const resultado = await createUserWithEmailAndPassword(
        auth,
        correo,
        clave
      );

      this.usuario.set(resultado.user.email);
      this.uid.set(resultado.user.uid);

      return true;
    } catch (error: any) {
      this.error.set(error.message);
      return false;
    }
  }

  async salir(): Promise<boolean> {
    this.error.set('');

    try {
      await signOut(auth);

      this.usuario.set(null);
      this.uid.set(null);

      return true;
    } catch (error: any) {
      this.error.set(error.message);
      return false;
    }
  }
}