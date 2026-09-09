import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReproductorCancionesComponent } from './components/reproductor-canciones/reproductor-canciones';
import { NavegadorComponent } from './components/navegador/navegador';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    ReproductorCancionesComponent, 
    NavegadorComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  vistaActiva: string = 'canciones';

  cambiarVista(vista: string): void {
    this.vistaActiva = vista;
  }
}