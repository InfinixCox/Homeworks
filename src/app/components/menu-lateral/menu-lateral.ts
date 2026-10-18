import { Component } from '@angular/core';
import { ArbolMenu } from '../../models/arbol-menu';
import { NodoMenuVista } from '../nodo-menu-vista/nodo-menu-vista';

@Component({
  selector: 'app-menu-lateral',
  imports: [NodoMenuVista],
  templateUrl: './menu-lateral.html',
  styleUrl: './menu-lateral.css'
})
export class MenuLateral {
  arbol = new ArbolMenu();
}