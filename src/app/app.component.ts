import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { RocketsPage } from '../pages/rockets/rockets';
import { CapsulesPage } from '../pages/capsules/capsules';
import { LaunchesPage } from '../pages/launches/launches';
import {CacheService} from "ionic-cache";
import {SettingsPage} from "../pages/settings/settings";
import { AuthService } from '../providers/space-x/auth';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = LoginPage;
  private platform;

  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, icon: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, cache: CacheService, auth: AuthService) {
    this.platform = platform;
    this.initializeApp();
    cache.setDefaultTTL(60 * 60);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'About', component: AboutPage, icon: 'information-circle' },
      { title: 'Rockets', component: RocketsPage, icon: 'jet' },
      { title: 'Capsule', component: CapsulesPage, icon: 'moon' },
      { title: 'Missions', component: LaunchesPage, icon: 'planet' },
      { title: 'Settings', component: SettingsPage, icon: 'cog' }
    ];
  }

  initializeApp() {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
      });
  }
  openPage(page) {
  this.nav.setRoot(page.component);
  }
}
