import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
  effect,
  signal
} from '@angular/core';
import { PermisosService } from '../../core/services/permisos.service';

@Directive({
  selector: '[tienePermiso]',
  standalone: true
})
export class TienePermisoDirective {
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly permisosService = inject(PermisosService);

  // Signal para almacenar el permiso actual
  private permiso = signal<string | null>(null);

  constructor() {
    // Se ejecuta una sola vez
    effect(() => {
      const permisoActual = this.permiso();
      const tiene = permisoActual
        ? this.permisosService.tienePermiso(permisoActual)
        : false;

      this.viewContainer.clear();

      if (tiene) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  @Input()
  set tienePermiso(valor: string) {
    this.permiso.set(valor);
  }
}
