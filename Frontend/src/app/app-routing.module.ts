// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { routes } from './app.routes'; // Correct import
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'dashboard', component: DashboardComponent },
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use the imported 'routes'
  exports: [RouterModule]
})
export class AppRoutingModule {}
