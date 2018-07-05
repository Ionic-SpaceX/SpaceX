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
import { UpcomingLaunchesPageModule } from '../pages/launches/upcoming-launches/upcoming-launches.module';
import { PastLaunchesPageModule } from '../pages/launches/past-launches/past-launches.module';
import { LaunchesFiltersModalPageModule } from '../pages/launches/launches-filters-modal/launches-filters-modal.module';
import {CacheModule} from "ionic-cache";
import {SettingsPageModule} from "../pages/settings/settings.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { LaunchpadsPageModule } from '../pages/launchpads/launchpads.module';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CapsulesPageModule,
    RocketsPageModule,
    LaunchesPageModule,
    UpcomingLaunchesPageModule,
    PastLaunchesPageModule,
    LaunchesFiltersModalPageModule,
    SettingsPageModule,
    CacheModule.forRoot({ keyPrefix: 'my-spacex-cache' }),
    LaunchpadsPageModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
    }),
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
    {
      provide: ErrorHandler, useClass: IonicErrorHandler
    },
    SpaceXProvider,
  ]
})
export class AppModule {}


