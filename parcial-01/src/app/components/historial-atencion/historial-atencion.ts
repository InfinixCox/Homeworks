import { Component } from '@angular/core';
import { ListaDobleHistorial, NodoDobleHistorial, AtencionHistorial } from '../../models/historial_atencion.model';

@Component({
  selector: 'app-historial-atencion',
  imports: [],
  templateUrl: './historial-atencion.html',
  styleUrl: './historial-atencion.css'
})

export class HistorialAtencion {
  historial = new ListaDobleHistorial();
  nodoActual: NodoDobleHistorial | null = null;

  registrarAtencion(pacienteNombre: string, medicoNombre: string): void {
    const nuevaAtencion: AtencionHistorial = {
      id: Date.now(),
      pacienteNombre: pacienteNombre,
      medicoNombre: medicoNombre,
      horaAtencion: new Date().toLocaleTimeString()
    };

    this.historial.append(nuevaAtencion);

    this.nodoActual = this.historial.tail;
  }

  irAtras(): void {
    if (this.nodoActual && this.nodoActual.prev) {
      this.nodoActual = this.nodoActual.prev;
    }
  }

  irAdelante(): void {
    if (this.nodoActual && this.nodoActual.next) {
      this.nodoActual = this.nodoActual.next;
    }
  }
}