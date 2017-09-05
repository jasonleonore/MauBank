import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BagatellePage } from '../bagatelle';

@Component({
  selector: 'page-city',
  templateUrl: 'city.html'
})
export class CityPage {
private navCtrl:NavController;
  constructor() {}

  dismiss(){
    this.navCtrl.push(BagatellePage);
  }

}
