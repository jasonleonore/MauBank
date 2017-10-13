import { Component, Input } from '@angular/core';
import { ModalController, NavController, Platform, ViewController, AlertController } from 'ionic-angular';
import { BagatellePage } from '../mall/bagatelle/bagatelle';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { shopservice } from '../../providers/shopservice';
import { Shop } from '../../models/shop';
import { Mall } from '../../models/Mall';
import { Ishop } from '../../interfaces/shop';

@Component({
  selector: 'page-mall',
  templateUrl: 'mall.html',
  providers: [shopservice]
})
export class MallPage {
  @Input() currentShoppingCenterID: number;
  @Input() currentShopID: number;
  private currentShop: Shop;

  private currentShoppingCenter: Mall;
  private sendIdUrl: string = 'http://198.38.93.107/ServerWebApi/api/MAUPartners/pushnotification';
  public malls: Array<Mall>;
  public shops: Array<Shop>;
    constructor( public navCtrl: NavController,public http: Http, public modalCtrl: ModalController, private shopservice: shopservice, private alertCtrl: AlertController) {
      this.malls = [];
      this.shops = [];
  }
  ngOnInit(){
    this.getShoppingCenterData();
    // this.sendId();
  }
  ngOnChanges(){
    console.log(this.currentShopID);
    this.getShopData();
    this.getShoppingCenterData();
    // this.sendId();
  }
  // getOneSignalPlayerId() {
  //   window["plugins"].OneSignal.getPermissionSubscriptionState(function(status) {
  //     status.permissionStatus.hasPrompted;
  //     status.permissionStatus.status;
  //
  //     status.subscriptionStatus.subscribed;
  //     status.subscriptionStatus.userSubscriptionSetting;
  //     status.subscriptionStatus.pushToken;
  //
  //
  //     this.playerID = status.subscriptionStatus.userId;
  //     alert("playerid is"+status.subscriptionStatus.userId);
  // });
  // }
  // sendId(){
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   // ShoppingCenterId=0;
  //   return new Promise(resolve=>{
  //
  //     this.http.get(`${this.sendIdUrl}${this.playerID}/2`)
  //       .subscribe((res) => {
  //         let mydata = res.json();
  //         console.log("res Shop is", mydata);
  //         if(mydata.ResponseObject.length > 0)
  //           resolve(mydata.ResponseObject);
  //         else
  //         resolve(res.json());
  //       },
  //       err => {
  //         console.log("ERROR!: Status:" + err.status);
  //         console.log("ERROR!:" + err);
  //         console.log("ERROR!: Status JSON:" + err.json());
  //         // alert(err.json().errors[0]['detail']);
  //         var description: string = '';
  //         if (err.status === 400) {
  //           description = err.json().errors[0]['detail'];
  //         }
  //         if (err.status === 401) {
  //           description = err.json().errors[0]['detail'];
  //         }
  //         else {
  //           description = err;
  //         }
  //         let errorLoginAlert = this.alertCtrl.create({
  //           title: 'Erreur ' + err.status,
  //           subTitle: description,
  //           buttons: [{
  //             text: 'OK',
  //           }]
  //         });
  //         errorLoginAlert.present();
  //       });
  //   })
  // }


  gotobagatellepage(shoppingCenterId: number){
    // console.log("This current shopping center ID is", shoppingCenterId);
    this.navCtrl.push(BagatellePage, {mall: shoppingCenterId});
  }
  getShopData() {
    this.shopservice.getShop(this.currentShopID).then((res:Array<Shop>) =>{
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
  getShoppingCenterData() {
    this.shopservice.getMall(this.currentShoppingCenterID).then((res:Array<Mall>) =>{
      for(let index = 0; index <res.length; index++){
        let currentMallInstance = res[index];
        console.log(this.malls);
        this.malls.push(new Mall(currentMallInstance.ShoppingCenterId, currentMallInstance.ShoppingCenterName, currentMallInstance.ShoppingCenterPicture))
      }
    },
      err =>{
        console.log(err);
        alert(err);
      }
  )
  }



}
