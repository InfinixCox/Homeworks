import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-item',
  imports: [],
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css'
})

export class ContactItem {
  @Input() id!: number;
  @Input() nombre = '';
  @Input() telefono = '';

  @Output() eliminar = new EventEmitter<number>();

  onEliminar() {
    this.eliminar.emit(this.id);
  }
}