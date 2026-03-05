
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ParksService } from '../../services/parks.service';
import ParkDTO from '../../models/dto/parkDTO.model';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import UsersDTO from '../../models/dto/usersDTO.model';


import { MATERIAL } from '../../material';
import { FormsModule } from '@angular/forms';
import { FavoritesService } from '../../services/favorites.service';
import { ParksChatComponent } from "../parks-chat/parks-chat.component";
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
// import { AppHeaderComponent } from '../app-header/app-header.component';

@Component({
  selector: 'app-parks-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ParksChatComponent, FavoriteButtonComponent],
  templateUrl: './parks-list.component.html',
  styleUrl: './parks-list.component.css',
})
export class ParksListComponent implements OnInit {
  parksList: ParkDTO[] = [];
  searchTerm = '';
  isLoggedIn = false;
  currentUser: UsersDTO | null = null;
  isLoadingUser = true;
  allParks: ParkDTO[] = [];
  favorites: ParkDTO[] = [];
  loading: boolean = false;
  isChatOpen: boolean = false;
  selectedItem: ParkDTO | null = null
  // isLoggedIn$!: Observable<boolean>;

  constructor(
    private router: Router,
    private parksService: ParksService,
    private _authService: AuthService,
    private _favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {

// בדוק מה מגיע מהשרת
  this._favoritesService.getMyFavorites().subscribe(parks => {
    console.log('Favorites from server:', parks);
  });
  
  // בדוק מה יש ב-signal
  console.log('Favorites signal:', this._favoritesService.favorites());
  // console.log('Park ID:', this.parkId);
  // console.log('Is Favorite?', this._favoritesService.favorites().has(this.parkId));


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
    this.loadAllParks();
    this.loadFavorites();
  }

  private loadAllParks(): void {
    this.parksService.getParks().subscribe({
      next: (res) => {
        this.parksList = res ?? [];
        this.allParks = res ?? [];
      },
      error: (err) => {
        console.error('שגיאה בטעינת פארקים', err);
      }
    });
  }

  onSearchChange(value: string): void {
    const term = value.trim();
    this.searchTerm = term;

    if (!term) {
      this.parksList = this.allParks;
      return;
    }

    this.parksService.searchParks(term).subscribe({
      next: (res) => {
        this.parksList = res ?? [];
      },
      error: (err) => {
        console.error('שגיאה בחיפוש', err);
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

  showDetails(park: ParkDTO): void {
    if (!park?.id) return;
    this.router.navigate(['/park-details', park.id]);
  }

onSortChange(value: string) {
console.log("פונקציה נקראה! הערך הוא:", value);
  if (value === "new" || value === "") {
    this.ngOnInit();   // או כל דבר אחר שמרענן/טוען את הרשימה החדשה
  } 
  else if (value === "recommended") {
    this.parksService.getParksOrderByRecommended().subscribe({
      next: (res) => {
        this.parksList = res ?? [];
      },
      error: (err) => {
        console.error('שגיאה בטעינת פארקים מומלצים', err);
      }
    });
  }
  // אפשר להוסיף else אם יש ברירת מחדל
}

  // הוספת פארק למועדפים
  addToFavorites(park: ParkDTO): void {
    if (!park?.id) return;

    this._favoritesService.addToFavorites(park.id).subscribe({
      next: () => {
        alert('הפארק נוסף למועדפים 💚');
      },
      error: (err) => {
        console.error('שגיאה בהוספה למועדפים', err);
        // alert('שגיאה בהוספה למועדפים');
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
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading favorites', err);
        this.loading = false;
        alert('שגיאה בטעינת המועדפים');
      }
    });
  }

  isSelectedInList(item: ParkDTO | null): boolean {
    if (!item || !this.favorites?.length) return false;
    return this.favorites.some(existing => existing.id === item.id);
    // או אם reference זהה:   return this.favorites.includes(item);
  }
}
