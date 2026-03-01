import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  onSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  onSignUp(): void {
    this.router.navigate(['/sign-up']);
  }


  goToRecommended(): void {
    this.router.navigate(['/recommended']);
  }

  goToAllParks(): void {
    this.router.navigate(['/parks-list']);
  }
}
