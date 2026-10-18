import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuLateral } from '../menu-lateral/menu-lateral';

@Component({
  selector: 'app-pagina-menu',
  imports: [MenuLateral, RouterOutlet],
  templateUrl: './pagina-menu.html',
  styleUrl: './pagina-menu.css'
})
export class PaginaMenu {
}