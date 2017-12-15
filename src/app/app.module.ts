import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { ClarityModule } from 'clarity-angular';
import { ShareButtonsModule } from 'ngx-sharebuttons';

import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { ChangelogComponent } from './changelog/changelog.component';
import { APP_CONFIG, appConfig } from './config';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { JudgeCardModule } from './judge-card/judge-card.module';
import { JudgeFindModule } from './judge-find/judge-find.module';
import { CanActivateView } from './judge-view/can-activate-view.service';
import { JudgeViewModule } from './judge-view/judge-view.module';
import { ManualModule } from './manual/manual.module';
import { CanActivateStats } from './stats/can-activate-stats.service';
import { StatsModule } from './stats/stats.module';
import { LivereModule } from 'ngx-livere';

@NgModule({
  declarations: [AppComponent, ChangelogComponent],
  imports: [
    AboutModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ShareButtonsModule.forRoot(),
    ClarityModule,
    ROUTING,
    CoreModule,
    HomeModule,
    JudgeCardModule,
    JudgeViewModule,
    JudgeFindModule,
    StatsModule,
    ManualModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    LivereModule.forRoot('MTAyMC8zMjQwNS84OTY2'),
  ],
  providers: [
    CanDeactivateGuard,
    CanActivateView,
    CanActivateStats,
    { provide: APP_CONFIG, useValue: appConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
