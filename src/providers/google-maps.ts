import { Injectable, Component, Input } from '@angular/core';
import { Connectivity } from './connectivity';
import { Geolocation } from 'ionic-native';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Locations } from './locations';
import { shopservice } from '../providers/shopservice';
import { Shop } from '../models/shop';
import { Observable } from 'rxjs/Rx';

declare var google;

class NavigationParameters {
  data = {
    user: {
          _id: "001",
          name: "Mike",
    }
 };

 get(param){
   return this.data[param];
 }
}

@Injectable()
export class GoogleMaps {
// @ViewChild('map') mapElement: ElementRef;
  mapElement: any;
  @Input() currentShopID: number;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;
  shoplatitude: any;
  shoplongitude: any;
  private currentShop: Shop;
  public shops: Array<Shop>
  public navCtrl: NavController;
    private timer;
  constructor( public connectivityService: Connectivity,public locations: Locations, private toastCtrl: ToastController, private shopservice: shopservice) {
    this.shops = [];
  }

  ngOnChanges(){
    this.locations.load();
  }
  ngOnInit() {
    this.timer = Observable.timer(1000, 2000);
    this.timer.subscribe(t => this.showtoast());
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivityService.isOnline()){

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      }
      else {

        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

      }

      this.addConnectivityListeners();

    });

  }
  getShopData() {
    return this.shopservice.getShop(this.currentShopID).then((res:Array<Shop>) =>{
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

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      Geolocation.getCurrentPosition().then((position) => {

      	// UNCOMMENT FOR NORMAL USE
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        // let latLng = new google.maps.LatLng(-19.9944433,57.5923818);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          radius: 50,
          strokecolor:'#228f80',
          strokeWidth: 3,
          fillColor:'#bcddd8',
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        // this.map.addCircle({
        //   'center': google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        //   'radius': 50,
        //   'strokeColor': '#228f80',
        //   'strokeWidth': 3,
        //   'fillColor': '#bcddd8'
        // });

        this.map = new google.maps.Map(this.mapElement, mapOptions);

        resolve(true);

      });

    });

  }
  showtoast(){
    for(let shop of this.locations.data ){
      if(shop.distance>0.5){
      let toast = this.toastCtrl.create({
        message: 'There is a discount near you our application to see the discount',
        duration: 3000
      });
      toast.present();
    }
    err =>{
      console.log(err);
      alert(err);
    }
  }
  }

  disableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    document.addEventListener('online', () => {

      console.log("online");

      setTimeout(() => {

        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    }, false);

    document.addEventListener('offline', () => {

      console.log("offline");

      this.disableMap();

    }, false);

  }

  addMarker(lat: number, lng: number): void {
//     // this.shoplatitude = this.navParams.get('shoplatitude');
//     // this.shoplongitude = this.navParams.get('shoplongitude');
// this.shoplatitude = 100;
// this.shoplongitude = 100;
    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    this.markers.push(marker);

  }

}
