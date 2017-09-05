import { Component, Input } from '@angular/core';
import { ModalController, NavController, Platform, ViewController } from 'ionic-angular';
import { BagatellePage } from '../mall/bagatelle/bagatelle';
import { shopservice } from '../../providers/shopservice';
import { Shop } from '../../models/shop';

@Component({
  selector: 'page-mall',
  templateUrl: 'mall.html',
  providers: [shopservice]
})
export class MallPage {
  @Input() currentShopID: number;
  private currentShop: Shop;
    constructor( public navCtrl: NavController, public modalCtrl: ModalController, private shopservice: shopservice) {
  }
  ngOnChanges(){
    console.log(this.currentShopID);
    this.getShopData();
  }
  gotobagatellepage(){
    this.navCtrl.push(BagatellePage);
  }
  getShopData() {
    this.shopservice.getShop(this.currentShopID).then((res: Shop) =>{
      this.currentShop = new Shop(res.ShopId, res.ShoppingCenterid, res.ShopName, res.locationLongitude, res.LocationLatitude, res.shopPicture, res.discount)
    },
      err =>{
        console.log(err);
        alert(err);
      }
  )
  }

}
