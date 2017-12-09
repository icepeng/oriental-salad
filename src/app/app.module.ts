import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JudgeCardModule } from 'app/judge-card/judge-card.module';
import { ClarityModule } from 'clarity-angular';
import { ShareButtonsModule } from 'ngx-sharebuttons';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { APP_CONFIG, appConfig } from './config';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { JudgeFindModule } from './judge-find/judge-find.module';
import { CanActivateView } from './judge-view/can-activate-view.service';
import { JudgeViewModule } from './judge-view/judge-view.module';
import { ManualModule } from './manual/manual.module';
import { CanActivateStats } from './stats/can-activate-stats.service';
import { StatsModule } from './stats/stats.module';

@NgModule({
  declarations: [AppComponent, AboutComponent],
  imports: [
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
