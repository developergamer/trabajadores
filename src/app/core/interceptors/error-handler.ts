import { ErrorHandler, Injectable, inject } from '@angular/core';
import { AuditService } from '../services/audit.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly audit = inject(AuditService);
  private readonly notify = inject(NotificationService);

  handleError(error: any): void {
    console.error('🚨 Error global:', error);

    this.notify.error('Ocurrió un error inesperado');
    this.audit.logError(error, 'Error Global');
  }
}
