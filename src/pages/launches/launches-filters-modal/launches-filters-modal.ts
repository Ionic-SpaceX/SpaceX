import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the LaunchesFiltersModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-launches-filters-modal',
  templateUrl: 'launches-filters-modal.html',
})
export class LaunchesFiltersModalPage {

  filters: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    const filters = this.navParams.get('currentFilters');
    this.filters = filters;
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  resetFilters(){
    this.filters = { order: 'desc' };
    this.filters.launch_year = '';
    this.filters.reused = '';
  }

  submitNewFilters(){
    this.viewCtrl.dismiss(this.filters);
  }

}
