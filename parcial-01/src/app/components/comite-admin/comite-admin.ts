import { Component, OnInit } from '@angular/core';
import { ListaCircularDobleComite, NodoCircularDobleComite } from '../../models/comite_admin.model';

@Component({
  selector: 'app-comite-admin',
  imports: [],
  templateUrl: './comite-admin.html',
  styleUrl: './comite-admin.css'
})
export class ComiteAdmin implements OnInit {
  listaComite = new ListaCircularDobleComite();
  miembroActual: NodoCircularDobleComite | null = null;

  ngOnInit(): void {
    this.listaComite.append({ id: 1, nombre: 'Dra. Salazar', cargo: 'Directora General' });
    this.listaComite.append({ id: 2, nombre: 'Ing. Martinez', cargo: 'Jefe de Operaciones' });
    this.listaComite.append({ id: 3, nombre: 'Lic. Restrepo', cargo: 'Auditor Medico' });

    this.miembroActual = this.listaComite.head;
  }

  rotarSiguiente(): void {
    if (this.miembroActual && this.miembroActual.next) {
      this.miembroActual = this.miembroActual.next;
    }
  }

  rotarAnterior(): void {
    if (this.miembroActual && this.miembroActual.prev) {
      this.miembroActual = this.miembroActual.prev;
    }
  }
}