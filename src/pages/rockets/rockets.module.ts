import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RocketsPage } from './rockets';

@NgModule({
  declarations: [
    RocketsPage,
  ],
  imports: [
    IonicPageModule.forChild(RocketsPage),
  ],
})
export class RocketsPageModule {}
