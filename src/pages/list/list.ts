import { Component, Input, ViewChild } from '@angular/core';
import { NavController, Platform,AlertController, Nav, NavParams } from 'ionic-angular';
import { Locations } from '../../providers/locations';
import { shopservice } from '../../providers/shopservice';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Shop } from '../../models/shop';
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
  public sendIdUrl: string = 'http://198.38.93.107/ServerWebApi/api/MAUPartners/pushnotification/';
public shops: Array<Shop>
public playerID: any;
// public playerID: string;
@ViewChild(Nav) nav: Nav;
pushMessage: string = 'Amazing discounts near you';
  constructor( public locations: Locations, private shopservice: shopservice,public http:Http, public platform: Platform, public alertCtrl: AlertController, public params: NavParams) {
    this.shops = [];
  //   if (params.data.message) {
  //   this.pushMessage = params.data.message;
  // }
  }

  ngOnInit(){
      this.getShopData();
      this.sendnotif();
    // this.getShopData();
    // this.getDiscountData();
  }
  ngOnChanges(){
    // console.log(this.currentShopID);
  this.sendnotif();
    this.locations.load();

    // this.getDiscountData();
  }
  sendnotif(){
    console.log("current distance is "+this.locations.data.shops.distance);
    if(this.locations.data.shops.distance<1){
      this.sendId();

    }
  }
  getOneSignalPlayerId() {
    window["plugins"].OneSignal.getPermissionSubscriptionState(function(status) {
      status.permissionStatus.hasPrompted;
      status.permissionStatus.status;

      status.subscriptionStatus.subscribed;
      status.subscriptionStatus.userSubscriptionSetting;
      status.subscriptionStatus.pushToken;


       var playerID = status.subscriptionStatus.userId;
      alert("playerid is"+status.subscriptionStatus.userId);
      console.log("playerid is"+status.subscriptionStatus.userId);

  });
  }
  sendId(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // ShoppingCenterId=0;
    return new Promise(resolve=>{

      this.http.get(this.sendIdUrl+"/"+this.playerID+"/"+this.currentShop.ShopId)
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

}
