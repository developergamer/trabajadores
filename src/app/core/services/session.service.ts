import { Injectable, signal, computed } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export type Usuario = {
  id: string;
  email: string;
  [key: string]: any;
};

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey,
    { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
  );

  readonly usuario = signal<Usuario | null>(null);
  readonly isAuthenticated = computed(() => !!this.usuario());

  constructor() {
    this.restoreSession();
    this.listenToAuthChanges();
  }

  private async restoreSession() {
    const { data } = await this.supabase.auth.getSession();
    if (data.session?.user) {
      this.usuario.set({
        id: data.session.user.id,
        email: data.session.user.email ?? '',
        ...data.session.user.user_metadata
      });
    }
  }

  private listenToAuthChanges() {
    this.supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        this.usuario.set({
          id: session.user.id,
          email: session.user.email ?? '',
          ...session.user.user_metadata
        });
      } else {
        this.usuario.set(null);
      }
    });
  }

  async logout() {
    await this.supabase.auth.signOut();
    this.usuario.set(null);
  }
}
