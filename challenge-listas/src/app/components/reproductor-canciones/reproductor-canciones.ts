import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleLinkedList, SongNode } from '../../lists.model';

@Component({
  selector: 'app-reproductor-canciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reproductor-canciones.html',
  styleUrls: ['./reproductor-canciones.css']
})
export class ReproductorCancionesComponent implements OnInit {
  listaCanciones = new SimpleLinkedList();
  nodoActual: SongNode | null = null;

  ngOnInit(): void {
    this.listaCanciones.append({ 
      title: 'Cómo Lo Hizo', 
      artist: 'Silvestre Dangond', 
      duration: '4:05' 
    });
    this.listaCanciones.append({ 
      title: 'Ni Siquiera', 
      artist: 'Antonio Cartagena', 
      duration: '5:03' 
    });
    this.listaCanciones.append({ 
      title: 'BbY WOW', 
      artist: 'Karol G', 
      duration: '3:46' 
    });
    this.listaCanciones.append({ 
      title: 'Ay Amor', 
      artist: 'Guayacán Orquesta', 
      duration: '4:17' 
    });
    this.listaCanciones.append({ 
      title: 'La Pregunta', 
      artist: 'J Alvarez', 
      duration: '4:30' 
    });

    this.nodoActual = this.listaCanciones.head;
  }

  siguienteCancion(): void {
    if (this.nodoActual && this.nodoActual.next) {
      this.nodoActual = this.nodoActual.next;
    }
  }

  reiniciarLista(): void {
    this.nodoActual = this.listaCanciones.head;
  }
}