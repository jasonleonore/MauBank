import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Locations } from '../../providers/locations';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
private navCtrl: NavController

  constructor( public locations: Locations) {}

  ionViewDidLoad() {
    console.log('Hello ListPage Page');
  }
  

}
