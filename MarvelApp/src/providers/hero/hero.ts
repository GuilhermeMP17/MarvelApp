import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Md5 } from '../../../node_modules/ts-md5/dist/md5';

/*
  Generated class for the HeroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HeroProvider {
  data: any;
  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController
  ) { }

  getHeroAll(filter: string): Observable<any> {
    //this.presentLoading();
    let md5 = new Md5();
    var timestamp = Number(new Date());
    var hash = Md5.hashStr(timestamp + '788109501550b61f31921c8668c3be88cc89ea321b6da468e61a1137f99e8e59af9d7404');
    return this.http.get(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&` + filter + `&apikey=1b6da468e61a1137f99e8e59af9d7404&hash=${hash}`);
  }

  getDescription(id: number) {
    let md5 = new Md5();
    var timestamp = Number(new Date());
    var hash = Md5.hashStr(timestamp + '788109501550b61f31921c8668c3be88cc89ea321b6da468e61a1137f99e8e59af9d7404');
    return this.http.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timestamp}&orderBy=name&limit=20&apikey=1b6da468e61a1137f99e8e59af9d7404&hash=${hash}`);
  }
  
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present();
  }
}
