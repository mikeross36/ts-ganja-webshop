import { Dispatch } from "redux";
import {
  ShoppingCartActionType,
  ShoppingCartActionTypes,
} from "../actions/shopping-cart";
import { CartItemType, ShippingAddressType } from "../../types/CartTypes";
import { GanjaType } from "../../types/GanjaTypes";

export const addItemToCartAction =
  (ganja: GanjaType, quantity: number) =>
  (dispatch: Dispatch<ShoppingCartActionType>) => {
    const cartItem: CartItemType = {
      _id: ganja._id,
      name: ganja.name,
      image: ganja.coverImage,
      category: ganja.category,
      price: ganja.price,
      quantity: Number(quantity),
    };
    dispatch({
      type: ShoppingCartActionTypes.ADD_ITEM_TO_CART,
      payload: cartItem,
    });
  };

export const removeItemFromCartAction =
  (ganja: GanjaType) => (dispatch: Dispatch<ShoppingCartActionType>) => {
    dispatch({
      type: ShoppingCartActionTypes.REMOVE_ITEM_FROM_CART,
      payload: ganja,
    });
  };

export const increaseQuantityAction =
  (ganja: GanjaType) => (dispatch: Dispatch<ShoppingCartActionType>) => {
    dispatch({
      type: ShoppingCartActionTypes.INCREASE_QUANTITY,
      payload: ganja,
    });
  };

export const decreaseQuantityAction =
  (ganja: GanjaType) => (dispatch: Dispatch<ShoppingCartActionType>) => {
    dispatch({
      type: ShoppingCartActionTypes.DECREASE_QUANTITY,
      payload: ganja,
    });
  };

export const getTotalsAction =
  () => (dispatch: Dispatch<ShoppingCartActionType>) => {
    dispatch({ type: ShoppingCartActionTypes.GET_TOTALS });
  };

export const clearShoppingCartAction =
  () => (dispatch: Dispatch<ShoppingCartActionType>) => {
    dispatch({ type: ShoppingCartActionTypes.CLEAR_SHOPPING_CART });
  };

export const saveShippingAddressAction =
  (data: ShippingAddressType) =>
  (dispatch: Dispatch<ShoppingCartActionType>) => {
    dispatch({
      type: ShoppingCartActionTypes.SAVE_SHIPPING_ADDRESS,
      payload: data,
    });
  };

export const clearShippingAddressAction =
  () => (dispatch: Dispatch<ShoppingCartActionType>) => {
    dispatch({ type: ShoppingCartActionTypes.CLEAR_SHIPPING_ADDRESS });
  };

export const savePaymentMethodAction =
  (data: string) => (dispatch: Dispatch<ShoppingCartActionType>) => {
    dispatch({
      type: ShoppingCartActionTypes.SAVE_PAYMENT_METHOD,
      payload: data,
    });
  };
