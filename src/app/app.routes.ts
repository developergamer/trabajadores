import { Routes } from '@angular/router';
import { UnauthorizedPageComponent } from './shared/pages/unauthorized-page.component';


import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

// 1. CORREGIDO: Asumiendo que los layouts sí usan el sufijo .component
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { Notification } from './core/components/notifications/notification/notification';



export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      // 2. CORREGIDO: Rutas de autenticación (Eliminado el .component al final)
      { path: 'login', loadComponent: () => import('./features/auth/pages/login/login/login').then(m => m.Login) },
      { path: 'forgot-password', loadComponent: () => import('./features/auth/pages/forgot-password/forgot-password/forgot-password').then(m => m.ForgotPassword) },
      { path: 'reset-password', loadComponent: () => import('./features/auth/pages/reset-password/reset-password/reset-password').then(m => m.ResetPassword) },
    ]
  },
  // 4. OPCIONAL: Redirigir a un lugar más útil
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'login' }
];