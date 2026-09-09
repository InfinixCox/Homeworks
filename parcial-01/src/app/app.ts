import { Component, ViewChild } from '@angular/core';
import { PacientesEspera } from './components/pacientes-espera/pacientes-espera';
import { Medicos } from './components/medicos/medicos';
import { HistorialAtencion } from './components/historial-atencion/historial-atencion';
import { ComiteAdmin } from './components/comite-admin/comite-admin';
import { Paciente } from './models/paciente_espera.model';

@Component({
  selector: 'app-root',
  imports: [PacientesEspera, Medicos, HistorialAtencion, ComiteAdmin],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild(Medicos) componenteMedicos!: Medicos;
  @ViewChild(HistorialAtencion) componenteHistorial!: HistorialAtencion;

  alAtenderPaciente(paciente: Paciente): void {
    const medicoActivo = this.componenteMedicos.obtenerMedicoActivo();
    const nombreMedico = medicoActivo ? medicoActivo.nombre : 'Medico de Turno';

    this.componenteHistorial.registrarAtencion(paciente.nombre, nombreMedico);
  }
}