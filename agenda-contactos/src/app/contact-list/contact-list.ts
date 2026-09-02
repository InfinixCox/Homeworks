import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContactItem } from '../contact-item/contact-item';
import { Contacto } from '../app';

@Component({
  selector: 'app-contact-list',
  imports: [ContactItem],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList {
  @Input() contactos: Contacto[] = [];
  @Output() eliminar = new EventEmitter<number>();

  onEliminar(id: number) {
    this.eliminar.emit(id);
  }
}