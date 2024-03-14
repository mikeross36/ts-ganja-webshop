import { CartItemType, ShippingAddressType } from "../../types/CartTypes";
import { GanjaType } from "../../types/GanjaTypes";

export enum ShoppingCartActionTypes {
  ADD_ITEM_TO_CART = "add_item_to_cart",
  REMOVE_ITEM_FROM_CART = "remove_item_from_cart",
  INCREASE_QUANTITY = "increase_quantity",
  DECREASE_QUANTITY = "descrease_quantity",
  GET_TOTALS = "get_totals",
  CLEAR_SHOPPING_CART = "clear_shopping_cart",
  SAVE_SHIPPING_ADDRESS = "save_shipping_address",
  CLEAR_SHIPPING_ADDRESS = "clear_shipping_address",
  SAVE_PAYMENT_METHOD = "save_payment-method",
}

interface AddItemToCart {
  type: ShoppingCartActionTypes.ADD_ITEM_TO_CART;
  payload: CartItemType;
}

interface RemoveItemFromCart {
  type: ShoppingCartActionTypes.REMOVE_ITEM_FROM_CART;
  payload: GanjaType;
}

interface IncreaseQuantity {
  type: ShoppingCartActionTypes.INCREASE_QUANTITY;
  payload: GanjaType;
}

interface DecreaseQuantity {
  type: ShoppingCartActionTypes.DECREASE_QUANTITY;
  payload: GanjaType;
}

interface GetTotals {
  type: ShoppingCartActionTypes.GET_TOTALS;
}

interface ClearShoppingCart {
  type: ShoppingCartActionTypes.CLEAR_SHOPPING_CART;
}

interface SaveShippingAddress {
  type: ShoppingCartActionTypes.SAVE_SHIPPING_ADDRESS;
  payload: ShippingAddressType;
}

interface ClearShippingAddress {
  type: ShoppingCartActionTypes.CLEAR_SHIPPING_ADDRESS;
}
interface SavePAymentMethod {
  type: ShoppingCartActionTypes.SAVE_PAYMENT_METHOD;
  payload: string;
}
export type ShoppingCartActionType =
  | AddItemToCart
  | RemoveItemFromCart
  | IncreaseQuantity
  | DecreaseQuantity
  | GetTotals
  | ClearShoppingCart
  | SaveShippingAddress
  | ClearShippingAddress
  | SavePAymentMethod;
