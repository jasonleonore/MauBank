import { IMall } from '../interfaces/mall';

export class Mall implements IMall {
  constructor(public ShoppingCenterId, public ShoppingCenterName, public ShoppingCenterPicture){
    
  }
}
