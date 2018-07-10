import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CapsulesPage, CapsuleDetailsPage } from './capsules';

@NgModule({
  declarations: [
    CapsulesPage,
    CapsuleDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CapsulesPage),
  ],
  entryComponents: [
    CapsulesPage,
    CapsuleDetailsPage,
  ]
})
export class CapsulesPageModule {}
