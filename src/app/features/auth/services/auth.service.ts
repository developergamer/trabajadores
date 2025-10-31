// 📁 src/app/features/auth/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
  );

  // Inicia sesión con email y contraseña
  async login(email: string, password: string) {
    const { error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  }

  // Enviar correo de recuperación
  async sendResetLink(email: string) {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw new Error(error.message);
  }

  // Establecer nueva contraseña tras redirección
  async updatePassword(newPassword: string) {
    const { error } = await this.supabase.auth.updateUser({ password: newPassword });
    if (error) throw new Error(error.message);
  }

  async logout() {
    await this.supabase.auth.signOut();
  }
}
