import { Component, Input } from '@angular/core';
import { Nodo } from '../../models/nodo';

@Component({
  selector: 'app-nodo-arbol',
  imports: [],
  templateUrl: './nodo-arbol.html',
  styleUrl: './nodo-arbol.css'
})
export class NodoArbol {
  @Input() nodo!: Nodo;
}