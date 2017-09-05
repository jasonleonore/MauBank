import { Idiscount } from '../interfaces/discount';

export class Discount implements Idiscount {
constructor(public DiscountID,public DiscountHeading,public DiscountText,public DiscountPicture){
}
}
