import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpaceXProvider } from '../../providers/space-x/space-x';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nextLaunch: any;
  launchTime: any;
  interval: any;
  launchTimeCountDown: any;

  constructor(public navCtrl: NavController, private spaceXProvider: SpaceXProvider) {
    this.getNextLaunch();
  }

  getNextLaunch() {
    this.spaceXProvider.getNextLaunch().subscribe(data => {
      this.nextLaunch = data;
      this.launchTime = data.launch_date_utc;
      this.initRefreshCountDown();
    })
  }

  ionViewDidLeave() {
    this.stopRefresh();
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
