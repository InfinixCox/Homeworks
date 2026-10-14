import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Arbol } from '../../models/arbol';
import { Nodo } from '../../models/nodo';
import { NodoVista } from '../nodo-vista/nodo-vista';
import { Auth } from '../../services/auth';
import { DatosArbol } from '../../services/datos-arbol';

@Component({
  selector: 'app-explorador',
  imports: [NodoVista, FormsModule],
  templateUrl: './explorador.html',
  styleUrl: './explorador.css'
})
export class Explorador implements OnInit {
  auth = inject(Auth);
  private router = inject(Router);
  private datosArbol = inject(DatosArbol);

  arbol = new Arbol();
  nodoSeleccionado: Nodo = this.arbol.raiz;

  nombreNuevo = signal('');
  tipoNuevo = signal('carpeta');
  mensaje = signal('');
  pendiente = signal(false);
  cargado = signal(false);

  ngOnInit(): void {
    this.cargarArbol();
  }

  seleccionarNodo(nodo: Nodo): void {
    this.nodoSeleccionado = nodo;
    this.mensaje.set('');
  }

  async cargarArbol(idSeleccionado: string = 'raiz'): Promise<boolean> {
    this.pendiente.set(true);
    this.cargado.set(false);
    this.mensaje.set('');

    try {
      const registros = await this.datosArbol.obtenerTodos();
      const completo = this.arbol.cargar(registros);

      this.nodoSeleccionado =
        this.arbol.buscarNodo(idSeleccionado) || this.arbol.raiz;

      this.cargado.set(completo);
      this.pendiente.set(false);

      if (!completo) {
        this.mensaje.set(
          'Hay registros que no pudieron incorporarse al árbol.'
        );
      }

      return completo;
    } catch (error: any) {
      this.mensaje.set(
        'No se pudo cargar el árbol: ' + error.message
      );
      this.pendiente.set(false);
      return false;
    }
  }

  async crearNodo() {
    if (this.pendiente()) {
      return;
    }

    this.mensaje.set('');

    const correo = this.auth.usuario();

    if (!this.auth.estaLogueado() || correo === null || correo === '') {
      this.mensaje.set('Debes iniciar sesión para crear elementos.');
      return;
    }

    if (!this.cargado()) {
      this.mensaje.set('Primero debes cargar correctamente el árbol.');
      return;
    }

    if (this.nodoSeleccionado.tipo !== 'carpeta') {
      this.mensaje.set('Un archivo no puede contener otros elementos.');
      return;
    }

    if (this.nombreNuevo() === '') {
      this.mensaje.set('Escribe el nombre del elemento.');
      return;
    }

    if (
      this.tipoNuevo() !== 'carpeta' &&
      this.tipoNuevo() !== 'archivo'
    ) {
      this.mensaje.set('Selecciona un tipo válido.');
      return;
    }

    const padreId = this.nodoSeleccionado.id;
    this.pendiente.set(true);

    try {
      await this.datosArbol.agregar(
        this.nombreNuevo(),
        this.tipoNuevo(),
        correo,
        padreId
      );
    } catch (error: any) {
      this.mensaje.set(
        'No se pudo guardar el elemento: ' + error.message
      );
      this.pendiente.set(false);
      return;
    }

    this.nombreNuevo.set('');

    const completo = await this.cargarArbol(padreId);

    if (completo) {
      this.mensaje.set('Elemento guardado.');
    } else {
      this.mensaje.set(
        'El elemento se guardó, pero la vista no se actualizó correctamente. ' +
        this.mensaje()
      );
    }
  }

  async salir() {
    await this.auth.salir();
    await this.router.navigate(['/login']);
  }
}