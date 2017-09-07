import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Locations } from '../../providers/locations';
import { shopservice } from '../../providers/shopservice';
import { Shop } from '../../models/shop';

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

  constructor( public locations: Locations, private shopservice: shopservice) {
    this.shops = [];
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


}
