import { Ishop } from '../interfaces/shop';

export class Shop implements Ishop {
  constructor(public ShopId, public ShoppingCenterId, public ShopName, public locationLongitude, public LocationLatitude, public shopPicture, public discount){
  }
}
