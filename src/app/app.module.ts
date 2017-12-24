import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { APP_CONFIG, appConfig } from './config';
import { CoreModule } from './core/core.module';
import { StatEffects } from './core/effects/stat';
import { HomeModule } from './home/home.module';
import { FindModule } from './find/find.module';
import { ManualModule } from './manual/manual.module';
import { metaReducers, reducers } from './reducers';
import { appRoutes } from './routes';

@NgModule({
  declarations: [AppComponent, ChangelogComponent],
  imports: [
    AboutModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ClarityModule,
    RouterModule.forRoot(appRoutes),
    CoreModule.forRoot(),
    HomeModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([StatEffects]),
    FindModule.forRoot(),
    ManualModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  ],
  providers: [{ provide: APP_CONFIG, useValue: appConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
