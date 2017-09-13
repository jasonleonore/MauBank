export interface Ishop{
  ShopId: number;
  ShoppingCenterId: number;
  ShopName: string;
  locationLongitude: string;
  LocationLatitude: string;
  shopPicture: string;
  discount: [
    {
      partnerShopId: number;
      DiscountID: number;
      DiscountPicture: string;
      DiscountHeading: string;
      DiscountText: string;
    }
  ];

}
