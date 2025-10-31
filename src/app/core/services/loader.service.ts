import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private readonly activeRequests = signal(0);

  readonly isLoading = computed(() => this.activeRequests() > 0);

  show() {
    this.activeRequests.update(v => v + 1);
  }

  hide() {
    this.activeRequests.update(v => Math.max(0, v - 1));
  }

  reset() {
    this.activeRequests.set(0);
  }
}
