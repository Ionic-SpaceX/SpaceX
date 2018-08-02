import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpaceXProvider } from '../../../providers/space-x/space-x';
import { LaunchDetailsPage } from '../launches';

/**
 * Generated class for the UpcomingLaunchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upcoming-launches',
  templateUrl: 'upcoming-launches.html',
})
export class UpcomingLaunchesPage {

  upcomingLaunches: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private spaceXProvider: SpaceXProvider) {
    this.getUpcominglaunches();
  }

  getUpcominglaunches(){
    this.spaceXProvider.getUpcomingLaunches().subscribe(data => {
      this.upcomingLaunches = data;
    });
  }

  goToLaunchDetails(launch) {
    this.navCtrl.push(LaunchDetailsPage , launch);
  }
}
