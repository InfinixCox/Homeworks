import { Component } from '@angular/core';
import { ArbolNumeros } from './components/arbol-numeros/arbol-numeros';

@Component({
  selector: 'app-root',
  imports: [ArbolNumeros],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}