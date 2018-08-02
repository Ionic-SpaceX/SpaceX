import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpaceXProvider } from "../../providers/space-x/space-x";

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  histories: any;
  filters = {
    order: 'asc',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private spaceXProvider: SpaceXProvider) {
    this.getCompanyHistory(this.filters);
  }

  getCompanyHistory(filters) {
    this.spaceXProvider.getCompanyHistory(filters).subscribe(data => {
      this.histories = data;
    })
  }

  changeDataOrder() {
    this.filters.order = this.filters.order === 'desc' ? 'asc' : 'desc';
    this.getCompanyHistory(this.filters);
  }

}
