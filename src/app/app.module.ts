import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JudgeCardModule } from 'app/judge-card/judge-card.module';
import { ClarityModule } from 'clarity-angular';
import { ShareButtonsModule } from 'ngx-sharebuttons';

import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { CanActivateDetail } from './judge-view/can-activate-detail.service';
import { JudgeViewModule } from './judge-view/judge-view.module';
import { ManualModule } from './manual/manual.module';

@NgModule({
  declarations: [AppComponent],
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
    ManualModule,
  ],
  providers: [CanDeactivateGuard, CanActivateDetail],
  bootstrap: [AppComponent],
})
export class AppModule {}
