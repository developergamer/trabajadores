// src/app/core/guards/permisos.guard.ts

import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { PermisosService } from '../services/permisos.service';

export const permisosGuard = (permiso: string): CanActivateFn => {
  return (_route: ActivatedRouteSnapshot) => {
    const router = inject(Router);
    const permisos = inject(PermisosService);

    if (permisos.tienePermiso(permiso)) {
      return true;
    }

    router.navigateByUrl('/unauthorized');
    return false;
  };
};
