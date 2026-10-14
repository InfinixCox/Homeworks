import { Injectable } from '@angular/core';
import { get, push, ref, set } from 'firebase/database';
import { db } from '../firebase.config';
import { RegistroNodo } from '../models/registro-nodo';

@Injectable({
  providedIn: 'root'
})
export class DatosArbol {
  async obtenerTodos(): Promise<RegistroNodo[]> {
    const snapshot = await get(ref(db, 'nodos'));

    if (!snapshot.exists()) {
      return [];
    }

    return Object.entries(snapshot.val()).map(([id, valor]) => ({
      ...(valor as object),
      id
    })) as RegistroNodo[];
  }

  async agregar(
    nombre: string,
    tipo: string,
    correoCreador: string,
    padreId: string
  ) {
    const nuevaReferencia = push(ref(db, 'nodos'));

    await set(nuevaReferencia, {
      nombre,
      tipo,
      correoCreador,
      padreId
    });

    return nuevaReferencia.key;
  }
}