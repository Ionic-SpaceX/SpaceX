import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PastLaunchesPage } from './past-launches/past-launches';
import { UpcomingLaunchesPage } from './upcoming-launches/upcoming-launches';
import { SpaceXProvider } from '../../providers/space-x/space-x';
import { RocketDetailsPage } from '../rockets/rockets';
import { LaunchpadDetailsPage } from '../launchpads/launchpads';

/**
 * Generated class for the LaunchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'launch-details.html',
})
export class LaunchDetailsPage {
  launch: any;
  sourcePageLaunch: any;
  interval: number;
  launchTime: any;
  launchTimeCountDown: any;

  constructor(private navParams: NavParams, public navCtrl: NavController, private spaceXProvider: SpaceXProvider) {
    this.launch = navParams.data;
    this.sourcePageLaunch = this.navCtrl.getActive().name;
  }

  ionViewDidEnter() {
    this.launchTime = this.navParams.data.launch_date_utc;
    if (this.sourcePageLaunch === 'UpcomingLaunchesPage' || this.sourcePageLaunch === "HomePage") {
      this.initRefreshCountDown();
    }
  }

  ionViewDidLeave() {
    this.stopRefresh();
  }

  getSpecificInformation(info: String, id: String) {
    this.spaceXProvider.getSpecificInformationWithId(info, id).subscribe(data => {
      switch (info) {
        case 'rockets':
          this.navCtrl.push(RocketDetailsPage, data);
          break;
        case 'launchpads':
          this.navCtrl.push(LaunchpadDetailsPage, data);
          break;
        default:
          return;
      }

    });
  }

  initRefreshCountDown() {
    this.refresh();
    this.interval = setInterval(() => this.refresh(), 1000);
  }

  stopRefresh() {
    clearInterval(this.interval);
  }

  refresh() {
    const currentDate = new Date().getTime();
    const timeToLaunchTime = new Date(this.launchTime).getTime() - currentDate;
    let day, hour, minute, seconds;
    seconds = Math.floor(timeToLaunchTime / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    const result = {
      day: day,
      hour: hour,
      minute: minute,
      seconds: seconds
    };

    this.launchTimeCountDown = result;
  }
}

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
