import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ChangelogComponent } from './changelog/changelog.component';
import { APP_CONFIG, appConfig } from './config';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { JudgeCardModule } from './judge-card/judge-card.module';
import { JudgeFindModule } from './judge-find/judge-find.module';
import { CanActivateView } from './judge-view/can-activate-view.service';
import { JudgeViewModule } from './judge-view/judge-view.module';
import { ManualModule } from './manual/manual.module';
import { StatsModule } from './stats/stats.module';

@NgModule({
  declarations: [AppComponent, ChangelogComponent],
  imports: [
    AboutModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ClarityModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    JudgeCardModule,
    JudgeViewModule,
    JudgeFindModule,
    StatsModule,
    ManualModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  ],
  providers: [CanActivateView, { provide: APP_CONFIG, useValue: appConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
