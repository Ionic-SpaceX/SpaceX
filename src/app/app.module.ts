import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './app.firebase.config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpaceXProvider } from '../providers/space-x/space-x';
import { CapsulesPageModule } from '../pages/capsules/capsules.module';
import { RocketsPageModule } from '../pages/rockets/rockets.module';
import { LaunchesPageModule } from '../pages/launches/launches.module';
import { UpcomingLaunchesPageModule } from '../pages/launches/upcoming-launches/upcoming-launches.module';
import { PastLaunchesPageModule } from '../pages/launches/past-launches/past-launches.module';
import { LaunchesFiltersModalPageModule } from '../pages/launches/launches-filters-modal/launches-filters-modal.module';
import { CacheModule } from "ionic-cache";
import { SettingsPageModule } from "../pages/settings/settings.module";
import { StatsPageModule } from "../pages/stats/stats.module";
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { LaunchpadsPageModule } from '../pages/launchpads/launchpads.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HistoryPageModule } from "../pages/history/history.module";
import { LocalNotifications } from '../../node_modules/@ionic-native/local-notifications';

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
    HistoryPageModule,
    CacheModule.forRoot({ keyPrefix: 'my-spacex-cache' }),
    LoginPageModule,
    RegisterPageModule,
    LaunchpadsPageModule,
    StatsPageModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
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
    ScreenOrientation,
    LocalNotifications,
  ]
})
export class AppModule {}


