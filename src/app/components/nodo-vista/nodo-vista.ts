import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Nodo } from '../../models/nodo';

@Component({
  selector: 'app-nodo-vista',
  imports: [],
  templateUrl: './nodo-vista.html',
  styleUrl: './nodo-vista.css'
})
export class NodoVista {
  @Input() nodo!: Nodo;
  @Input() seleccionadoId: string = '';

  @Output() seleccionar = new EventEmitter<Nodo>();
}