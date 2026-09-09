import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListaCircularMedicos, NodoCircularMedico, Medico } from '../../models/medicos.model';

@Component({
  selector: 'app-medicos',
  imports: [],
  templateUrl: './medicos.html',
  styleUrl: './medicos.css'
})
export class Medicos implements OnInit, OnDestroy {
  listaMedicos = new ListaCircularMedicos();
  medicoActual: NodoCircularMedico | null = null;
  intervaloId: any;

  ngOnInit(): void {
    this.listaMedicos.append({ id: 1, nombre: 'Dr. Perez', especialidad: 'Urgencias' });
    this.listaMedicos.append({ id: 2, nombre: 'Dra. Gomez', especialidad: 'Pediatria' });
    this.listaMedicos.append({ id: 3, nombre: 'Dr. Rodriguez', especialidad: 'Traumatologia' });

    this.medicoActual = this.listaMedicos.head;

    this.intervaloId = setInterval(() => {
      this.rotarSiguiente();
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
    }
  }

  rotarSiguiente(): void {
    if (this.medicoActual && this.medicoActual.next) {
      this.medicoActual = this.medicoActual.next;
    }
  }

  obtenerMedicoActivo(): Medico | null {
    return this.medicoActual ? this.medicoActual.value : null;
  }
}