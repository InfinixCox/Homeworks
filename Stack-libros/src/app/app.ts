import { Component } from '@angular/core';
import { PilaLibros } from './components/pila-libros/pila-libros';

@Component({
  selector: 'app-root',
  imports: [PilaLibros],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}