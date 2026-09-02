import { Component, Output, EventEmitter } from '@angular/core';
import { Contacto } from '../app';

@Component({
  selector: 'app-contact-form',
  imports: [],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm {
  nombre = '';
  telefono = '';

  @Output() agregar = new EventEmitter<Contacto>();

  capturarNombre(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.nombre = input.value;
  }

  capturarTelefono(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.telefono = input.value;
  }

  onAgregar() {
    if (!this.nombre.trim() || !this.telefono.trim()) {
      return;
    }

    const nuevoContacto: Contacto = {
      id: Date.now(),
      nombre: this.nombre,
      telefono: this.telefono
    };

    this.agregar.emit(nuevoContacto);
    this.nombre = '';
    this.telefono = '';
  }
}