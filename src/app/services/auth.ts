import { Injectable, inject, signal } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { Supabase } from './supabase';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private sb = inject(Supabase).client;

  session = signal<Session | null>(null);

  constructor() {
    this.sb.auth.getSession().then(({ data }) => this.session.set(data.session));
    this.sb.auth.onAuthStateChange((_evento, s) => this.session.set(s));
  }

  obtenerSesion() {
    return this.sb.auth.getSession();
  }

  registrar(email: string, clave: string) {
    return this.sb.auth.signUp({ email: email, password: clave });
  }

  entrar(email: string, clave: string) {
    return this.sb.auth.signInWithPassword({ email: email, password: clave });
  }

  salir() {
    return this.sb.auth.signOut();
  }
}
