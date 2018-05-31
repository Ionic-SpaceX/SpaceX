import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaunchesFiltersModalPage } from './launches-filters-modal';

@NgModule({
  declarations: [
    LaunchesFiltersModalPage,
  ],
  imports: [
    IonicPageModule.forChild(LaunchesFiltersModalPage),
  ],
})
export class LaunchesFiltersModalPageModule {}
