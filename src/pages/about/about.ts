import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { SpaceXProvider } from '../../providers/space-x/space-x';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  spaceXInfo: any;

  constructor(public navCtrl: NavController, private spaceXProvider: SpaceXProvider, private loadingCtrl: LoadingController) {
    this.getSpaceXInfo();
  }

  getSpaceXInfo(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present().then(() => {
      this.spaceXProvider.getCompagnyInfo().subscribe(data => {
        this.spaceXInfo = data;
        loader.dismiss();
      })
    });
  }

}
