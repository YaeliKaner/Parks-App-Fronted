// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { AppHeaderComponent } from './components/app-header/app-header.component';

// @Component({
//    selector: 'app-root',
//   standalone: true,
//   imports: [AppHeaderComponent, RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'parksApp';
// }


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,           // מומלץ לשים ראשון או אחרון – לא משנה
    AppHeaderComponent      // חייב להיות כאן!
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'   // שים לב: styleUrl (ברבים זה styleUrls)
})
export class AppComponent {
  title = 'parksApp';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Initialize auth state on app startup
    this.authService.initializeAuthState();
  }
}