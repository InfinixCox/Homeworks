import { Component } from '@angular/core';
import { BuscadorProductos } from './components/buscador-productos/buscador-productos';

@Component({
  selector: 'app-root',
  imports: [BuscadorProductos],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
