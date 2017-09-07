import { Component, Input } from '@angular/core';
import { ModalController, NavController, Platform, ViewController } from 'ionic-angular';
import { MallPage } from '../mall';
import { DiscountPage } from '../bagatelle/discount/discount';
import { CityPage } from '../bagatelle/city/city';
import { ShafiqPage } from '../bagatelle/shafiq/shafiq';
import { BataPage } from '../bagatelle/bata/bata';
import { shopservice } from '../../../providers/shopservice';
import { Shop } from '../../../models/shop';
import { Discount } from '../../../models/discount';

@Component({
  selector: 'page-bagatelle',
  templateUrl: 'bagatelle.html',
  providers: [shopservice]
})
export class BagatellePage {
  @Input() currentShopID: number;
  @Input() currentDiscountID: number;
  private currentShop: Shop;
  private currentDiscount: Discount;
public shops: Array<Shop>
  public discounts: Array<Discount>;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private shopservice: shopservice) {
    // this.shops = [];
    this.shops = [];
    this.discounts = [];
  }
  ngOnInit(){
    console.log(this.currentShopID);
    this.getShopData();
    // this.getDiscountData();
  }
  ngOnChanges(){
    // console.log(this.currentShopID);
    this.getShopData();
    // this.getDiscountData();
  }
  getShopData() {
    this.shopservice.getShop(this.currentShopID).then((res:Array<Shop>) =>{
for(let index = 0; index <res.length; index++){
  let currentShopInstance = res[index];
  console.log(this.shops);
  this.shops.push(new Shop(currentShopInstance.ShopId, currentShopInstance.ShoppingCenterid, currentShopInstance.ShopName, currentShopInstance.locationLongitude, currentShopInstance.LocationLatitude,currentShopInstance.shopPicture,currentShopInstance.discount))
}
    },
      err =>{
        console.log(err);
        alert(err);
      }
  )
  }

  dismiss(){
    this.navCtrl.push(MallPage);
  }
  gotodiscount(shop: number){
    this.navCtrl.push(DiscountPage, { shop: shop });
  }
  gotocity(){
    this.navCtrl.push(CityPage);
  }
  gotoshafiq(){
    this.navCtrl.push(ShafiqPage);
  }
  gotobata(){
    this.navCtrl.push(BataPage);
  }
}
