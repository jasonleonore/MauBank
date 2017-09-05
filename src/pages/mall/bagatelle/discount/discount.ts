import { Component,Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BagatellePage } from '../bagatelle';
import { shopservice } from '../../../../providers/shopservice';
import { Shop } from '../../../../models/shop';
import { Discount } from '../../../../models/discount';


@Component({
  selector: 'page-discount',
  templateUrl: 'discount.html',
  providers: [shopservice]
})
export class DiscountPage {
  @Input() currentShopID: number;
  @Input() currentDiscountID: number;
  private currentDiscount: Discount;
  private currentShop: Shop;

  // public shops: Array<Shop>;
    public discounts: Array<Discount>;
  constructor( private shopservice: shopservice, public navCtrl: NavController, public navParams: NavParams) {
    // this.shops = [];
    this.discounts = [];
    this.currentShopID = this.navParams.get("shop");
    console.log(this.currentShopID);

  }
  ngOnInit(){
    // this.currentDiscountID = 1;
    this.getDiscountData();

  }
  ngOnChanges(){
    console.log(this.currentShopID);
    console.log(this.currentDiscountID);
    // this.getShopData();
    this.getDiscountData();
  }
//   getShopData() {
//     this.shopservice.getShop(this.currentShopID).then((res:Array<Shop>) =>{
// for(let index = 0; index <res.length; index++){
//   let currentShopInstance = res[index];
//   console.log(this.shops);
//   this.shops.push(new Shop(currentShopInstance.ShopId, currentShopInstance.ShoppingCenterid, currentShopInstance.ShopName, currentShopInstance.locationLongitude, currentShopInstance.LocationLatitude,currentShopInstance.shopPicture,currentShopInstance.discount))
// }
//     },
//       err =>{
//         console.log(err);
//         alert(err);
//       }
//   )
//   }
  getDiscountData() {
    this.shopservice.getDiscount(this.currentShopID).then((res:Array<Discount>) =>{
      for(let index = 0; index <res.length; index++){
        let currentDiscountInstance = res[index];
        console.log(this.discounts);
        this.discounts.push(new Discount(currentDiscountInstance.DiscountID, currentDiscountInstance.DiscountHeading, currentDiscountInstance.DiscountText, currentDiscountInstance.DiscountPicture))
      }
    },
      err =>{
        console.log(err);
        alert(err);
      }
  )
  }
  dismiss(){
    this.navCtrl.push(BagatellePage);
  }

}
