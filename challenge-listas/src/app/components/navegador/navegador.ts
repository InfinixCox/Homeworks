import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoublyLinkedList, BrowserNode } from '../../lists.model';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navegador.html',
  styleUrls: ['./navegador.css']
})
export class NavegadorComponent implements OnInit {
  historial = new DoublyLinkedList();
  nodoActual: BrowserNode | null = null;

  ngOnInit(): void {
    this.historial.append({
      url: 'https://campusvirtual.uao.edu.co',
      title: 'Campus Virtual UAO',
      visitedTime: '07:30 AM'
    });
    this.historial.append({
      url: 'https://github.com',
      title: 'GitHub - Repositorios',
      visitedTime: '08:00 AM'
    });
    this.historial.append({
      url: 'https://discord.com/channels/@me',
      title: 'Discord - Canales',
      visitedTime: '08:45 AM'
    });
    this.historial.append({
      url: 'https://music.youtube.com/',
      title: 'YouTube Music',
      visitedTime: '09:15 AM'
    });
    this.historial.append({
      url: 'https://google.com',
      title: 'Buscador Google',
      visitedTime: '09:30 AM'
    });

    this.nodoActual = this.historial.tail;
  }

  retroceder(): void {
    if (this.nodoActual && this.nodoActual.prev) {
      this.nodoActual = this.nodoActual.prev;
    }
  }

  avanzar(): void {
    if (this.nodoActual && this.nodoActual.next) {
      this.nodoActual = this.nodoActual.next;
    }
  }
}