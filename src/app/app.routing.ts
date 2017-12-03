import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './can-deactivate-guard.service';

import { HomeComponent } from 'app/home/home.component';
import { ManualComponent } from 'app/manual/manual.component';
import { JudgeCardListComponent } from 'app/judge-card/judge-card-list/judge-card-list.component';
import { JudgeCardFormComponent } from 'app/judge-card/judge-card-form/judge-card-form.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'manual', component: ManualComponent },
  {
    path: 'judge/:id',
    component: JudgeCardFormComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  { path: 'judge', component: JudgeCardListComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
