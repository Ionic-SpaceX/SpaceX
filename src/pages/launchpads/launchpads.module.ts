import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaunchpadsPage, LaunchpadDetailsPage } from './launchpads';

@NgModule({
  declarations: [
    LaunchpadsPage,
    LaunchpadDetailsPage
  ],
  imports: [
    IonicPageModule.forChild(LaunchpadsPage),
  ],
  entryComponents: [
    LaunchpadsPage,
    LaunchpadDetailsPage
  ]
})
export class LaunchpadsPageModule {}
