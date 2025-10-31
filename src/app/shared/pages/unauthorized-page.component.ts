import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'unauthorized-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './unauthorized-page.component.html',
})
export class UnauthorizedPageComponent {}
