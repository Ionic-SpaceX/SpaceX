import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpaceXProvider } from '../providers/space-x/space-x';
import { CapsulesPageModule } from '../pages/capsules/capsules.module';
import { RocketsPageModule } from '../pages/rockets/rockets.module';
import { LaunchesPageModule } from '../pages/launches/launches.module';
import { UpcomingLaunchesPageModule } from '../pages/upcoming-launches/upcoming-launches.module';
import { PastLaunchesPageModule } from '../pages/past-launches/past-launches.module';
import { LaunchesFiltersModalPageModule } from '../pages/launches-filters-modal/launches-filters-modal.module';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CapsulesPageModule,
    RocketsPageModule,
    LaunchesPageModule,
    UpcomingLaunchesPageModule,
    PastLaunchesPageModule,
    LaunchesFiltersModalPageModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpaceXProvider,
  ]
})
export class AppModule {}
