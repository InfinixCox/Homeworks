import { Component, inject } from '@angular/core';
import { Musica } from '../../services/musica';
import { Cancion } from '../../models/cancion';

@Component({
  selector: 'app-ranking',
  imports: [],
  templateUrl: './ranking.html',
  styleUrl: './ranking.scss',
})
export class Ranking {
  musica = inject(Musica);

  // Ancho de la barra
  porcentaje(cancion: Cancion): number {
    const maximo = this.musica.ranking()[0].reproducciones;
    return maximo === 0 ? 0 : (cancion.reproducciones / maximo) * 100;
  }
}
