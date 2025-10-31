import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  cargando = false;
  error = '';

  async onSubmit() {
    if (this.form.invalid) return;
    this.cargando = true;
    this.error = '';

    try {
      const { email, password } = this.form.getRawValue();
      await this.auth.login(email, password);
      this.router.navigateByUrl('/dashboard');
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.cargando = false;
    }
  }
}