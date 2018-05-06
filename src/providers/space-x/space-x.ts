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

}
