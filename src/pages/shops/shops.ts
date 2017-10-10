import { Component, Input } from '@angular/core';
import { shopservice } from '../../providers/shopservice';
import { ModalController, NavController, Platform, ViewController, NavParams } from 'ionic-angular';
import { Shop } from '../../models/shop';
import { Discount } from '../../models/discount';
import { DiscountPage } from '../mall/bagatelle/discount/discount';
@Component({
  selector: 'page-shops',
  templateUrl: 'shops.html',
  providers: [shopservice]
})
export class ShopsPage {
  @Input() currentShopID: number;
  @Input() currentDiscountID: number;
  private currentShop: Shop;
  private currentDiscount: Discount;
  public shops: Array<Shop>
  public discounts: Array<Discount>;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private shopservice: shopservice, public navParams: NavParams) {
    this.shops = [];
    this.discounts = [];
    this.getShopData();
    // this.Maushops="All Shops";
  }
  ngOnChanges(){
    // console.log(this.currentShopID);
    this.getShopData();
    // this.getDiscountData();
  }
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
  gotodiscount(shop: number){
    this.navCtrl.push(DiscountPage, { shop: shop });
  }

}
