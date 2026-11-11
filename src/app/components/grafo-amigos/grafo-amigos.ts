import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatosGrafo } from '../../services/datos-grafo';
import { NodoGrafo } from '../../models/nodo-grafo';
import { VistaGrafo } from '../vista-grafo/vista-grafo';

@Component({
  selector: 'app-grafo-amigos',
  imports: [FormsModule, VistaGrafo],
  templateUrl: './grafo-amigos.html',
  styleUrl: './grafo-amigos.scss',
})
export class GrafoAmigos {
  datos = inject(DatosGrafo);

  mensaje = signal('');
  tipoMensaje = signal<'error' | 'exito'>('exito');

  nombreCiudad = signal('');
  nombrePersona = signal('');
  edadPersona = signal('');
  ciudadPersona = signal('');
  amigoA = signal('');
  amigoB = signal('');
  nodoEliminar = signal('');

  ciudadConsulta = signal('c1');
  seleccionadoId = signal('');

  mostrarResultado(error: string, exito: string): boolean {
    if (error !== '') {
      this.tipoMensaje.set('error');
      this.mensaje.set(error);
      return false;
    }

    this.tipoMensaje.set('exito');
    this.mensaje.set(exito);
    return true;
  }

  agregarCiudad(): void {
    const error = this.datos.agregarCiudad(this.nombreCiudad());

    if (this.mostrarResultado(error, 'Ciudad agregada.')) {
      this.nombreCiudad.set('');
    }
  }

  agregarPersona(): void {
    const error = this.datos.agregarPersona(
      this.nombrePersona(),
      Number(this.edadPersona()),
      this.ciudadPersona()
    );

    if (this.mostrarResultado(error, 'Persona agregada.')) {
      this.nombrePersona.set('');
      this.edadPersona.set('');
    }
  }

  agregarAmistad(): void {
    const error = this.datos.agregarAmistad(this.amigoA(), this.amigoB());

    if (this.mostrarResultado(error, 'Amistad agregada.')) {
      this.amigoA.set('');
      this.amigoB.set('');
    }
  }

  eliminarNodo(): void {
    const id = this.nodoEliminar();
    const error = this.datos.eliminar(id);

    if (this.mostrarResultado(error, 'Nodo eliminado.')) {
      this.nodoEliminar.set('');

      if (this.seleccionadoId() === id) {
        this.seleccionadoId.set('');
      }

      if (this.ciudadConsulta() === id) {
        this.ciudadConsulta.set('');
      }
    }
  }

  seleccionarNodo(id: string): void {
    this.seleccionadoId.set(id);
  }

  nodoSeleccionado(): NodoGrafo | undefined {
    return this.datos.grafo.searchNode(this.seleccionadoId());
  }

  nombreCiudadDe(ciudadId: string | undefined): string {
    const ciudad = this.datos.grafo.searchNode(ciudadId ?? '');
    return ciudad ? ciudad.nombre : '';
  }
}
