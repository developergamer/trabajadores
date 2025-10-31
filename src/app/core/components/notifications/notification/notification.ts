import { Component, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, NgClass],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification {
  readonly notifications = inject(NotificationService).notifications;
}
