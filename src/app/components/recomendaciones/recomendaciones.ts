import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Musica } from '../../services/musica';
import { Cancion } from '../../models/cancion';

@Component({
  selector: 'app-recomendaciones',
  imports: [FormsModule],
  templateUrl: './recomendaciones.html',
  styleUrl: './recomendaciones.scss',
})
export class Recomendaciones {
  musica = inject(Musica);

  seleccionada = signal('');
  relacionadas = signal<Cancion[]>([]);

  tituloA = signal('');
  tituloB = signal('');
  error = signal('');
  exito = signal('');

  cambiarSeleccion(titulo: string): void {
    this.seleccionada.set(titulo);
    this.relacionadas.set(this.musica.relacionadas(titulo));
  }

  conectar(): void {
    this.exito.set('');
    const mensaje = this.musica.conectar(this.tituloA(), this.tituloB());
    this.error.set(mensaje);

    if (mensaje === '') {
      this.exito.set(`"${this.tituloA()}" y "${this.tituloB()}" ahora están relacionadas.`);
      this.tituloA.set('');
      this.tituloB.set('');
      this.cambiarSeleccion(this.seleccionada());
    }
  }
}
