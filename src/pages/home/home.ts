import { Component } from '@angular/core';
import { MapPage } from '../map/map';
import { ListPage } from '../list/list';
import { MallPage } from '../mall/mall';
import { ShopsPage } from '../shops/shops';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any = MapPage;
  tab2Root: any = ListPage;
  tab3Root: any = MallPage;
  tab4Root: any = ShopsPage;

  constructor(){

  }

}
