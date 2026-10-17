import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NodoMenu } from '../../models/nodo-menu';

@Component({
  selector: 'app-nodo-menu-vista',
  imports: [RouterLink],
  templateUrl: './nodo-menu-vista.html',
  styleUrl: './nodo-menu-vista.css'
})
export class NodoMenuVista {
  @Input() nodo!: NodoMenu;
}