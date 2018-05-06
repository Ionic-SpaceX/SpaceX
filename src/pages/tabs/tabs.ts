import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { RocketsPage } from '../rockets/rockets';
import { CapsulesPage } from '../capsules/capsules';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = RocketsPage;
  tab4Root = CapsulesPage;

  constructor() {

  }
}
