/*import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
*/
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routes } from './app.routes'; // Correct import

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use the imported 'routes'
  exports: [RouterModule]
})
export class AppRoutingModule {}

// src/app/app.config.ts
export const appConfig = {
  // Your configuration values here
  apiUrl: 'https://api.example.com',
  appTitle: 'My Angular App',
};
