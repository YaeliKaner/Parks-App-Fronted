import { Component } from '@angular/core';
import UsersDTO from '../../models/dto/usersDTO.model';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-app-header',
//   imports: [],
//   templateUrl: './app-header.component.html',
//   styleUrl: './app-header.component.css'
// })
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
})
export class AppHeaderComponent {
  isLoggedIn = false;
  currentUser: UsersDTO | null = null;
  isLoadingUser = true;
  isChatOpen: boolean = false;

  constructor(
    private router: Router,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Subscribe to BehaviorSubject for real-time auth state updates
    this._authService.getAuthState().subscribe((isAuth) => {
      this.isLoggedIn = isAuth;
    });

    this._authService.getCurrentUserState().subscribe((user) => {
      this.currentUser = user;
      this.isLoadingUser = false;
    });


    // this._authService.isAuthenticated().subscribe((isAuth) => {
    //   this.isLoggedIn = isAuth;
    // });

    // this._authService.getLoggedUser().subscribe({
    //   next: (user) => {
    //     this.currentUser = user;
    //     this.isLoadingUser = false;
    //   },
    //   error: () => {
    //     this.currentUser = null;
    //     this.isLoadingUser = false;
    //   },
    // });
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

  goToAllParks(): void {
    this.router.navigate(['/parks-list']);
  }

  onSignOut(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
    this._authService.signOut().subscribe({
      next: () => this.router.navigate(['/home']),
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
