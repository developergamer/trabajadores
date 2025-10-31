import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="h-screen flex flex-col justify-center items-center text-center text-gray-700">
      <h1 class="text-4xl font-bold mb-4">🚫 Acceso Denegado</h1>
      <p class="mb-6">No tienes permisos para acceder a esta sección.</p>
      <a routerLink="/dashboard" class="text-blue-600 hover:underline">Volver al inicio</a>
    </div>
  `,
  standalone: true,
})
export class UnauthorizedComponent {
    
}
