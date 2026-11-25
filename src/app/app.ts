import { Component } from '@angular/core';
import { BuscadorCanciones } from './components/buscador-canciones/buscador-canciones';
import { Ranking } from './components/ranking/ranking';
import { Recomendaciones } from './components/recomendaciones/recomendaciones';

@Component({
  selector: 'app-root',
  imports: [BuscadorCanciones, Ranking, Recomendaciones],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
