import { Component } from '@angular/core';
import { ArbolBinario } from '../../models/arbol-binario';
import { NodoArbol } from '../nodo-arbol/nodo-arbol';

@Component({
  selector: 'app-arbol-numeros',
  imports: [NodoArbol],
  templateUrl: './arbol-numeros.html',
  styleUrl: './arbol-numeros.css'
})
export class ArbolNumeros {
  arbol = new ArbolBinario();

  valor = '';
  valorBuscar = '';
  mensaje = '';
  resultadoBusqueda = '';

  preorden: number[] = [];
  inorden: number[] = [];
  postorden: number[] = [];

  constructor() {
    const numeros = [25, 15, 50, 10, 22, 35, 70, 12, 18, 44, 66, 90, 11, 64];

    for (let i = 0; i < numeros.length; i++) {
      this.arbol.insertar(numeros[i]);
    }

    this.imprimirRecorridos();
  }

  capturarValor(evento: any): void {
    this.valor = evento.target.value;
  }

  capturarValorBuscar(evento: any): void {
    this.valorBuscar = evento.target.value;
  }

  insertarNumero(): void {
    if (this.valor === '') {
      this.mensaje = 'Escribe un número.';
      return;
    }

    const numero = Number(this.valor);

    if (this.arbol.insertar(numero)) {
      this.mensaje = 'Se insertó el ' + numero + ' en el árbol.';
      this.imprimirRecorridos();
    } else {
      this.mensaje = 'El ' + numero + ' ya está en el árbol.';
    }

    this.valor = '';
  }

  buscarNumero(): void {
    if (this.valorBuscar === '') {
      this.resultadoBusqueda = 'Escribe un número para buscar.';
      return;
    }

    const numero = Number(this.valorBuscar);

    if (this.arbol.buscar(numero)) {
      this.resultadoBusqueda = 'El ' + numero + ' sí está en el árbol.';
    } else {
      this.resultadoBusqueda = 'El ' + numero + ' no está en el árbol.';
    }
  }

  imprimirRecorridos(): void {
    console.log('PreOrden:');
    this.arbol.recorrido = [];
    this.arbol.preorden(this.arbol.raiz);
    this.preorden = this.arbol.recorrido;

    console.log('InOrden:');
    this.arbol.recorrido = [];
    this.arbol.inorden(this.arbol.raiz);
    this.inorden = this.arbol.recorrido;

    console.log('PostOrden:');
    this.arbol.recorrido = [];
    this.arbol.postorden(this.arbol.raiz);
    this.postorden = this.arbol.recorrido;
  }
}