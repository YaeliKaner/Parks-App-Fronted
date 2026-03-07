// import { Component, Input } from '@angular/core';
// import { FavoritesComponent } from '../favorites-component/favorites.component';
// import { FavoritesService } from '../../services/favorites.service';

// @Component({
//   selector: 'app-favorite-button',
//   standalone: true,
//   templateUrl: './favorite-button.component.html'
// })
// export class FavoriteButtonComponent {
//   @Input() parkId!: number; 

//   constructor(public favoritesService: FavoritesService) {}

//   ngOnInit() {
//   console.log('Park ID:', this.parkId);
//   console.log('Is Favorite?', this.favoritesService.isFavorite(this.parkId));
// }
//   toggle() {
//     this.favoritesService.toggleFavorite(this.parkId);
//   }
// }


import { Component, Input, OnInit, computed, input } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent implements OnInit {
   parkId = input.required<number>();

  // ה-signal הזה יתעדכן אוטומטית כשה-favorites ישתנה
// isFavorite() {
//   return computed(() => 
//     this._favoritesService.favorites().has(this.parkId)
  
//   );
  
// }

isFavorite = computed(() => 
  this._favoritesService.favorites().has(this.parkId())
);
  constructor(public _favoritesService: FavoritesService) {}

  ngOnInit() {
   this._favoritesService.loadFavorites(); // טוען את המועדפים כשמרכיב נטען
    console.log('Park ID:', this.parkId());
  }

  toggle() {
    this._favoritesService.toggleFavorite(this.parkId());
  }
}