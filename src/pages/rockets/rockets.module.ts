import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {RocketDetailsPage, RocketsPage} from './rockets';

@NgModule({
  declarations: [
    RocketsPage,
    RocketDetailsPage
  ],
  imports: [
    IonicPageModule.forChild(RocketsPage),
  ],
  entryComponents: [
    RocketsPage,
    RocketDetailsPage
  ]
})
export class RocketsPageModule {}
