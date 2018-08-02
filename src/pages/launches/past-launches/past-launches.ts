import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SpaceXProvider } from '../../../providers/space-x/space-x';
import { LaunchesFiltersModalPage } from '../launches-filters-modal/launches-filters-modal';
import { LaunchDetailsPage } from '../launches';
import { StatsPage } from '../../stats/stats';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private spaceXProvider: SpaceXProvider, private modalCtrl: ModalController) {
      this.getPastLaunches(this.filters);
  }

  seeStats(){
    console.log('stats past launches');
    this.navCtrl.push(StatsPage);
  }

  getPastLaunches(filters){
    this.spaceXProvider.getPastLaunches(filters).subscribe(data => {
      this.pastLaunches = data;
    })
  }

  goToLaunchDetails(launch){
    this.navCtrl.push(LaunchDetailsPage, launch);
  }

  openModal(){
    const filtersModal = this.modalCtrl.create(LaunchesFiltersModalPage, { currentFilters: this.filters });
    filtersModal.present();

    filtersModal.onDidDismiss(newFilters => {
      if (newFilters){
        Object.keys(newFilters).forEach(filter => {
          if (newFilters[filter] === ''){
            delete newFilters[filter];
          }
        });
        this.filters = newFilters;
        this.getPastLaunches(this.filters);
      }
    });
  }
}
