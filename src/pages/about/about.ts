import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpaceXProvider } from '../../providers/space-x/space-x';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  spaceXInfo: any;

  constructor(public navCtrl: NavController, private spaceXProvider: SpaceXProvider) {
    this.getSpaceXInfo();
  }

  getSpaceXInfo(){
    this.spaceXProvider.getCompagnyInfo().then(data => {
      console.log(data);
      this.spaceXInfo = data;
    })
  }

}
