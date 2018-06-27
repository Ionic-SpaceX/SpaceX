import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import {CacheDetailsPage} from "./cache/cache-details";

@NgModule({
  declarations: [
    SettingsPage,
    CacheDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
  ],
  entryComponents: [
    SettingsPage,
    CacheDetailsPage
  ]
})
export class SettingsPageModule {}
