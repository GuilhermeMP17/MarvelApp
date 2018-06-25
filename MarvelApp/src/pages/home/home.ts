import { Component } from '@angular/core';
import { NavController, InfiniteScroll } from 'ionic-angular';
import { HeroProvider } from '../../providers/hero/hero';
import { Observable } from 'rxjs/Observable';
import { CommonFunctionsProvider } from '../../providers/common-functions/common-functions'
import { ViewChild } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public obj: any;
  public heroes: any;
  public limit: number = 5;
  public offset: number =5;
  public searchQuery: string = '';
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(
    public navCtrl: NavController,
    public heroProvider: HeroProvider,
    public common: CommonFunctionsProvider
  ) {
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
          this.offset += 5;
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

  searchHeroes(searchQuery) {
    console.log(this.common.encodeQueryData(searchQuery));
    let usersObservable: Observable<[any]>;
    usersObservable = this.heroProvider.getHeroAll(this.common.encodeQueryData(searchQuery));
    this.obj =[];
    this.heroes=[];
    usersObservable.subscribe(
      data => {
        this.obj = data;
        this.heroes = this.obj.data.results;
        }
      );
  }

  getDescription(id){
    this.navCtrl.push('DescriptionPage', {
      id: id
    })
  }

  onSearchChange(searchQuery) {
    
    if(searchQuery || searchQuery.trim() != '' ){
      setTimeout(() => {
        this.searchHeroes({orderBy: 'name', nameStartsWith: searchQuery});
      }, 200)
    }
    if(searchQuery || searchQuery.trim() == '' ){
      this.searchHeroes({orderBy: 'name', limit: this.limit});
    }
  }

}
