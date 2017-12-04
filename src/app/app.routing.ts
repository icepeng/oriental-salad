import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { HomeComponent } from './home/home.component';
import { JudgeCardConfirmComponent } from './judge-card/judge-card-confirm/judge-card-confirm.component';
import { JudgeCardFormComponent } from './judge-card/judge-card-form/judge-card-form.component';
import { JudgeCardListComponent } from './judge-card/judge-card-list/judge-card-list.component';
import { ManualComponent } from './manual/manual.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'manual', component: ManualComponent },
  { path: 'judge/confirm', component: JudgeCardConfirmComponent },
  {
    path: 'judge/form/:id',
    component: JudgeCardFormComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  { path: 'judge', component: JudgeCardListComponent },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
