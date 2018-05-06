import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CapsulesPage } from './capsules';

@NgModule({
  declarations: [
    CapsulesPage,
  ],
  imports: [
    IonicPageModule.forChild(CapsulesPage),
  ],
})
export class CapsulesPageModule {}
