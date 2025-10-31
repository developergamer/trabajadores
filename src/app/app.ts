import { Component, OnInit, inject } from '@angular/core'; // Import OnInit
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'; // Import Navigation events
import { initFlowbite } from 'flowbite';

import { CommonModule } from '@angular/common';
import { GlobalLoader } from './core/components/global-loader/global-loader'; // Corrected component name
import { LoaderService } from './core/services/loader.service';
import { Notification } from './core/components/notifications/notification/notification';

@Component({
  selector: 'app-root',
  standalone: true, // You likely need this since you have imports
  imports: [CommonModule, RouterOutlet, GlobalLoader, Notification], // Corrected component name
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit { // Implement the OnInit interface
  
  // Use 'private readonly' for injected services
  private readonly router = inject(Router);
  private readonly loader = inject(LoaderService);

  // 1. Lifecycle hook for initialization (Flowbite setup)
  ngOnInit(): void {
    initFlowbite();
    this.setupNavigationLoader();
  }

  // 2. Separate method for clarity and proper event handling
  private setupNavigationLoader(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loader.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loader.hide();
      }
    });
  }

  // NOTE: If you must use a constructor (Angular discourages complex logic here)
  // constructor() { 
  //   // You can initialize Flowbite here if you want it before ngOnInit, but ngOnInit is standard.
  // }
}