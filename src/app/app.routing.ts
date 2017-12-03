/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
import { ManualComponent } from 'app/manual/manual.component';
import { JudgeCardListComponent } from 'app/judge-card/judge-card-list/judge-card-list.component';
import { JudgeCardFormComponent } from 'app/judge-card/judge-card-form/judge-card-form.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'manual', component: ManualComponent },
  { path: 'judge/form', component: JudgeCardFormComponent },
  { path: 'judge', component: JudgeCardListComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
