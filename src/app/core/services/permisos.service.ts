// 📁 src/app/core/services/permisos.service.ts

import { Injectable, computed, inject, signal, effect } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { SessionService } from './session.service';
import { PerfilConRol } from '../../features/auth/models/perfil.model';

@Injectable({ providedIn: 'root' })
export class PermisosService {
  private readonly session = inject(SessionService);
  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
  );

  private readonly permisosUsuario = signal<string[]>([]);
  private readonly rolUsuario = signal<string | null>(null);

  readonly permisos = computed(() => this.permisosUsuario());
  readonly rol = computed(() => this.rolUsuario());

  constructor() {
    effect(() => {
      const user = this.session.usuario();
      if (user) {
        this.cargarPermisos(user.id);
      } else {
        this.permisosUsuario.set([]);
        this.rolUsuario.set(null);
      }
    });
  }

  private async cargarPermisos(userId: string) {
    const { data, error } = await this.supabase
      .from('perfiles')
      .select(`
        rol:roles (
          codigo,
          permisos
        )
      `)
      .eq('id', userId)
      .single<PerfilConRol>();

    if (error) {
      console.error('❌ Error cargando permisos:', error.message);
      return;
    }

    const permisos = data?.rol?.permisos ?? [];
    const rol = data?.rol?.codigo ?? null;

    this.permisosUsuario.set(permisos);
    this.rolUsuario.set(rol);

    console.log('✅ Permisos cargados:', permisos);
    console.log('✅ Rol:', rol);
  }

  tienePermiso(permiso: string): boolean {
    return this.permisosUsuario().includes(permiso);
  }

  tieneRol(codigoRol: string): boolean {
    return this.rolUsuario() === codigoRol;
  }
}
