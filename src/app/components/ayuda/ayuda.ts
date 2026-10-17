import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  imports: [],
  templateUrl: './ayuda.html',
  styleUrl: './ayuda.css'
})
export class Ayuda {
  @Input() titulo = '';
}