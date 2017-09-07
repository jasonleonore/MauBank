import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { ListPage } from '../pages/list/list';
import { Locations } from '../providers/locations';
import { GoogleMaps } from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';
import { shopservice } from '../providers/shopservice';
import { MallPage } from '../pages/mall/mall';
import { BagatellePage } from '../pages/mall/bagatelle/bagatelle';
import { DiscountPage } from '../pages/mall/bagatelle/discount/discount';
import { CityPage } from '../pages/mall/bagatelle/city/city';
import { ShafiqPage } from '../pages/mall/bagatelle/shafiq/shafiq';
import { BataPage } from '../pages/mall/bagatelle/bata/bata';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    MallPage,
    BagatellePage,
    DiscountPage,
    CityPage,
    ShafiqPage,
    BataPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    MallPage,
    BagatellePage,
    DiscountPage,
    CityPage,
    ShafiqPage,
    BataPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Locations, GoogleMaps, Connectivity, shopservice]
})
export class AppModule {}
