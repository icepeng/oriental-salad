import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { RecommendCardsComponent } from './components/recommend-cards.component';
import { UserDatagridComponent } from './components/user-datagrid.component';
import { FindComponent } from './containers/find.component';
import { RecommendComponent } from './containers/find-recommend.component';
import { UserStatEffects } from './effects/stat';
import { UserEffects } from './effects/user';
import { reducers } from './reducers';
import { StatService } from './services/stat.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [SharedModule],
  declarations: [
    RecommendComponent,
    FindComponent,
    RecommendCardsComponent,
    UserDatagridComponent,
  ],
})
export class FindModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootFindModule,
      providers: [UserService, StatService],
    };
  }
}

@NgModule({
  imports: [
    FindModule,
    RouterModule.forChild([
      { path: 'find', component: FindComponent },
      { path: 'find/recommend', component: RecommendComponent },
    ]),
    StoreModule.forFeature('find', reducers),
    EffectsModule.forFeature([UserEffects, UserStatEffects]),
  ],
})
export class RootFindModule {}
