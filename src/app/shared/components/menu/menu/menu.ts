import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';


// 📁 src/app/shared/components/menu/menu.component.ts


import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MENU_ITEMS, MenuItem } from '../menu.config';
import { PermisosService } from '../../../../core/services/permisos.service';



@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
private readonly permisos = inject(PermisosService);


private filtrarMenu(items: MenuItem[]): MenuItem[] {
return items
.filter(item => !item.permiso || this.permisos.tienePermiso(item.permiso))
.map(item => ({
...item,
children: item.children ? this.filtrarMenu(item.children) : undefined
}));
}


readonly menu = computed(() => this.filtrarMenu(MENU_ITEMS));
}