import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';


@Component({
  selector: 'app-global-loader',
  imports: [CommonModule],
  templateUrl: './global-loader.html',
  styleUrl: './global-loader.css',
})
export class GlobalLoader {
  readonly loader = inject(LoaderService);
}
