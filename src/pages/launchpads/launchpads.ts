import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SpaceXProvider } from '../../providers/space-x/space-x';
import leaflet from "leaflet";

/**
 * Generated class for the LaunchpadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'launchpad-details.html',
})
export class LaunchpadDetailsPage {
  @ViewChild('launchpadMap') mapContainer: ElementRef;
  launchpad;
  map: any;

  constructor(params: NavParams) {
    this.launchpad = params.data;
  }

  ionViewDidEnter(){
    if (this.launchpad){
      this.loadmap();
    }
  }

  loadmap(){
    this.map = leaflet.map("launchpadMap").fitWorld();
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    let markerGroup = leaflet.featureGroup();
    let marker: any = leaflet.marker([this.launchpad.location.latitude, this.launchpad.location.longitude]);
    markerGroup.addLayer(marker);
    this.map.addLayer(markerGroup);

    this.map.setView([this.launchpad.location.latitude, this.launchpad.location.longitude], 10);
    this.map.scrollWheelZoom.disable();
  }
}

@IonicPage()
@Component({
  selector: 'page-launchpads',
  templateUrl: 'launchpads.html',
})
export class LaunchpadsPage {

  launchpads: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private spaceXprovider: SpaceXProvider) {
    this.getLaunchpads();
  }

  getLaunchpads(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.spaceXprovider.getlaunchpads().subscribe(data => {
      console.log(data);
      this.launchpads = data;
      loader.dismiss();
    });
  }

  goToLaunchpadDatails(launchpad){
    this.navCtrl.push(LaunchpadDetailsPage, launchpad);
  }

}
