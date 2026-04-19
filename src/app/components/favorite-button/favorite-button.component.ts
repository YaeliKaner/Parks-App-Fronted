
import { Component, Input, OnInit, computed } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent implements OnInit {
  @Input() parkId!: number;

  isFavorite = computed(() => this._favoritesService.favorites().has(this.parkId));

  constructor(public _favoritesService: FavoritesService) {}

  ngOnInit() {
    console.log('Park ID:', this.parkId);
  }

  toggle() {
    this._favoritesService.toggleFavorite(this.parkId);
  }
}