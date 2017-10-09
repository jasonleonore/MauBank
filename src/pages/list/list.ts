import { Component, Input, ViewChild } from '@angular/core';
import { NavController, Platform,AlertController, Nav, NavParams } from 'ionic-angular';
import { Locations } from '../../providers/locations';
import { shopservice } from '../../providers/shopservice';
import { Shop } from '../../models/shop';
import {Http, Headers, RequestOptions} from '@angular/http';
// import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Discount } from '../../mall/bagatelle/discount/discount';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [shopservice]
})
export class ListPage {
private navCtrl: NavController
@Input() currentShopID: number;
private currentShop: Shop;
public shops: Array<Shop>
@ViewChild(Nav) nav: Nav;
pushMessage: string = 'Amazing discounts near you';
  constructor( public locations: Locations, private shopservice: shopservice, public platform: Platform, public alertCtrl: AlertController, public params: NavParams) {
    this.shops = [];
  //   if (params.data.message) {
  //   this.pushMessage = params.data.message;
  // }
  }

  ngOnInit(){
      this.getShopData();
    // this.getShopData();
    // this.getDiscountData();
  }
  ngOnChanges(){
    // console.log(this.currentShopID);

    this.locations.load();
    // this.getDiscountData();
  }
  //get data from the database
  getShopData() {
    this.shopservice.getShops(this.currentShopID).then((res:Array<Shop>) =>{
for(let index = 0; index <res.length; index++){
  let currentShopInstance = res[index];
  console.log(this.shops);
  this.shops.push(new Shop(currentShopInstance.ShopId, currentShopInstance.ShoppingCenterId, currentShopInstance.ShopName, currentShopInstance.locationLongitude, currentShopInstance.LocationLatitude,currentShopInstance.shopPicture,currentShopInstance.discount))
}
    },
      err =>{
        console.log(err);
        alert(err);
      }
  )
  }
  // sendDistance(){
  //     for(let Shop of this.locations.data){
  //       if(Shop.distance<1){
  //         var headers = new Headers();
  //         headers.append('Content-Type', 'application/json');
  //         return new Promise(resolve => {
  //           this.http.put(Shop.ShopName, new RequestOptions({ headers: headers }))
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

}
