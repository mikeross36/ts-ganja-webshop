import { CartItemType, ShippingAddressType } from "./CartTypes";
import { UserType } from "./UserTypes";

export type OrderType = {
  _id: string;
  orderItems: CartItemType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  user: UserType;
  createdAt: string;
  paidAt: string;
  isPaid: boolean;
  isDelivered: boolean;
  deliveredAt: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
