import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPassword {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);

  // You correctly used nonNullable.group here:
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  mensaje = '';
  cargando = false;

  async onSubmit() {
    // 1. Check for form validity
    if (this.form.invalid) return;

    // 2. Safely extract the email (TypeScript knows this is a string)
    const emailValue = this.form.controls.email.value; // Access the control via .controls

    this.cargando = true;
    this.mensaje = '';

    try {
      // 3. Pass the string value
      await this.auth.sendResetLink(emailValue); 
      this.mensaje = '📧 Se ha enviado un correo con las instrucciones.';
    } catch (err: any) {
      this.mensaje = '❌ ' + err.message;
    } finally {
      this.cargando = false;
    }
  }
}
