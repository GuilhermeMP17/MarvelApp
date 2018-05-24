import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CommonFunctionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonFunctionsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CommonFunctionsProvider Provider');
  }

  encodeQueryData(data) {
    let ret = [];
    for (let d in data) {
      if (data[d].value == undefined) {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      }
      else {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d].value));
      }
    }
    return ret.join('&');
  }
}
