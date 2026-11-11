import { Component, EventEmitter, Input, OnDestroy, Output, effect, inject, signal } from '@angular/core';
import * as d3 from 'd3';
import { DatosGrafo } from '../../services/datos-grafo';

interface Punto extends d3.SimulationNodeDatum {
  id: string;
  tipo: 'persona' | 'ciudad';
  etiqueta: string;
}

interface Enlace extends d3.SimulationLinkDatum<Punto> {
  amistad: boolean;
}

interface Linea {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  amistad: boolean;
}

@Component({
  selector: 'app-vista-grafo',
  imports: [],
  templateUrl: './vista-grafo.html',
  styleUrl: './vista-grafo.scss',
})
export class VistaGrafo implements OnDestroy {
  private datos = inject(DatosGrafo);
  private simulacion: d3.Simulation<Punto, Enlace> | null = null;
  private ultimosPuntos: Punto[] = [];

  @Input() seleccionadoId = '';
  @Output() seleccionar = new EventEmitter<string>();

  ancho = 640;
  alto = 420;

  puntos = signal<Punto[]>([]);
  lineas = signal<Linea[]>([]);

  constructor() {
    effect(() => {
      this.datos.version();
      this.dibujar();
    });
  }

  dibujar(): void {
    const anteriores: { [id: string]: Punto } = {};
    // Se usa un arreglo normal (no el signal) para que el effect no se vuelva a ejecutar en cada tick.
    const actuales = this.ultimosPuntos;

    for (let i = 0; i < actuales.length; i++) {
      anteriores[actuales[i].id] = actuales[i];
    }

    const grafo = this.datos.grafo;
    const nodos: Punto[] = [];

    for (let i = 0; i < grafo.nodes.length; i++) {
      const nodo = grafo.nodes[i];
      const punto: Punto = {
        id: nodo.id,
        tipo: nodo.tipo,
        etiqueta: nodo.tipo === 'persona' ? nodo.nombre + ' (' + nodo.edad + ')' : nodo.nombre
      };

      const previo = anteriores[nodo.id];

      if (previo) {
        punto.x = previo.x;
        punto.y = previo.y;
      }

      nodos.push(punto);
    }

    const enlaces: Enlace[] = [];

    for (let i = 0; i < grafo.nodes.length; i++) {
      const origen = grafo.nodes[i];
      const vecinos = grafo.adjList[origen.id];

      for (let j = 0; j < vecinos.length; j++) {
        const destino = grafo.searchNode(vecinos[j]);

        // Cada arista aparece dos veces en la lista de adyacencia; se dibuja solo una vez.
        if (destino && origen.id < destino.id) {
          enlaces.push({
            source: origen.id,
            target: destino.id,
            amistad: origen.tipo === 'persona' && destino.tipo === 'persona'
          });
        }
      }
    }

    if (this.simulacion !== null) {
      this.simulacion.stop();
    }

    this.simulacion = d3
      .forceSimulation<Punto>(nodos)
      .force(
        'enlaces',
        d3.forceLink<Punto, Enlace>(enlaces)
          .id(p => p.id)
          .distance(e => (e.amistad ? 140 : 80))
      )
      .force('repulsion', d3.forceManyBody().strength(-260))
      .force('centro', d3.forceCenter(this.ancho / 2, this.alto / 2))
      .force('choque', d3.forceCollide<Punto>(p => (p.tipo === 'ciudad' ? 40 : 28)))
      .on('tick', () => this.actualizarPosiciones(nodos, enlaces));
  }

  actualizarPosiciones(nodos: Punto[], enlaces: Enlace[]): void {
    // Márgenes para que los nodos y sus nombres no se salgan del dibujo.
    const margenLado = 60;
    const margenArriba = 30;
    const margenAbajo = 50;

    for (let i = 0; i < nodos.length; i++) {
      const p = nodos[i];
      p.x = Math.max(margenLado, Math.min(this.ancho - margenLado, p.x ?? 0));
      p.y = Math.max(margenArriba, Math.min(this.alto - margenAbajo, p.y ?? 0));
    }

    const lineas: Linea[] = [];

    for (let i = 0; i < enlaces.length; i++) {
      const a = enlaces[i].source as Punto;
      const b = enlaces[i].target as Punto;

      lineas.push({
        x1: a.x ?? 0,
        y1: a.y ?? 0,
        x2: b.x ?? 0,
        y2: b.y ?? 0,
        amistad: enlaces[i].amistad
      });
    }

    this.ultimosPuntos = nodos;
    this.lineas.set(lineas);
    this.puntos.set(nodos.slice());
  }

  ngOnDestroy(): void {
    if (this.simulacion !== null) {
      this.simulacion.stop();
    }
  }
}
