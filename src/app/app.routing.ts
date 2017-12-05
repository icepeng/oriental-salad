import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { HomeComponent } from './home/home.component';
import { JudgeCardConfirmComponent } from './judge-card/judge-card-confirm/judge-card-confirm.component';
import { JudgeCardFormComponent } from './judge-card/judge-card-form/judge-card-form.component';
import { JudgeCardListComponent } from './judge-card/judge-card-list/judge-card-list.component';
import { JudgeCardResultComponent } from './judge-card/judge-card-result/judge-card-result.component';
import { CanActivateDetail } from './judge-view/can-activate-detail.service';
import { JudgeViewDetailComponent } from './judge-view/judge-view-detail/judge-view-detail.component';
import { JudgeViewFindComponent } from './judge-view/judge-view-find/judge-view-find.component';
import { JudgeViewListComponent } from './judge-view/judge-view-list/judge-view-list.component';
import { ManualComponent } from './manual/manual.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'manual', component: ManualComponent, pathMatch: 'full' },
  {
    path: 'judge/confirm',
    component: JudgeCardConfirmComponent,
    pathMatch: 'full',
  },
  {
    path: 'judge/result/:id',
    component: JudgeCardResultComponent,
    pathMatch: 'full',
  },
  {
    path: 'judge/form/:id',
    component: JudgeCardFormComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  { path: 'judge', component: JudgeCardListComponent, pathMatch: 'full' },
  {
    path: 'view/:id/:cardId',
    component: JudgeViewDetailComponent,
    canActivate: [CanActivateDetail],
    pathMatch: 'full',
  },
  { path: 'view/:id', component: JudgeViewListComponent },
  { path: 'view', component: JudgeViewFindComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
