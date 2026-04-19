import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, Injector, runInInjectionContext  } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import ParkDTO from '../../models/dto/parkDTO.model';
import { FavoritesService } from '../../services/favorites.service';
import UsersDTO from '../../models/dto/usersDTO.model';
import { AuthService } from '../../services/auth.service';
import { ParksChatComponent } from '../parks-chat/parks-chat.component';
import { ParksService } from '../../services/parks.service';
import { ActivatedRoute } from '@angular/router';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, ParksChatComponent, FavoriteButtonComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  favorites: ParkDTO[] = [];
  loading = true;
  isLoggedIn = false;
  currentUser: UsersDTO | null = null;
  isLoadingUser = true;
  allParks: ParkDTO[] = [];

  isChatOpen: boolean = false;

  parkToChangeFavorite: ParkDTO | null = null;

  constructor(
    private injector: Injector,
    private _favoritesService: FavoritesService,
    private _authService: AuthService,
    private _parksService: ParksService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

runInInjectionContext(this.injector, () => {
    effect(() => {
      const currentFavoriteIds = this._favoritesService.favorites();
      this.favorites = this.favorites.filter(p => currentFavoriteIds.has(p.id));
    });
  });


      this._authService.getAuthState().subscribe((isAuth) => {
      this.isLoggedIn = isAuth;
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

if(this.isLoggedIn) {
  this._favoritesService.getMyFavorites().subscribe(parks => {
      console.log('Favorites from server:', parks);
      this._favoritesService.populateFavorites(parks);
    });
 }

    this.loadFavorites();
  }


toggleFavorite(park: ParkDTO) {

  if (this.favorites.some(p => p.id === park.id)) {
    this.favorites = this.favorites.filter(p => p.id !== park.id);
  } else {
    this.favorites.push(park);
  }

}


  loadFavorites(): void {
    this.loading = true;

    this._favoritesService.getMyFavorites().subscribe({
      next: (res) => {
        console.log('Favorites loaded:', res);
        this.favorites = res ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading favorites', err);
        this.loading = false;
        alert('שגיאה בטעינת המועדפים');
      },
    });

    
  }

  back(): void {
    this.router.navigate(['/parks-list']);
  }

  openDetails(park: ParkDTO): void {
    if (!park?.id) return;
    this.router.navigate(['/park-details', park.id]);
  }

  remove(park: ParkDTO): void {
    if (!park?.id) return;

    this._favoritesService.removeFromFavorites(park.id).subscribe({
      next: () => {
        alert('הפארק הוסר מהמועדפים ❌');
        this._favoritesService.toggleFavorite(park.id);
        this.favorites = this.favorites.filter((p) => p.id !== park.id);
      },
      error: (err) => {
        console.error('שגיאה בהסרה מהמועדפים', err);
        alert('שגיאה בהסרה מהמועדפים');
      },
    });
   
  }



  isFavorite(park: ParkDTO): boolean {
    return this.favorites.some(p => p.id === park.id);
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

  addToFavorites(park: ParkDTO): void {
    if (!park?.id) return;

    this._favoritesService.addToFavorites(park.id).subscribe({
      next: () => {
        alert('הפארק נוסף למועדפים 💚');
      },
      error: (err) => {
        console.error('שגיאה בהוספה למועדפים', err);
        this.router.navigate(['/sign-in']);
      },
    });
  }
}
