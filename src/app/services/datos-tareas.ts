import {
  Injectable,
  inject,
  OnDestroy,
  signal
} from '@angular/core';
import {
  onValue,
  push,
  ref,
  remove,
  set,
  update
} from 'firebase/database';
import { db } from '../firebase.config';
import { Tarea } from '../models/tarea';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class DatosTareas implements OnDestroy {
  private auth = inject(Auth);
  private cancelarEscucha: (() => void) | null = null;

  tareas = signal<Tarea[]>([]);
  cargando = signal(false);
  error = signal('');

  iniciar(): void {
    this.detener();
    this.error.set('');
    this.cargando.set(true);

    this.cancelarEscucha = onValue(
      ref(db, 'tareas'),
      (snapshot) => {
        const lista: Tarea[] = [];

        if (snapshot.exists()) {
          const datos = snapshot.val();
          const registros = Object.entries(datos);

          for (let i = 0; i < registros.length; i++) {
            const id = registros[i][0];
            const dato: any = registros[i][1];

            lista.push(
              new Tarea(
                id,
                dato.titulo,
                dato.descripcion,
                dato.realizada,
                dato.creadorUid,
                dato.creadorCorreo
              )
            );
          }
        }

        this.tareas.set(lista);
        this.cargando.set(false);
      },
      (error) => {
        this.error.set(error.message);
        this.tareas.set([]);
        this.cargando.set(false);
      }
    );
  }

  detener(): void {
    if (this.cancelarEscucha !== null) {
      this.cancelarEscucha();
      this.cancelarEscucha = null;
    }

    this.tareas.set([]);
    this.cargando.set(false);
  }

  puedeModificar(tarea: Tarea): boolean {
    return (
      this.auth.uid() !== null &&
      tarea.creadorUid === this.auth.uid()
    );
  }

  async agregar(
    titulo: string,
    descripcion: string
  ): Promise<boolean> {
    this.error.set('');

    const uid = this.auth.uid();
    const correo = this.auth.usuario();

    if (uid === null || correo === null) {
      this.error.set('Debes iniciar sesión.');
      return false;
    }

    try {
      const nuevaReferencia = push(ref(db, 'tareas'));

      await set(nuevaReferencia, {
        titulo: titulo,
        descripcion: descripcion,
        realizada: false,
        creadorUid: uid,
        creadorCorreo: correo
      });

      return true;
    } catch (error: any) {
      this.error.set(error.message);
      return false;
    }
  }

  async editar(
    tarea: Tarea,
    titulo: string,
    descripcion: string
  ): Promise<boolean> {
    this.error.set('');

    if (!this.puedeModificar(tarea)) {
      this.error.set('Solo el creador puede editar esta tarea.');
      return false;
    }

    try {
      await update(ref(db, 'tareas/' + tarea.id), {
        titulo: titulo,
        descripcion: descripcion
      });

      return true;
    } catch (error: any) {
      this.error.set(error.message);
      return false;
    }
  }

  async cambiarEstado(tarea: Tarea): Promise<boolean> {
    this.error.set('');

    if (!this.puedeModificar(tarea)) {
      this.error.set('Solo el creador puede cambiar el estado.');
      return false;
    }

    try {
      await update(ref(db, 'tareas/' + tarea.id), {
        realizada: !tarea.realizada
      });

      return true;
    } catch (error: any) {
      this.error.set(error.message);
      return false;
    }
  }

  async eliminar(tarea: Tarea): Promise<boolean> {
    this.error.set('');

    if (!this.puedeModificar(tarea)) {
      this.error.set('Solo el creador puede eliminar esta tarea.');
      return false;
    }

    try {
      await remove(ref(db, 'tareas/' + tarea.id));
      return true;
    } catch (error: any) {
      this.error.set(error.message);
      return false;
    }
  }

  ngOnDestroy(): void {
    this.detener();
  }
}