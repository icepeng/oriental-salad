import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { StatGuard } from './core/services/stat-guard.service';
import { HomeComponent } from './home/home.component';
import { ManualComponent } from './manual/manual.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'manual', component: ManualComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'changelog', component: ChangelogComponent, pathMatch: 'full' },
  {
    path: 'view',
    canActivate: [StatGuard],
    loadChildren: './view/view.module#ViewModule',
  },
  {
    path: 'stats',
    canActivate: [StatGuard],
    loadChildren: './stats/stats.module#StatsModule',
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
