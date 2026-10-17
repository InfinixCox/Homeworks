import { Component } from '@angular/core';

@Component({
  selector: 'app-cola-cajero',
  imports: [],
  templateUrl: './cola-cajero.html',
  styleUrl: './cola-cajero.css'
})
export class ColaCajero {
  nombre = '';
  monto = '';
  mensaje = '';
  personaAtendida = '';

  cola = [
    { nombre: 'Persona uno', monto: '50000', fechaLlegada: this.generarFecha() },
    { nombre: 'Persona dos', monto: '120000', fechaLlegada: this.generarFecha() },
    { nombre: 'Persona tres', monto: '80000', fechaLlegada: this.generarFecha() }
  ];

  constructor() {
    this.ordenarCola();
  }

  generarFecha(): number {
    const minutos = Math.floor(Math.random() * 60);
    return Date.now() - minutos * 60000;
  }

  mostrarHora(fecha: number): string {
    return new Date(fecha).toLocaleTimeString();
  }

  ordenarCola(): void {
    this.cola.sort((a, b) => a.fechaLlegada - b.fechaLlegada);
  }

  capturarNombre(evento: any): void {
    this.nombre = evento.target.value;
  }

  capturarMonto(evento: any): void {
    this.monto = evento.target.value;
  }

  enqueuePersona(): void {
    if (this.nombre === '' || this.monto === '') {
      this.mensaje = 'Completa el nombre y el monto a retirar.';
      return;
    }

    this.cola.push({
      nombre: this.nombre,
      monto: this.monto,
      fechaLlegada: this.generarFecha()
    });

    this.ordenarCola();

    this.nombre = '';
    this.monto = '';
    this.mensaje = 'Persona agregada a la cola.';
  }

  dequeuePersona(): void {
    if (this.cola.length === 0) {
      this.mensaje = 'La cola está vacía.';
      return;
    }

    const atendida = this.cola.shift();

    if (atendida) {
      this.personaAtendida = atendida.nombre + ' retiró $' + atendida.monto;
    }

    this.mensaje = 'Se atendió a la primera persona de la cola.';
  }
}