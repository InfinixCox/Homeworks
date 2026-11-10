import { Component, OnInit, inject, signal } from '@angular/core';
import { Supabase } from '../../services/supabase';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {
  private sb = inject(Supabase).client;
  auth = inject(Auth);

  url = signal('');
  mensaje = signal('');
  pendiente = signal(false);

  async ngOnInit(): Promise<void> {
    await this.cargarAvatar();
  }

  async cargarAvatar(): Promise<void> {
    const { data: { user } } = await this.sb.auth.getUser();

    if (!user) {
      return;
    }

    const { data, error } = await this.sb.storage
      .from('avatars')
      .list(user.id, { limit: 1, sortBy: { column: 'created_at', order: 'desc' } });

    if (error) {
      this.mensaje.set(error.message);
      return;
    }

    if (data.length > 0) {
      const ruta = user.id + '/' + data[0].name;
      this.url.set(this.sb.storage.from('avatars').getPublicUrl(ruta).data.publicUrl);
    }
  }

  async subir(evento: any): Promise<void> {
    this.mensaje.set('');
    const archivo = evento.target.files[0];

    if (!archivo) {
      return;
    }

    if (!archivo.type.startsWith('image/')) {
      this.mensaje.set('Solo se permiten imágenes.');
      return;
    }

    if (archivo.size > 2 * 1024 * 1024) {
      this.mensaje.set('La imagen no puede pesar más de 2 MB.');
      return;
    }

    const { data: { user } } = await this.sb.auth.getUser();

    if (!user) {
      return;
    }

    this.pendiente.set(true);

    const extension = archivo.name.split('.').pop();
    const ruta = `${user.id}/${Date.now()}.${extension}`;

    const { error } = await this.sb.storage
      .from('avatars')
      .upload(ruta, archivo, { upsert: true });

    if (error) {
      this.mensaje.set(error.message);
    } else {
      this.url.set(this.sb.storage.from('avatars').getPublicUrl(ruta).data.publicUrl);
    }

    this.pendiente.set(false);
  }
}
