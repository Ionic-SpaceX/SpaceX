import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PastLaunchesPage } from './past-launches/past-launches';
import { UpcomingLaunchesPage } from './upcoming-launches/upcoming-launches';

/**
 * Generated class for the LaunchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-launches',
  templateUrl: 'launches.html',
})
export class LaunchesPage {

  tab1Root = PastLaunchesPage;
  tab2Root = UpcomingLaunchesPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
}
