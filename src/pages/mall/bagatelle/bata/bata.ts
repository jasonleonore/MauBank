import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BagatellePage } from '../bagatelle';

@Component({
  selector: 'page-bata',
  templateUrl: 'bata.html'
})
export class BataPage {
private navCtrl: NavController;
  constructor() {}

  dismiss(){
    this.navCtrl.push(BagatellePage);
  }

}
