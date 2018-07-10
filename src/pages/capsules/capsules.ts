import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpaceXProvider } from '../../providers/space-x/space-x';

/**
 * Generated class for the CapsulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'capsule-details.html',
})
export class CapsuleDetailsPage {
  capsule;

  constructor(params: NavParams) {
    this.capsule = params.data;
  }
}

@IonicPage()
@Component({
  selector: 'page-capsules',
  templateUrl: 'capsules.html',
})
export class CapsulesPage {

  capsuleList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private spaceXProvider: SpaceXProvider) {
    this.getAllCapsules();
  }

  getAllCapsules(){
    this.spaceXProvider.getAllCapsules().subscribe(data => {
      this.capsuleList = data;
      this.spaceXProvider.dismissLoader();
    });
  }

  goToCapsuleDetails(capsule){
    this.navCtrl.push(CapsuleDetailsPage, capsule);
  }

}
