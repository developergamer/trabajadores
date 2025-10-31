import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-auth-layout',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayout {

}
