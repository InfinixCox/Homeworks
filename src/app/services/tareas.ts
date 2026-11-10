import { Injectable, inject } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Supabase } from './supabase';

@Injectable({
  providedIn: 'root',
})
export class Tareas {
  private sb = inject(Supabase).client;

  listar() {
    return this.sb.from('tareas').select('*').order('created_at', { ascending: false });
  }

  crear(titulo: string) {
    return this.sb.from('tareas').insert({ titulo: titulo });
  }

  editar(id: number, titulo: string) {
    return this.sb.from('tareas').update({ titulo: titulo }).eq('id', id);
  }

  completar(id: number, valor: boolean) {
    return this.sb.from('tareas').update({ completada: valor }).eq('id', id);
  }

  borrar(id: number) {
    return this.sb.from('tareas').delete().eq('id', id);
  }

  escuchar(alCambiar: () => void) {
    return this.sb
      .channel('tareas-ng-' + Date.now())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tareas' }, alCambiar)
      .subscribe();
  }

  dejarDeEscuchar(canal: RealtimeChannel) {
    return this.sb.removeChannel(canal);
  }
}
