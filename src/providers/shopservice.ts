import { Injectable, ViewChild } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import { AlertController, Nav } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class shopservice{
  @ViewChild(Nav) nav: Nav;

  private getShopURL: string = 'http://198.38.93.107/ServerWebApi/api/MAUPartners/getallpartners';
  private getDiscountURL: string = 'http://198.38.93.107/ServerWebApi/api/MAUPartners/partner/';
  constructor(public http: Http, private alertCtrl: AlertController) {
}
getShop(ShopId: number) {
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Promise(resolve => {
    this.http.get(this.getShopURL)
      .subscribe((res) => {
        let mydata = res.json();
        console.log("res is", mydata);
        if(mydata.ResponseObject.length > 0)
          resolve(mydata.ResponseObject);
        else
          resolve(res.json());
      },
      err => {
        console.log("ERROR!: Status:" + err.status);
        console.log("ERROR!:" + err);
        console.log("ERROR!: Status JSON:" + err.json());
        // alert(err.json().errors[0]['detail']);
        var description: string = '';
        if (err.status === 400) {
          description = err.json().errors[0]['detail'];
        }
        if (err.status === 401) {
          description = err.json().errors[0]['detail'];
        }
        else {
          description = err;
        }
        let errorLoginAlert = this.alertCtrl.create({
          title: 'Erreur ' + err.status,
          subTitle: description,
          buttons: [{
            text: 'OK',
          }]
        });
        errorLoginAlert.present();
      });
  })
}
getDiscount(ShopID: number){
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Promise(resolve=>{
    this.http.get(`${this.getDiscountURL}${ShopID}/discounts`)
      .subscribe((res) => {
        let mydata = res.json();
        console.log("res is", mydata);
        if(mydata.ResponseObject.length > 0)
          resolve(mydata.ResponseObject);
        else
        resolve(res.json());
      },
      err => {
        console.log("ERROR!: Status:" + err.status);
        console.log("ERROR!:" + err);
        console.log("ERROR!: Status JSON:" + err.json());
        // alert(err.json().errors[0]['detail']);
        var description: string = '';
        if (err.status === 400) {
          description = err.json().errors[0]['detail'];
        }
        if (err.status === 401) {
          description = err.json().errors[0]['detail'];
        }
        else {
          description = err;
        }
        let errorLoginAlert = this.alertCtrl.create({
          title: 'Erreur ' + err.status,
          subTitle: description,
          buttons: [{
            text: 'OK',
          }]
        });
        errorLoginAlert.present();
      });
  })
}
}
