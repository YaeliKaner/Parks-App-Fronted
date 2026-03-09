import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import ParkDTO from '../../models/dto/parkDTO.model';
import { ParksService } from '../../services/parks.service';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../services/auth.service';
import { ParksChatComponent } from '../parks-chat/parks-chat.component';
import UsersDTO from '../../models/dto/usersDTO.model';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';

@Component({
  selector: 'app-recommended-parks',
  standalone: true,
  imports: [CommonModule, RouterModule, ParksChatComponent, FavoriteButtonComponent],
  templateUrl: './recommended-parks.component.html',
  styleUrl: './recommended-parks.component.css'
})
export class RecommendedParksComponent implements OnInit {

  isLoggedIn = false;
  currentUser: UsersDTO | null = null;
  isLoadingUser = true;
  isChatOpen: boolean = false;
  favorites: ParkDTO[] = [];
  loading: boolean = false;
  parks: ParkDTO[] = [];

  constructor(private parksService: ParksService, private _favoritesService: FavoritesService, private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {

        this._authService.getAuthState().subscribe((isAuth) => {
      this.isLoggedIn = isAuth;
      // when we become logged in, load favorites; if logged out clear them
      if (isAuth) {
        this.loadFavorites();
      } else {
        this.favorites = [];
      }
    });

    this._authService.getCurrentUserState().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isLoadingUser = false;
      },
      error: () => {
        this.currentUser = null;
        this.isLoadingUser = false;
      },
    });

  // בדוק מה מגיע מהשרת
if(this.isLoggedIn) {
  this._favoritesService.getMyFavorites().subscribe(parks => {
      console.log('Favorites from server:', parks);
      this._favoritesService.populateFavorites(parks);
    });
 }
  // בדוק מה יש ב-signal
  console.log('Favorites signal:', this._favoritesService.favorites());

    this.parksService.getRecommendedParks().subscribe({
      next: (res) => this.parks = res ?? [],
      error: (err) => console.error('שגיאה בטעינת מומלצים', err)
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
  
    showDetails(park: ParkDTO): void {
      if (!park?.id) return;
      this.router.navigate(['/park-details', park.id]);
    }
  
    // הוספת פארק למועדפים
    addToFavorites(park: ParkDTO): void {
      if (!park?.id) return;
  
      this._favoritesService.addToFavorites(park.id).subscribe({
        next: () => {
        },
        error: (err) => {
          console.error('שגיאה בהוספה למועדפים', err);
          this.router.navigate(['/sign-in']);
        }
      });
    }

       loadFavorites(): void {
    this.loading = true;

    this._favoritesService.getMyFavorites().subscribe({
      next: (res) => {
        console.log('Favorites loaded:', res);
        this.favorites = res ?? [];
        // sync service signal as well
        this._favoritesService.populateFavorites(this.favorites);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading favorites', err);
        this.loading = false;
        alert('שגיאה בטעינת המועדפים');
      }
    });
  }
}
