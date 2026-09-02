import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactList } from './contact-list/contact-list';
import { ContactForm } from './contact-form/contact-form';


export interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContactList, ContactForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  cargando = signal(true);
  contactos = signal<Contacto[]>([]);

  constructor() {
    setTimeout(() => {
      this.contactos.set([
        { id: 1, nombre: 'Ana Torres', telefono: '3001234567' },
        { id: 2, nombre: 'Luis Pérez', telefono: '3109876543' }
      ]);
      this.cargando.set(false);
    }, 1500);
  }

  eliminarContacto(id: number) {
    this.contactos.update(lista => lista.filter(c => c.id !== id));
  }

  agregarContacto(contacto: Contacto) {
    this.contactos.update(lista => [...lista, contacto]);
  }

}
