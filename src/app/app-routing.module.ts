import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, NavigationEnd } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  //  { path: '**', redirectTo: '', pathMatch: 'full' },
  //  { path: '/', component: HomeComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        if (currentRoute !== '/search' && !currentRoute.includes('/actor-details')) {
          sessionStorage.removeItem('searchState');
        }
      }
    });
  }
}
