// 📁 src/app/shared/components/menu/menu.config.ts

export interface MenuItem {
  label: string;
  icon?: string; // Puedes usar clases Tailwind o SVG
  route?: string;
  permiso?: string; // permiso mínimo requerido    
  children?: MenuItem[]; // para submenús
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    route: '/dashboard',
    permiso: 'ver_dashboard'
  },
  {
    label: 'Usuarios',
    icon: 'i-heroicons-user-group',
    permiso: 'ver_usuarios',
    children: [
      {
        label: 'Lista de usuarios',
        route: '/usuarios/lista',
        permiso: 'ver_usuarios'
      },
      {
        label: 'Registrar usuario',
        route: '/usuarios/registrar',
        permiso: 'crear_usuarios'
      }
    ]
  },
  {
    label: 'Reportes',
    icon: 'i-heroicons-chart-bar',
    route: '/reportes',
    permiso: 'ver_reportes'
  }
];
