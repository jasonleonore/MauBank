import { Injectable, ViewChild } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Locations } from '../providers/locations';
import { AlertController, Nav } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class shopservice{
  @ViewChild(Nav) nav: Nav;
//web api URLS
  private getShopsURL: string = 'http://198.38.93.107/ServerWebApi/api/MAUPartners/getallpartners';
  private getShopURL: string = 'http://198.38.93.107/ServerWebApi/api/MAUPartners/shoppingcenter/';
  private getDiscountURL: string = 'http://198.38.93.107/ServerWebApi/api/MAUPartners/partner/';
  private getMallURL: string = 'http://198.38.93.107/ServerWebApi/api/MAUPartners/shoppingcenters';
  constructor(public http: Http, private alertCtrl: AlertController) {
}
//send shopname to the server side
// sendDistance(){
//     for(let Shop of this.locations.data){
//       if(Shop.distance<1){
//         var headers = new Headers();
//         headers.append('Content-Type', 'application/json');
//         return new Promise(resolve => {
//           this.http.put(this.getShopURL,Shop.ShopId, new RequestOptions({ headers: headers }))
//             .subscribe((res) => {
//               resolve(res.json());
//             },
//             err => {
//               console.log("ERROR!: Status:" + err.status);
//               console.log("ERROR!:" + err);
//               console.log("ERROR!: Status JSON:" + err.json());
//             });
//         })
//
//       }
//     }
// }
//retrieve all the shops from the web api
getShops(ShoppingCenterId: number) {
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Promise(resolve => {
    this.http.get(this.getShopsURL)
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
//retrieve all the malls that are in the present in the database
getMall(ShoppingCenterId: number) {
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Promise(resolve => {
    this.http.get(this.getMallURL)
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
//get the details of one shop in the database
getShop(ShoppingCenterId: number){
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  // ShoppingCenterId=0;
  return new Promise(resolve=>{

    this.http.get(`${this.getShopURL}${ShoppingCenterId}/shops`)
      .subscribe((res) => {
        let mydata = res.json();
        console.log("res Shop is", mydata);
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
//get the discount of of a specific shop
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
