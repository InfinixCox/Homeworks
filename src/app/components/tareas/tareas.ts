import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import { DatosTareas } from '../../services/datos-tareas';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-tareas',
  imports: [],
  templateUrl: './tareas.html',
  styleUrl: './tareas.scss'
})
export class Tareas implements OnInit, OnDestroy {
  datos = inject(DatosTareas);

  titulo = '';
  descripcion = '';
  mensaje = '';

  pendiente = signal(false);

  tareaEditar: Tarea | null = null;

  ngOnInit(): void {
    this.datos.iniciar();
  }

  capturarTitulo(evento: any): void {
    this.titulo = evento.target.value;
  }

  capturarDescripcion(evento: any): void {
    this.descripcion = evento.target.value;
  }

  async guardar(): Promise<void> {
    if (this.pendiente()) {
      return;
    }

    this.mensaje = '';
    this.datos.error.set('');

    if (this.titulo === '') {
      this.mensaje = 'Escribe el título de la tarea.';
      return;
    }

    if (this.titulo.length > 100) {
      this.mensaje = 'El título puede tener máximo 100 caracteres.';
      return;
    }

    if (this.descripcion.length > 1000) {
      this.mensaje = 'La descripción puede tener máximo 1000 caracteres.';
      return;
    }

    this.pendiente.set(true);

    let resultado = false;

    if (this.tareaEditar === null) {
      resultado = await this.datos.agregar(
        this.titulo,
        this.descripcion
      );

      if (resultado) {
        this.mensaje = 'Tarea creada.';
      }
    } else {
      resultado = await this.datos.editar(
        this.tareaEditar,
        this.titulo,
        this.descripcion
      );

      if (resultado) {
        this.mensaje = 'Tarea actualizada.';
      }
    }

    if (resultado) {
      this.limpiarFormulario();
    }

    this.pendiente.set(false);
  }

  seleccionarEditar(tarea: Tarea): void {
    if (this.pendiente()) {
      return;
    }

    if (!this.datos.puedeModificar(tarea)) {
      this.mensaje = 'Solo el creador puede editar esta tarea.';
      return;
    }

    this.tareaEditar = tarea;
    this.titulo = tarea.titulo;
    this.descripcion = tarea.descripcion;
    this.mensaje = '';
    this.datos.error.set('');
  }

  cancelarEdicion(): void {
    if (this.pendiente()) {
      return;
    }

    this.limpiarFormulario();
    this.mensaje = '';
    this.datos.error.set('');
  }

  limpiarFormulario(): void {
    this.tareaEditar = null;
    this.titulo = '';
    this.descripcion = '';
  }

  async cambiarEstado(tarea: Tarea): Promise<void> {
    if (this.pendiente()) {
      return;
    }

    this.mensaje = '';
    this.pendiente.set(true);

    const resultado = await this.datos.cambiarEstado(tarea);

    if (resultado) {
      this.mensaje = 'Estado actualizado.';
    }

    this.pendiente.set(false);
  }

  async eliminar(tarea: Tarea): Promise<void> {
    if (this.pendiente()) {
      return;
    }

    this.mensaje = '';
    this.pendiente.set(true);

    const resultado = await this.datos.eliminar(tarea);

    if (resultado) {
      if (
        this.tareaEditar !== null &&
        this.tareaEditar.id === tarea.id
      ) {
        this.limpiarFormulario();
      }

      this.mensaje = 'Tarea eliminada.';
    }

    this.pendiente.set(false);
  }

  ngOnDestroy(): void {
    this.datos.detener();
  }
}