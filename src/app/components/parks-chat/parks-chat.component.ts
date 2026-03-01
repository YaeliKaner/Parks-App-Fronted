import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParksAiService } from '../../services/parks-ai.service';

@Component({
  selector: 'app-parks-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parks-chat.component.html',
  styleUrl: './parks-chat.component.css'
})
export class ParksChatComponent {

  userPrompt: string = '';
  aiAnswer: string = '';
  isLoading: boolean = false;
  errorMsg: string = '';

  constructor(private parksAiService: ParksAiService) {}

// send(): void {
//   this.errorMsg = '';

//   const prompt = this.userPrompt.trim();
//   if (!prompt) return;

//   this.isLoading = true;

//   this.parksAiService.chat(prompt).subscribe({
//     next: (res: string) => {
//       this.aiAnswer = res || '';
//       this.isLoading = false;

//       // ✨ איפוס שדה הקלט של המשתמש
//       this.userPrompt = '';
//     },
//     error: () => {
//       this.errorMsg = 'An error occurred while contacting the server';
//       this.isLoading = false;
//     }
//   });
// }




  send(): void {
    this.errorMsg = '';

    const prompt = this.userPrompt.trim();
    if (!prompt) return;

    this.isLoading = true;

    this.parksAiService.chat(prompt).subscribe({
      next: (res: string) => {
        this.aiAnswer = res || '';
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'קרתה שגיאה בקריאה לשרת';
        this.isLoading = false;
      }
    });
  }
}
