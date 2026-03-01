import { Component } from '@angular/core';
import UsersDTO from '../../models/dto/usersDTO.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-app-header',
  imports: [],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {

  isLoggedIn = false;
  currentUser: UsersDTO | null = null;
  isLoadingUser = true;
  isChatOpen: boolean = false;

  constructor(
    private router: Router,
    private _authService: AuthService,
  ) { }


  ngOnInit(): void {
    this._authService.isAuthenticated().subscribe((isAuth) => {
      this.isLoggedIn = isAuth;
    });

    this._authService.getLoggedUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isLoadingUser = false;
      },
      error: () => {
        this.currentUser = null;
        this.isLoadingUser = false;
      },
    });
  }


    onSpecialButtonClick(): void {
    this._authService.isAuthenticated().subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/add-park']);
        } else {
          this.router.navigate(['/sign-in']);
        }
      },
    });
  }

  onSignOut(): void {
    this._authService.signOut().subscribe({
      next: () => this.router.navigate(['/sign-in']),
      error: () => alert('שגיאה בהתנתקות'),
    });
  }

  onSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  onSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

    goToRecommended(): void {
    this.router.navigate(['/recommended']);
  }
  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

}
