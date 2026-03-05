import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import ParkDTO from '../../models/dto/parkDTO.model';
import { ParksService } from '../../services/parks.service';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../services/auth.service';
import { ParksChatComponent } from '../parks-chat/parks-chat.component';
import UsersDTO from '../../models/dto/usersDTO.model';

@Component({
  selector: 'app-recommended-parks',
  standalone: true,
  imports: [CommonModule, RouterModule, ParksChatComponent],
  templateUrl: './recommended-parks.component.html',
  styleUrl: './recommended-parks.component.css'
})
export class RecommendedParksComponent implements OnInit {

  isLoggedIn = false;
  currentUser: UsersDTO | null = null;
  isLoadingUser = true;
  isChatOpen: boolean = false;

  parks: ParkDTO[] = [];

  constructor(private parksService: ParksService, private favoritesService: FavoritesService, private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {
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
  
      this.favoritesService.addToFavorites(park.id).subscribe({
        next: () => {
        },
        error: (err) => {
          console.error('שגיאה בהוספה למועדפים', err);
          this.router.navigate(['/sign-in']);
        }
      });
    }
}
