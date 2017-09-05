export interface Ishop{
  ShopId: number;
  ShoppingCenterid: number;
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
