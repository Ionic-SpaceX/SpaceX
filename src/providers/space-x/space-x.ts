import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SpaceXProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpaceXProvider {

  apiUrl: string = 'https://api.spacexdata.com/v2';

  constructor(public http: HttpClient) {
    console.log('Hello SpaceXProvider Provider');
  }

  getCompagnyInfo() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/info').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getAllRockets(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/rockets').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getAllCapsules(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/capsules').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getAllLaunches(filters){
    let receivedFilters;
    const filtersKeys = filters != null ? Object.keys(filters) : null;
    if (filtersKeys != null && filtersKeys.length > 0) {
      filtersKeys.forEach((filter, index) => {
        if( index === 0) {
          receivedFilters += `?${filter}=${encodeURIComponent(filters[filter])}`;
        }
        else {
          receivedFilters += `$${filter}=${encodeURIComponent(filters[filter])}`;
        }
      });
    }
    return new Promise(resolve => {
      this.http.get(`${this.apiUrl}/launches/${receivedFilters}`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    })
  }

  getPastLaunches(){
    return new Promise(resolve => {
      this.http.get(`${this.apiUrl}/launches`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    })
  }

  getUpcomingLaunches(){
    return new Promise(resolve => {
      this.http.get(`${this.apiUrl}/launches/upcoming`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    })
  }

  getNextLaunch(){
    return new Promise(resolve => {
      this.http.get(`${this.apiUrl}/launches/next`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    })
  }
}
