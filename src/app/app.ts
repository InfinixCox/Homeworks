import { Component } from '@angular/core';
import { ColaCajero } from './components/cola-cajero/cola-cajero';

@Component({
  selector: 'app-root',
  imports: [ColaCajero],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}