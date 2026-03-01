
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

@Component({
  selector: 'app-parks-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ParksChatComponent],
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

  isChatOpen: boolean = false;
  // isLoggedIn$!: Observable<boolean>;

  constructor(
    private router: Router,
    private parksService: ParksService,
    private _authService: AuthService,
    private favoritesService: FavoritesService
  ) {}

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
    this.loadAllParks();
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

  showDetails(park: ParkDTO): void {
    if (!park?.id) return;
    this.router.navigate(['/park-details', park.id]);
  }

  // מעבר למסך מומלצים
  goToRecommended(): void {
    this.router.navigate(['/recommended']);
  }

  // מעבר למסך מועדפים
  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

//   onSortChange(value: string){
//     if(value == "new") {
//       this.ngOnInit();
//     }
//     else if(value == "recommended") {
//       this.parksService.getParksOrderByRecommended().subscribe({
//         next: (res) => {
//           this.parksList = res ?? [];
//         },
//         error: (err) => {
//           console.error('שגיאה בטעינת פארקים מומלצים', err);
//         }
//       });
//   }
// }

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

    this.favoritesService.addToFavorites(park.id).subscribe({
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
}
