import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  form = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', [Validators.required]]
  });

  mensaje = '';
  cargando = false;

  async onSubmit() {
    if (this.form.invalid) return;
    const { password, confirm } = this.form.getRawValue();

    if (password !== confirm) {
      this.mensaje = '⚠️ Las contraseñas no coinciden.';
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    try {
      await this.auth.updatePassword(password);
      this.mensaje = '✅ Contraseña actualizada correctamente.';
      setTimeout(() => this.router.navigateByUrl('/login'), 2000);
    } catch (err: any) {
      this.mensaje = '❌ ' + err.message;
    } finally {
      this.cargando = false;
    }
  }
}