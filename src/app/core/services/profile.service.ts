import { Injectable, computed, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Perfil } from '../../features/auth/models/perfil.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  readonly perfil = signal<Perfil | null>(null);

  readonly rolId = computed(() => this.perfil()?.rol_id ?? null);
  readonly zonaId = computed(() => this.perfil()?.zona_id ?? null);
  readonly personaId = computed(() => this.perfil()?.persona_id ?? null);

  async loadProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('perfiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error al cargar perfil:', error);
      this.perfil.set(null);
    } else {
      this.perfil.set(data as Perfil);
    }
  }

  clearProfile() {
    this.perfil.set(null);
  }
}
