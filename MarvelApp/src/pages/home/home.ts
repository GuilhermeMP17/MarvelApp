import { Component } from '@angular/core';
import { IonicPage, NavController, InfiniteScroll } from 'ionic-angular';
import { HeroProvider } from '../../providers/hero/hero';
import { Observable } from 'rxjs/Observable';
import { CommonFunctionsProvider } from '../../providers/common-functions/common-functions'
import { ViewChild } from '@angular/core';
import { AboutPage } from '../about/about';
import { DescriptionPage } from '../description/description';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public obj: any;
  public heroes: any;
  public limit: number = 5;
  public offset: number =5;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(
    public navCtrl: NavController,
    public heroProvider: HeroProvider,
    public common: CommonFunctionsProvider
  ) {
    //this.infiniteScroll.enable(true);
    this.getAllHeroes({orderBy: 'name', limit: this.limit});
  }

  getAllHeroes(queryString) {
    let usersObservable: Observable<[any]>;
    usersObservable = this.heroProvider.getHeroAll(this.common.encodeQueryData(queryString));
    this.obj =[];
    usersObservable.subscribe(
      data => {
        this.obj = data;
        if(this.heroes!= null)
        {
          this.obj.data.results.forEach(element => {
            this.heroes.push(element);
          });
        }
        else{
          this.heroes = this.obj.data.results;
        }
        if (this.infiniteScroll) {
          this.infiniteScroll.complete();
          if (this.heroes.length == this.obj.data.total) {
            this.infiniteScroll.enable(false);
          }
        }
      });
  }
  getHeros() {
    setTimeout(() => {
      this.limit = 2;
      this.getAllHeroes({limit:this.limit, offset: this.offset});
    }, 500);
      this.offset += 2;
  }

  getDescription(id){
    this.navCtrl.push('DescriptionPage', {
      id: id
    })
  }

}
