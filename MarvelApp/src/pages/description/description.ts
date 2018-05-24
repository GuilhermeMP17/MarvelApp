import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HeroProvider } from '../../providers/hero/hero';
import { CommonFunctionsProvider } from '../../providers/common-functions/common-functions';
/**
 * Generated class for the DescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})
export class DescriptionPage {
  public id;
  public obj: any;
  public hero: any;
  public nameHero:any;
  public thumbHero:any;
  public descriptionHero: any;


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
      this.hero = this.obj.data.results[0];
      console.log(this.hero);
      this.nameHero = this.hero.name; 
      this.thumbHero = this.obj.data.results[0].thumbnail.path +"."+ this.obj.data.results[0].thumbnail.extension;
      this.descriptionHero =  this.obj.data.results[0].description;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionPage');
  }

}
