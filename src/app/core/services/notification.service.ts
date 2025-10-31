import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  timeout?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _notifications = signal<Notification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  private idCounter = 0;

  private add(type: NotificationType, message: string, timeout = 3000) {
    const id = ++this.idCounter;
    const notif: Notification = { id, type, message, timeout };
    this._notifications.update(list => [...list, notif]);

    setTimeout(() => this.remove(id), timeout);
  }

  success(message: string, timeout = 3000) {
    this.add('success', message, timeout);
  }

  error(message: string, timeout = 4000) {
    this.add('error', message, timeout);
  }

  info(message: string, timeout = 3000) {
    this.add('info', message, timeout);
  }

  warning(message: string, timeout = 3500) {
    this.add('warning', message, timeout);
  }

  remove(id: number) {
    this._notifications.update(list => list.filter(n => n.id !== id));
  }
}
