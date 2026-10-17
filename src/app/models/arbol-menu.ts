import { NodoMenu } from './nodo-menu';
import { Perfil } from '../components/perfil/perfil';
import { Configuracion } from '../components/configuracion/configuracion';
import { Ayuda } from '../components/ayuda/ayuda';

export class ArbolMenu {
  raiz: NodoMenu;

  constructor() {
    this.raiz = new NodoMenu('Menú', '', null);

    const perfil = new NodoMenu(
      'Perfil',
      'perfil',
      Perfil
    );

    const configuracion = new NodoMenu(
      'Configuración',
      'configuracion',
      Configuracion
    );

    const cuenta = new NodoMenu(
      'Cuenta',
      'configuracion/cuenta',
      Configuracion
    );

    const seguridad = new NodoMenu(
      'Seguridad',
      'configuracion/seguridad',
      Configuracion
    );

    const ayuda = new NodoMenu(
      'Ayuda',
      'ayuda',
      Ayuda
    );

    const preguntas = new NodoMenu(
      'Preguntas frecuentes',
      'ayuda/preguntas',
      Ayuda
    );

    const contacto = new NodoMenu(
      'Contacto',
      'ayuda/contacto',
      Ayuda
    );

    configuracion.agregarHijo(cuenta);
    configuracion.agregarHijo(seguridad);

    ayuda.agregarHijo(preguntas);
    ayuda.agregarHijo(contacto);

    this.raiz.agregarHijo(perfil);
    this.raiz.agregarHijo(configuracion);
    this.raiz.agregarHijo(ayuda);
  }
}