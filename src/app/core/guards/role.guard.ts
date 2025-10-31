// 📁 src/app/core/guards/role.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermisosService } from '../services/permisos.service';
import { SessionService } from '../services/session.service';

export const roleGuard: CanActivateFn = (route) => {
  const permisos = inject(PermisosService);
  const session = inject(SessionService);
  const router = inject(Router);

  const requiredRol = route.data?.['rol'] as string | undefined;
  const requiredPermiso = route.data?.['permiso'] as string | undefined;
  const usuario = session.usuario();

  // Si no hay usuario autenticado
  if (!usuario) {
    router.navigateByUrl('/login');
    return false;
  }

  // Verificar rol
  if (requiredRol && !permisos.tieneRol(requiredRol)) {
    console.warn(`🚫 Acceso denegado: se requiere rol ${requiredRol}`);
    router.navigateByUrl('/unauthorized');
    return false;
  }

  // Verificar permiso
  if (requiredPermiso && !permisos.tienePermiso(requiredPermiso)) {
    console.warn(`🚫 Acceso denegado: falta permiso ${requiredPermiso}`);
    router.navigateByUrl('/unauthorized');
    return false;
  }

  // ✅ Si pasa todas las verificaciones
  return true;
};
