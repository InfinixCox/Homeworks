import { Component } from '@angular/core';
import { GrafoAmigos } from './components/grafo-amigos/grafo-amigos';

@Component({
  selector: 'app-root',
  imports: [GrafoAmigos],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
