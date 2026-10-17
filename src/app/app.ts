import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuLateral } from './components/menu-lateral/menu-lateral';

@Component({
  selector: 'app-root',
  imports: [MenuLateral, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}