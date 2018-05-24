import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HeroProvider } from '../../providers/hero/hero';
import { CommonFunctionsProvider } from '../../providers/common-functions/common-functions';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public id;
  public obj: any;
  public hero: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public heroProvider: HeroProvider
  ) {
    this.id = navParams.get("id");
    this.loadHero(this.id);
  }
  loadHero(id){
    this.heroProvider.getDescription(id).subscribe
    (data => {
      console.log(data);
      this.obj = data;
      this.hero.name = this.obj.data.results[0].name; 
      this.hero.thumb = this.obj.data.results[0].thumbnail.path +"."+ this.obj.data.results[0].thumbnail.extension;
      this.hero.description =  this.obj.data.results[0].description;
    });
  }
 

}
