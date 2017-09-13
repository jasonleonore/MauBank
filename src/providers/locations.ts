import { Injectable, Component, Input } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
declare var google;
import { shopservice } from '../providers/shopservice';
import { Shop } from '../models/shop';
//
// @Component({
// 	providers: [shopservice]
// })

@Injectable()
export class Locations {
	@Input() currentShopID: number;
	private currentShop: Shop;
	public shops: Array<Shop>;
	data: any;
	position: any;
	public userlat: number;
	public userlong: number;
	constructor(public http: Http, private shopservice: shopservice) {
		  this.shops = [];
	}

	load(){

		// if(this.data){
		// 	this.getShopData();
		// 	return Promise.resolve(this.data);
		// }

		return new Promise(resolve => {
						this.getShopData().then(()=> {
							this.data = this.applyHaversine(this.shops);
  						this.data.sort((locationA, locationB)=>{
  							return locationA.distance - locationB.distance;
  						});
  						resolve(this.data);
						});

					});

			// this.http.get('assets/data/locations.json').map(res => res.json()).subscribe(data => {
			// 	this.data = this.applyHaversine(data.locations);
			// 	this.data.sort((locationA, locationB) => {
			// 		return locationA.distance - locationB.distance;
			// 	});
			// 	resolve(this.data);
			// });

	//	});
	}
//retrieve data from the database
	getShopData() {
		return this.shopservice.getShops(this.currentShopID).then((res:Array<Shop>) =>{
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

	applyHaversine(locations){

	 	let usersLocation= {

			lat: -19.9944433, lng :  57.5923818
			// lat: 0, lng :  0
		}
		//get current user location
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function (position) {

							 usersLocation.lat = position.coords.latitude;
							 usersLocation.lng = position.coords.longitude;
							 console.log("current user latitude"+usersLocation.lat);
							 console.log(usersLocation.lng);
			 });
		}
		console.log("The array size of shops is %f", this.shops.length);
		this.shops.map((shop) => {
			//get current shop longitude and latitude
			let placeLocation = {
				lat: shop.LocationLatitude,
				lng: shop.locationLongitude
			};

			console.log("shop latitude"+shop.LocationLatitude);
			console.log("shop longitude"+ shop.locationLongitude);

			shop["distance"] = this.getDistanceBetweenPoints(
				usersLocation,
				placeLocation,
				'km'
			).toFixed(2);
		});

		return this.shops;
	}
// calculations of distance between current location and shop location
	getDistanceBetweenPoints(start, end, units){

	    let earthRadius = {
	        miles: 3958.8,
	        km: 6371
	    };

	    let R = earthRadius[units || 'km'];
	    let lat1 = start.lat;
	    let lon1 = start.lng;
	    let lat2 = end.lat;
	    let lon2 = end.lng;
	    let dLat = this.toRad((lat2 - lat1));
	    let dLon = this.toRad((lon2 - lon1));
	    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	    Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
	    Math.sin(dLon / 2) *
	    Math.sin(dLon / 2);
	    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	    let d = R * c;

	    return d;

	}

	toRad(x){
		return x * Math.PI / 180;
	}

}
