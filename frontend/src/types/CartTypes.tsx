export type CartItemType = {
  _id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
};

export type ShippingAddressType = {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export type CartType = {
  cartItems: CartItemType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
