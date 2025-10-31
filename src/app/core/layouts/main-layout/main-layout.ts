import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MenuComponent } from '../../../shared/components/menu/menu/menu';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterOutlet, MenuComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MainLayout {
  private readonly session = inject(SessionService);
  private readonly router = inject(Router);

  readonly usuario = computed(() => this.session.usuario());

  logout() {
    this.session.logout();
    this.router.navigateByUrl('/login');
  }
}

