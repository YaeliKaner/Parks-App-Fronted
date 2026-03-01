import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig  } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';


// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withFetch())]
// };


// export const appConfig = {
//   providers: [
//     provideRouter(
//       routes,
//       withRouterConfig({
//         onSameUrlNavigation: 'reload'
//       })
//     ),
//     // ...
//   ]
// };

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),               // ← הוסיפי את השורה הזאת (או ודאי שהיא קיימת)
    // ... providers אחרים אם יש
  ]
};
