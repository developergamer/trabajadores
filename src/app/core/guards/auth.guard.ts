// 📁 src/app/core/guards/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);

  const usuario = session.usuario();

  if (!usuario) {
    console.warn('🚫 Acceso bloqueado: usuario no autenticado');
    router.navigateByUrl('/login');
    return false;
  }

  return true; // ✅ Usuario autenticado, continuar
};
