import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import {CacheDetailsPage} from "./cache/cache-details";
import {RocketDetailsPage, RocketsPage} from "../rockets/rockets";

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
