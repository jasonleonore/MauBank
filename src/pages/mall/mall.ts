import { Component, Input } from '@angular/core';
import { ModalController, NavController, Platform, ViewController } from 'ionic-angular';
import { BagatellePage } from '../mall/bagatelle/bagatelle';
import { shopservice } from '../../providers/shopservice';
import { Shop } from '../../models/shop';
import { Mall } from '../../models/Mall';

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
  public malls: Array<Mall>;
  public shops: Array<Shop>;
    constructor( public navCtrl: NavController, public modalCtrl: ModalController, private shopservice: shopservice) {
      this.malls = [];
      this.shops = [];
  }
  ngOnInit(){
    this.getShoppingCenterData();
  }
  ngOnChanges(){
    console.log(this.currentShopID);
    this.getShopData();
    this.getShoppingCenterData();
  }
  gotobagatellepage(shoppingCenterId: number){
    console.log("This current shopping center ID is", shoppingCenterId);
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
