import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpaceXProvider } from '../providers/space-x/space-x';
import { RocketsPage, RocketDetailsPage } from '../pages/rockets/rockets';
import { CapsulesPage } from '../pages/capsules/capsules';
import {CapsulesPageModule} from "../pages/capsules/capsules.module";
import {RocketsPageModule} from "../pages/rockets/rockets.module";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CapsulesPageModule,
    RocketsPageModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpaceXProvider,
  ]
})
export class AppModule {}
