import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PastLaunchesPage } from './past-launches';

@NgModule({
  declarations: [
    PastLaunchesPage,
  ],
  imports: [
    IonicPageModule.forChild(PastLaunchesPage),
  ],
})
export class PastLaunchesPageModule {}
