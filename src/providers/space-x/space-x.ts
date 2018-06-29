import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CacheService} from "ionic-cache";

/*
  Generated class for the SpaceXProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpaceXProvider {

  apiUrl: string = 'https://api.spacexdata.com/v2';

  constructor(public http: HttpClient,private cache: CacheService) {
  }

  getCompagnyInfo() {
    let cacheKey = this.apiUrl + '/info';
    let request = this.http.get(cacheKey);
    return this.cache.loadFromObservable(cacheKey, request);
  }

  getAllRockets(){
    let cacheKey = this.apiUrl + '/rockets';
    let request = this.http.get(cacheKey);
    return this.cache.loadFromObservable(cacheKey, request);
  }

  getAllCapsules(){
    let cacheKey = this.apiUrl + '/capsules';
    let request = this.http.get(cacheKey);
    return this.cache.loadFromObservable(cacheKey, request);
  }

  getlaunchpads() {
    let cacheKey = `${this.apiUrl}/launchpads`;
    let request = this.http.get(cacheKey);
    return this.cache.loadFromDelayedObservable(cacheKey, request);
  }

  getAllLaunches(filters){
    let receivedFilters = '';
    const filtersKeys = filters != null ? Object.keys(filters) : null;
    if (filtersKeys != null && filtersKeys.length > 0) {
      filtersKeys.forEach((filter, index) => {
        if( index === 0) {
          receivedFilters += `?${filter}=${encodeURIComponent(filters[filter])}`;
        }
        else {
          receivedFilters += `&${filter}=${encodeURIComponent(filters[filter])}`;
        }
      });
    }


    let cacheKey = this.apiUrl + `/launches/${receivedFilters}`;
    let request = this.http.get(cacheKey);
    return this.cache.loadFromObservable(cacheKey, request);
  }

  getPastLaunches(filters){
    let receivedFilters = '';
    const filtersKeys = filters != null ? Object.keys(filters) : null;
    if (filtersKeys != null && filtersKeys.length > 0) {
      filtersKeys.forEach((filter, index) => {
        if (index === 0) {
          receivedFilters += `?${filter}=${encodeURIComponent(filters[filter])}`;
        }
        else {
          receivedFilters += `&${filter}=${encodeURIComponent(filters[filter])}`;
        }
      });
    }
    let cacheKey = this.apiUrl + `/launches/${receivedFilters}`;
    let request = this.http.get(cacheKey);
    return this.cache.loadFromObservable(cacheKey, request);

  }

  getUpcomingLaunches(){
    let cacheKey = this.apiUrl + `/launches/upcoming`;
    let request = this.http.get(cacheKey);
    return this.cache.loadFromObservable(cacheKey, request);

  }

  getNextLaunch(){
    let cacheKey = this.apiUrl + `/launches/next`;
    let request = this.http.get(cacheKey);
    return this.cache.loadFromObservable(cacheKey, request);
  }

  getSpecificInformationWithId(information: String, id: String){
    let cacheKey = `${this.apiUrl}/${information}/${id}`;
    let request = this.http.get(cacheKey);
    return this.cache.loadFromDelayedObservable(cacheKey, request);
  }

  isCachabled(key):Promise<string | boolean>{
    let result = this.cache.itemExists(key);
    return result;
  }
}
