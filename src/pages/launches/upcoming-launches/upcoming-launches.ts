import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private spaceXProvider: SpaceXProvider, private loadingCtrl: LoadingController) {
    this.getUpcominglaunches();
  }

  getUpcominglaunches(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.spaceXProvider.getUpcomingLaunches().then(data => {
      this.upcomingLaunches = data;
      loader.dismiss();
    });
  }

  goToLaunchDetails(launch) {
    this.navCtrl.push(LaunchDetailsPage , launch);
  }
}
