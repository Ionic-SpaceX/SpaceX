import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpaceXProvider } from '../../providers/space-x/space-x';

/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  successLaunches: number = 0;
  failLaunches: number = 0;
  rockets = {
    falcon1: 0,
    falcon9: 0,
    falconHeavy: 0,
    bigFalcon: 0,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private spaceXProvider: SpaceXProvider) {
    this.getPastLaunches();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
  }

  getPastLaunches(){
    this.spaceXProvider.getPastLaunches({}).subscribe(data => {
      console.log(data);
      data.forEach(element => {
        switch (element.rocket.rocket_id) {
          case 'falcon1':
            this.rockets.falcon1++
            break;
          case 'falcon9':
            this.rockets.falcon9++
            break;
          case 'falconheaver':
            this.rockets.falconHeavy++;
            break;
          default:
            this.rockets.bigFalcon++;
        }

        switch (element.launch_success) {
          case true:
            this.successLaunches++;
            break;
          default:
            this.failLaunches++;
        }
      });
    })
  }

}
