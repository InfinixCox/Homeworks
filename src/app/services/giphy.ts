import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Gif, RespuestaBusqueda } from '../models/gif';

@Injectable({
  providedIn: 'root',
})
export class Giphy {
  gifs = signal<Gif[]>([]);
  cargando = signal(false);
  error = signal('');

  private controlador: AbortController | null = null;

  async buscar(texto: string): Promise<void> {
    // Si hay una búsqueda pendiente, ya no sirve: se cancela
    this.controlador?.abort();
    this.error.set('');

    const q = texto.trim();
    if (q === '') {
      this.controlador = null;
      this.gifs.set([]);
      this.cargando.set(false);
      return;
    }

    const controlador = new AbortController();
    this.controlador = controlador;
    this.cargando.set(true);

    try {
      const params = new URLSearchParams({
        api_key: environment.giphyApiKey,
        q,
        limit: '25',
        offset: '0',
        rating: 'g',
        lang: 'es',
      });

      const res = await fetch(`${environment.giphyUrl}?${params}`, { signal: controlador.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const respuesta: RespuestaBusqueda = await res.json();
      this.gifs.set(respuesta.data);
    } catch (e) {
      const error = e as Error;
      if (error.name === 'AbortError') return; // Petición cancelada: no es un error real
      this.gifs.set([]);
      this.error.set(`No se pudieron cargar los GIFs: ${error.message}`);
    } finally {
      // Solo la búsqueda más reciente apaga el "Buscando..."
      if (this.controlador === controlador) this.cargando.set(false);
    }
  }
}
