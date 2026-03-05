import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import ParkDTO from '../../models/dto/parkDTO.model';
import { FavoritesService } from '../../services/favorites.service';
import UsersDTO from '../../models/dto/usersDTO.model';
import { AuthService } from '../../services/auth.service';
import { ParksChatComponent } from '../parks-chat/parks-chat.component';
import { ParksService } from '../../services/parks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, ParksChatComponent],
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
    private favoritesService: FavoritesService,
    private _authService: AuthService,
    private _parksService: ParksService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadFavorites();

    this.route.params.subscribe((params) => {
      const parkId = Number(params['id']);
      console.log('🟢 parkId:', parkId);
      this._parksService.getParkById(parkId).subscribe({
        next: (parkRes) => {
          this.parkToChangeFavorite = parkRes;
          console.log('✅ Park loaded:', parkRes);
        },
      });
    });
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

    this.favoritesService.getMyFavorites().subscribe({
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

    this.favoritesService.removeFromFavorites(park.id).subscribe({
      next: () => {
        alert('הפארק הוסר מהמועדפים ❌');
        // מעדכנים את הרשימה המקומית
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

  // onSignOut(): void {
  //   this._authService.signOut().subscribe({
  //     next: () => this.router.navigate(['/sign-in']),
  //     error: () => alert('שגיאה בהתנתקות'),
  //   });
  // }

  // onSignIn(): void {
  //   this.router.navigate(['/sign-in']);
  // }

  // onSignUp(): void {
  //   this.router.navigate(['/sign-up']);
  // }

  showDetails(park: ParkDTO): void {
    if (!park?.id) return;
    this.router.navigate(['/park-details', park.id]);
  }

  // goToRecommended(): void {
  //   this.router.navigate(['/recommended']);
  // }

  // // מעבר למסך מועדפים
  // goToFavorites(): void {
  //   this.router.navigate(['/favorites']);
  // }

  // הוספת פארק למועדפים
  addToFavorites(park: ParkDTO): void {
    if (!park?.id) return;

    this.favoritesService.addToFavorites(park.id).subscribe({
      next: () => {
        alert('הפארק נוסף למועדפים 💚');
      },
      error: (err) => {
        console.error('שגיאה בהוספה למועדפים', err);
        // alert('שגיאה בהוספה למועדפים');
        this.router.navigate(['/sign-in']);
      },
    });
  }
}
