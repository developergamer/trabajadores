import { Injectable, inject } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { SessionService } from './session.service';
import { NotificationService } from './notification.service';

export interface AuditLog {
  usuario_id?: string;
  tabla_afectada: string;
  registro_afectado?: string;
  accion: 'INSERT' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'ERROR' | 'VIEW';
  valores_anteriores?: any;
  valores_nuevos?: any;
  descripcion?: string;
  ip_address?: string;
  user_agent?: string;
}

@Injectable({ providedIn: 'root' })
export class AuditService {
  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
  );

  private readonly session = inject(SessionService);
  private readonly notify = inject(NotificationService);

  /**
   * Registra una acción en la tabla log_cambios
   */
  async log(action: AuditLog) {
    try {
      const user = this.session.usuario();
      const userAgent = navigator.userAgent;

      const logEntry = {
        usuario_id: user?.id ?? null,
        tabla_afectada: action.tabla_afectada,
        registro_afectado: action.registro_afectado ?? null,
        accion: action.accion,
        valores_anteriores: action.valores_anteriores ?? null,
        valores_nuevos: action.valores_nuevos ?? null,
        ip_address: action.ip_address ?? null,
        user_agent: userAgent,
        created_at: new Date().toISOString(),
      };

      const { error } = await this.supabase.from('log_cambios').insert(logEntry);

      if (error) {
        console.error('❌ Error al registrar log:', error.message);
        this.notify.warning('Error registrando evento en auditoría');
      } else {
        console.info('🧾 Log registrado:', logEntry);
      }
    } catch (err: any) {
      console.error('Error inesperado en AuditService:', err.message);
    }
  }

  /**
   * Shortcut para eventos de login/logout
   */
  async logAuthEvent(type: 'LOGIN' | 'LOGOUT', description?: string) {
    await this.log({
      tabla_afectada: 'auth.users',
      accion: type,
      descripcion: description ?? (type === 'LOGIN' ? 'Inicio de sesión' : 'Cierre de sesión'),
    });
  }

  /**
   * Shortcut para errores capturados en la app
   */
  async logError(error: Error, context: string) {
    await this.log({
      tabla_afectada: 'app_runtime',
      accion: 'ERROR',
      descripcion: `${context}: ${error.message}`,
      valores_nuevos: { stack: error.stack },
    });
  }
}
