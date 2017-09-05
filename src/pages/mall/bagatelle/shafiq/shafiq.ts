import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BagatellePage } from '../bagatelle';

@Component({
  selector: 'page-shafiq',
  templateUrl: 'shafiq.html'
})
export class ShafiqPage {
private navCtrl: NavController;
  constructor() {}

  dismiss(){
    this.navCtrl.push(BagatellePage);
  }

}
