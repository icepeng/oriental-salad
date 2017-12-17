import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { ChangelogComponent } from './changelog/changelog.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  // { path: 'manual', component: ManualComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'changelog', component: ChangelogComponent, pathMatch: 'full' },
  // {
  //   path: 'judge/confirm',
  //   component: JudgeCardConfirmComponent,
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'judge/result/:id',
  //   component: JudgeCardResultComponent,
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'judge/form/:id',
  //   component: JudgeCardFormComponent,
  //   canDeactivate: [CanDeactivateGuard],
  // },
  // { path: 'judge', component: JudgeCardListComponent, pathMatch: 'full' },
  {
    path: 'view',
    loadChildren: './judge-view/judge-view.module#JudgeViewModule',
  },
  {
    path: 'stats',
    loadChildren: './stats/stats.module#StatsModule',
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard],
})
export class AppRoutingModule {}
