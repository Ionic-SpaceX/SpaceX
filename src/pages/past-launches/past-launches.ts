import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { SpaceXProvider } from '../../providers/space-x/space-x';

/**
 * Generated class for the PastLaunchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-past-launches',
  templateUrl: 'past-launches.html',
})
export class PastLaunchesPage {

  pastLaunches: any;
  filters = {
    order: 'desc',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private spaceXProvider: SpaceXProvider, private modalCtrl: ModalController, private loadingCtrl: LoadingController) {
    this.getPastLaunches(this.filters);
  }

  getPastLaunches(filters){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.spaceXProvider.getPastLaunches(filters).then(data => {
      this.pastLaunches = data;
      loader.dismiss();
    })
  }

}
