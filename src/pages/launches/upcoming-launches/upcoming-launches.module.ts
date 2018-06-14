import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpcomingLaunchesPage } from './upcoming-launches';

@NgModule({
  declarations: [
    UpcomingLaunchesPage,
  ],
  imports: [
    IonicPageModule.forChild(UpcomingLaunchesPage),
  ],
})
export class UpcomingLaunchesPageModule {}
