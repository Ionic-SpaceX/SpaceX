import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CacheDetailsPage} from "./cache/cache-details";
import {CacheService} from "ionic-cache";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  checkedCache = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private cacheService:CacheService) {
  }

  public goToCacheDetails(){
    this.navCtrl.push(CacheDetailsPage);
  }

  public activeCache(enable:boolean){
    this.cacheService.enableCache(enable);
  }


}
