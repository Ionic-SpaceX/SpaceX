import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaunchesPage, LaunchDetailsPage } from './launches';

@NgModule({
  declarations: [
    LaunchesPage,
    LaunchDetailsPage
  ],
  imports: [
    IonicPageModule.forChild(LaunchesPage),
  ],
  entryComponents: [
    LaunchesPage,
    LaunchDetailsPage
  ]
})
export class LaunchesPageModule {}
