import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Tareas } from '../../services/tareas';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-lista-tareas',
  imports: [FormsModule],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tareas.scss',
})
export class ListaTareas implements OnInit, OnDestroy {
  private servicio = inject(Tareas);
  private canal: RealtimeChannel | null = null;

  tareas = signal<Tarea[]>([]);
  cargando = signal(true);
  pendiente = signal(false);
  mensaje = signal('');

  nueva = signal('');
  editandoId = signal<number | null>(null);
  textoEdicion = signal('');

  async ngOnInit(): Promise<void> {
    await this.cargar();
    this.canal = this.servicio.escuchar(() => this.cargar());
  }

  async cargar(): Promise<void> {
    const { data, error } = await this.servicio.listar();

    if (error) {
      this.mensaje.set(error.message);
    } else {
      this.tareas.set(data as Tarea[]);
    }

    this.cargando.set(false);
  }

  async agregar(): Promise<void> {
    this.mensaje.set('');
    const titulo = this.nueva().trim();

    if (titulo === '') {
      this.mensaje.set('Escribe el título de la tarea.');
      return;
    }

    this.pendiente.set(true);

    const { error } = await this.servicio.crear(titulo);

    if (error) {
      this.mensaje.set(error.message);
    } else {
      this.nueva.set('');
      await this.cargar();
    }

    this.pendiente.set(false);
  }

  iniciarEdicion(tarea: Tarea): void {
    this.mensaje.set('');
    this.editandoId.set(tarea.id);
    this.textoEdicion.set(tarea.titulo);
  }

  cancelarEdicion(): void {
    this.editandoId.set(null);
    this.textoEdicion.set('');
  }

  async guardarEdicion(tarea: Tarea): Promise<void> {
    this.mensaje.set('');
    const titulo = this.textoEdicion().trim();

    if (titulo === '') {
      this.mensaje.set('El título no puede quedar vacío.');
      return;
    }

    this.pendiente.set(true);

    const { error } = await this.servicio.editar(tarea.id, titulo);

    if (error) {
      this.mensaje.set(error.message);
    } else {
      this.cancelarEdicion();
      await this.cargar();
    }

    this.pendiente.set(false);
  }

  async completar(tarea: Tarea): Promise<void> {
    this.mensaje.set('');
    this.pendiente.set(true);

    const { error } = await this.servicio.completar(tarea.id, !tarea.completada);

    if (error) {
      this.mensaje.set(error.message);
    }

    await this.cargar();
    this.pendiente.set(false);
  }

  async borrar(tarea: Tarea): Promise<void> {
    this.mensaje.set('');
    this.pendiente.set(true);

    const { error } = await this.servicio.borrar(tarea.id);

    if (error) {
      this.mensaje.set(error.message);
    } else {
      await this.cargar();
    }

    this.pendiente.set(false);
  }

  ngOnDestroy(): void {
    if (this.canal !== null) {
      this.servicio.dejarDeEscuchar(this.canal);
    }
  }
}
