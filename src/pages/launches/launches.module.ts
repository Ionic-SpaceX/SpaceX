import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaunchesPage } from './launches';

@NgModule({
  declarations: [
    LaunchesPage,
  ],
  imports: [
    IonicPageModule.forChild(LaunchesPage),
  ],
})
export class LaunchesPageModule {}
