import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { RocketsPage } from '../pages/rockets/rockets';
import { CapsulesPage } from '../pages/capsules/capsules';
import { LaunchesPage } from '../pages/launches/launches';
import { CacheService } from "ionic-cache";
import { SettingsPage } from "../pages/settings/settings";
import { LaunchpadsPage } from '../pages/launchpads/launchpads';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HistoryPage } from "../pages/history/history";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = HomePage;
  isUser: boolean = false;
  private platform;
  public activePage:any;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, icon: any}>;

  constructor(platform: Platform, private statusBar: StatusBar, private cache: CacheService, private screenOrientation: ScreenOrientation) {
    this.platform = platform;
    this.initializeApp();
    this.cache.setDefaultTTL(60 * 60);

    this.activePage = HomePage;
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'About', component: AboutPage, icon: 'information-circle' },
      { title: 'History', component: HistoryPage, icon: 'bookmarks' },
      { title: 'Rockets', component: RocketsPage, icon: 'jet' },
      { title: 'Capsule', component: CapsulesPage, icon: 'moon' },
      { title: 'Missions', component: LaunchesPage, icon: 'planet' },
      { title: 'Launchpads', component: LaunchpadsPage, icon: 'pin'},
      { title: 'Settings', component: SettingsPage, icon: 'cog' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#575fcf");
      this.statusBar.styleLightContent();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  isActivePage(page){
    return this.activePage == page;
  }
}
