import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { SpaceXProvider } from '../../providers/space-x/space-x';
import { LaunchDetailsPage } from '../launches/launches';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nextLaunch: any;
  launchTime: any;
  interval: any;
  launchTimeCountDown: any;
  isUser = false;

  constructor(public navCtrl: NavController, private spaceXProvider: SpaceXProvider, private localNotifications: LocalNotifications, private aFauth: AngularFireAuth, private toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.getNextLaunch();
    this.aFauth.authState.subscribe(user => {
      if (user) {
        this.scheduleNotifications();
        if(!this.isUser) {
          this.isUser = true;
        }
      }
      else {
        let toast = this.toastCtrl.create({
          message: 'Please login to be notified for the next launch',
          position: 'botton',
          duration: 5000,
        });

        toast.present();

        if(this.isUser) {
          this.isUser = false;
        }
      }
    })
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

  seeLaunchDetails() {
    this.navCtrl.push(LaunchDetailsPage, this.nextLaunch);
  }

  scheduleNotifications() {
    this.localNotifications.isScheduled(1).then(data => {
      if(!data){
        console.log('je suis dans la boucle');
        this.localNotifications.schedule({
          id: 0,
          title: 'You will be notified',
          text: 'A notification has been scheduled to infrom about the next launch',
          trigger: { at: new Date(new Date().getTime() + 10 * 1000 ) },
        });

        this.localNotifications.schedule({
          id: 1,
          title: "Next launch in 1 hour",
          text: 'The next Space X launch is in 1 hour from now !',
          trigger: { at: new Date(new Date(this.launchTime).getTime() - 3600000) },
        });

        this.localNotifications.schedule(
          {
            id: 2,
            title: "Space X launch RIGHT NOW !!!",
            text: 'That it, Space X is launching a rocket just now',
            trigger: { at: new Date(new Date(this.launchTime).getTime()) },
        });
      }
    });
  }
}
