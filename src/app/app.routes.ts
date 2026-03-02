// import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParksListComponent } from './components/parks-list/parks-list.component';
import { FavoritesComponent } from './components/favorites-component/favorites.component';
import { RecommendedParksComponent } from './components/recommended-parks/recommended-parks.component';
import { AddParkComponent } from './components/add-park/add-park.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ParkDetailsComponent } from './components/park-details/park-details.component';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { AddReportComponent } from './components/add-report/add-report.component';
import { ParksChatComponent } from './components/parks-chat/parks-chat.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'parks-list', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, title: 'See Park | התחברות' },
  { path: 'sign-up', component: SignUpComponent, title: 'See Park | הרשמה' },
  { path: 'add-park', component: AddParkComponent, title: 'See Park | הוספת פארק' },
  { path: 'parks-list', component: ParksListComponent, title: 'See Park | רשימת פארקים' },
  { path: 'park-details/:id', component: ParkDetailsComponent, title: 'See Park | פרטי פארק' },
  { path: 'reports-list', component: ReportsListComponent, title: 'See Park | רשימת דיווחים' },
  { path: 'add-report', component: AddReportComponent, title: 'See Park | הוספת דיווח' },
  { path: 'recommended', component: RecommendedParksComponent, title: 'See Park | פארקים מומלצים' },
  { path: 'favorites', component: FavoritesComponent, title: 'See Park | פארקים מועדפים' },
  { path: 'parks-chat', component: ParksChatComponent, title: 'See Park | מצא לי פארק' },
  { path: 'home', component: HomeComponent, title: 'See Park | דף הבית' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
