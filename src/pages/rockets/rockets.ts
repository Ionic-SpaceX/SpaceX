import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpaceXProvider } from '../../providers/space-x/space-x';

/**
 * Generated class for the RocketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  templateUrl: 'rocket-details.html',
})
export class RocketDetailsPage {
  rocket;
  cost;

  constructor(params: NavParams) {
      this.rocket = params.data;
      this.cost = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2}).format(params.data.cost_per_launch);
  }
}

@IonicPage()
@Component({
  selector: 'page-rockets',
  templateUrl: 'rockets.html',
})
export class RocketsPage {

  rocketList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private spaceXProvider: SpaceXProvider) {
    this.getAllRockets();
  }

  getAllRockets(){
    this.spaceXProvider.getAllRockets().subscribe(data => {
      this.rocketList = data;
      this.spaceXProvider.dismissLoader();
    });
  }

  goToRocketDetails(rocket){
    this.navCtrl.push(RocketDetailsPage, rocket );
  }

}
