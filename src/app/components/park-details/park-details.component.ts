import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ParksService } from '../../services/parks.service';
import { ParkDesignService } from '../../services/park-design.service';
import Feature from '../../models/feature.model';
import ParkDesignDTO from '../../models/dto/parkDesignDTO.model';
import ParkDTO from '../../models/dto/parkDTO.model';
import { AddReportComponent } from '../add-report/add-report.component';
import { ReportsListComponent } from '../reports-list/reports-list.component';
import { AuthService } from '../../services/auth.service';
import WeatherDTO from '../../models/dto/weatherDTO.model';
import { WeatherService } from '../../services/weather.service';
import { FeaturesService } from '../../services/features.service';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { FavoritesService } from '../../services/favorites.service';
import { ParksChatComponent } from '../parks-chat/parks-chat.component';
import UsersDTO from '../../models/dto/usersDTO.model';

@Component({
  selector: 'app-park-details',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    AddReportComponent,
    ReportsListComponent,
    AppHeaderComponent,
    ParksChatComponent,
  ],
  templateUrl: './park-details.component.html',
  styleUrl: './park-details.component.css',
})
export class ParkDetailsComponent implements OnInit {
  parkToShow!: ParkDTO;
  showAddReport = false;
  isLoggedIn = false;
  currentUser: UsersDTO | null = null;
  isLoadingUser = true;

  features: Feature[] = [];
  designs: ParkDesignDTO[] = [];
  featureForms: { [featureId: number]: FormGroup } = {};

  weather?: WeatherDTO;
  isLoadingWeather = false;
  weatherError?: string;

  userLocation: { lat: number; lng: number } | null = null;

  hasChanges = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _parksService: ParksService,
    private _featuresService: FeaturesService,
    private _parkDesignService: ParkDesignService,
    private _authService: AuthService,
    private fb: FormBuilder,
    private weatherService: WeatherService,
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit(): void {
    console.log('🟢 ParkDetails init');

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

    /* ================================
     📍 שלב 1 — מיקום משתמש (אופציונלי)
  ================================== */
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        console.log('📍 User location:', this.userLocation);
      },
      (err) => {
        console.warn('⚠️ לא ניתן לקבל מיקום משתמש', err);
        this.userLocation = null;
      },
    );
    this.route.params.subscribe((params) => {
      const parkId = Number(params['id']);
      console.log('🟢 parkId:', parkId);
      this._featuresService.getFeatures().subscribe({
        next: (features) => {
          this.features = features;
          console.log('✅ Features loaded:', features);
          this._parksService.getParkById(parkId).subscribe({
            next: (parkRes) => {
              this.parkToShow = parkRes;
              console.log('✅ Park loaded:', parkRes);

              if (parkRes.latitude && parkRes.longitude) {
                this.loadWeather(parkId);
              } else {
                this.weatherError =
                  'אין קואורדינטות לפארק ולכן לא ניתן להציג מזג אוויר.';
                this.isLoadingWeather = false;
              }

              this._parkDesignService
                .getLatestDesignsForPark(parkId)
                .subscribe({
                  next: (designs) => {
                    this.designs = designs;
                    console.log('🎨 Designs loaded:', designs);

                    const designMap = new Map<number, ParkDesignDTO>();
                    designs.forEach((d) => {
                      if (d.feature?.id) {
                        designMap.set(d.feature.id, d);
                      }
                    });

                    this.features.forEach((feature) => {
                      const existing = designMap.get(feature.id);

                      this.featureForms[feature.id] = this.fb.group({
                        ratingsBreakdown: [
                          existing?.ratingsBreakdown || 'none',
                        ],
                        remark: [existing?.remark || ''],
                        park: [parkRes],
                        feature: [feature],
                      });
                    });
                  },

                  error: (err) => {
                    console.error('Failed loading designs', err);
                  },
                });
            },

            error: (err) => {
              console.error('Failed loading park', err);
            },
          });
        },

        error: (err) => {
          console.error('Failed loading features', err);
        },
      });
    });
  }

  private loadWeather(parkId: number) {
    this.isLoadingWeather = true;
    this.weatherService.getWeatherForPark(parkId).subscribe({
      next: (dto) => {
        this.weather = dto;
        this.isLoadingWeather = false;
      },
      error: () => {
        this.weatherError = 'We could not load weather';
        this.isLoadingWeather = false;
      },
    });
  }

  addToFavorites(park: ParkDTO): void {
    if (!park?.id) return;

    this.favoritesService.addToFavorites(park.id).subscribe({
      next: () => {},
      error: (err) => {
        console.error(err);
        // alert('שגיאה בהוספה למועדפים');
        this.router.navigate(['/sign-in']);
      },
    });
  }

  saveAllChanges() {
    const saves: Promise<any>[] = [];

    this.features.forEach((feature) => {
      const form = this.featureForms[feature.id];
      if (form.dirty) {
        saves.push(
          this._parkDesignService
            .addParkDesign({
              ...form.value,
              feature: { id: feature.id, name: feature.name },
              updateDate: new Date(),
            })
            .toPromise(),
        );
      }
    });

    if (saves.length > 0) Promise.all(saves).catch(console.error);
  }

  hasAnyChanges(): boolean {
    return Object.values(this.featureForms).some(
      (form) => form.dirty || form.touched,
    );
  }

  // 🚗 ניווט לגוגל מפות
  openGoogleMaps() {
    // if (!this.parkToShow?.latitude || !this.parkToShow?.longitude) {
    //   alert('אין קואורדינטות לפארק 😅');
    //   return;
    // }


    const destination = this.parkToShow.address.concat(`, ${this.parkToShow.city.name}`);
    // if (this.parkToShow.city) {
    //   destination.concat(`, ${this.parkToShow.city.name}`);
    // }
    // if (this.parkToShow.address) {
    //   destination.concat(`, ${this.parkToShow.address}`);
    // }

    if (!destination.trim()) {
      alert('אין כתובת לפארק 😕');
      return;
    }

    console.log('🚗 Opening Google Maps with destination:', destination);

    let url = '';
    const encodedDestination = encodeURIComponent(destination);
    if (this.userLocation) {
      const origin = encodeURIComponent(
        `${this.userLocation.lat},${this.userLocation.lng}`,
      );
      url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${encodedDestination}&travelmode=driving`;
    } else {
      url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    }

    window.open(url, '_blank');
    //const destination = `${this.parkToShow.latitude},${this.parkToShow.longitude}`;

    // if (this.userLocation) {
    //   const origin = `${this.userLocation.lat},${this.userLocation.lng}`;
    //   window.open(
    //     `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`,
    //     '_blank'
    //   );
    // } else {
    //   window.open(
    //     `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`,
    //     '_blank'
    //   );
    // }
  }

  goBack() {
    window.history.back();
  }

  // יציאה
  onSignOut(): void {
    this._authService.signOut().subscribe({
      next: () => this.router.navigate(['/sign-in']),
      error: () => alert('error'),
    });
  }

  // כניסה
  onSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  // הרשמה
  onSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  // מומלצים
  goToRecommended(): void {
    this.router.navigate(['/recommended']);
  }

  // המועדפים שלי
  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  goToAllParks(): void {
    this.router.navigate(['/parks-list']);
  }

  onSpecialButtonClickAddReport(): void {
    this._authService.isAuthenticated().subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          this.showAddReport = true;
        } else {
          this.router.navigate(['/sign-in']);
        }
      },
    });
  }

  onSpecialButtonClickAddPark(): void {
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
}
