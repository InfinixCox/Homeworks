import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ListaSimplePacientes, Paciente } from '../../models/paciente_espera.model';

@Component({
  selector: 'app-pacientes-espera',
  imports: [],
  templateUrl: './pacientes-espera.html',
  styleUrl: './pacientes-espera.css'
})
export class PacientesEspera implements OnInit {
  listaEspera = new ListaSimplePacientes();

  @Output() pacienteAtendido = new EventEmitter<Paciente>();

  nombreTemp: string = '';
  motivoTemp: string = '';

  ngOnInit(): void {
    this.listaEspera.append({
      id: 1,
      nombre: 'Carlos Mendoza',
      motivo: 'Fiebre alta',
      horaLlegada: 'Turno 1'
    });

    this.listaEspera.append({
      id: 2,
      nombre: 'Laura Gomez',
      motivo: 'Dolor abdominal',
      horaLlegada: 'Turno 2'
    });

    this.listaEspera.append({
      id: 3,
      nombre: 'Andres Ortiz',
      motivo: 'Migrana intensa',
      horaLlegada: 'Turno 3'
    });
  }

  capturaNombre(e: any): void {
    this.nombreTemp = e.target.value;
  }

  capturaMotivo(e: any): void {
    this.motivoTemp = e.target.value;
  }

  agregarPaciente(): void {
    if (this.nombreTemp === '' || this.motivoTemp === '') {
      return;
    }

    const nuevo: Paciente = {
      id: Date.now(),
      nombre: this.nombreTemp,
      motivo: this.motivoTemp,
      horaLlegada: 'Turno ' + (this.listaEspera.length + 1)
    };

    this.listaEspera.append(nuevo);

    this.nombreTemp = '';
    this.motivoTemp = '';
  }

  atenderPaciente(): void {
    const atendido = this.listaEspera.removeHead();
    if (atendido) {
      this.pacienteAtendido.emit(atendido);
    }
  }
}