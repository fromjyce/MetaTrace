import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-upload',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import dependencies directly here
  templateUrl: './upload.component.html', // Reference to the HTML template
  styleUrls: ['./upload.component.css'], // Reference to the CSS
})
export class UploadComponent {
  selectedFile: File | null = null; // Store selected file
  uploadMessage: string | null = null; // Store upload status

  // Method triggered when a file is selected
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Method triggered when the Upload button is clicked
  uploadFile(): void {
    if (this.selectedFile) {
      this.uploadMessage = `File "${this.selectedFile.name}" uploaded successfully!`;
    } else {
      this.uploadMessage = 'No file selected!';
    }
  }
}
