import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true, // This line makes it a standalone component
  imports: [CommonModule]  // Add CommonModule here
})
export class DashboardComponent {
  metadata = [{ name: 'Device 1', device: 'Phone' },
    { name: 'Device 2', device: 'Tablet' },
    { name: 'Device 3', device: 'Laptop' }];
    constructor() {
        console.log(this.metadata);  // Check if metadata is populated correctly
      }
}

