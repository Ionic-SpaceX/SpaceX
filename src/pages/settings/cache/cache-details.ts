import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {CacheService} from "ionic-cache";

@Component({
  templateUrl: 'cache-details.html',
})
export class CacheDetailsPage {
  cacheItems = [];
  constructor(params: NavParams,private cacheService:CacheService) {
    this.getCacheItems();
  }

  public clearCache(){
    this.cacheService.clearAll();
    this.cacheItems = [];
  }

  public getCacheItems(){
    this.cacheService.getRawItems().then(res => {
      this.cacheItems = res;
    });
  }

}
