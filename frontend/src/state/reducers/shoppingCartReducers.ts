import { CartItemType, ShippingAddressType } from "../../types/CartTypes";
import { ShoppingCartActionTypes } from "../actions/shopping-cart";
import { PayloadAction } from "@reduxjs/toolkit";

export type ShoppingCartStateType = {
  cartItems: CartItemType[];
  cartTotal: number;
  itemsTotal: number;
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

const initialState = {
  cartItems: [],
  cartTotal: 0,
  itemsTotal: 0,
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

export const shoppingCartReducer = (
  state = initialState as unknown as ShoppingCartStateType,
  action: PayloadAction<CartItemType> // action is not ShoppingCartActionType couse we use it to get payload
) => {
  switch (action.type) {
    case ShoppingCartActionTypes.ADD_ITEM_TO_CART: {
      const cartItemsCopy: CartItemType[] = [...state.cartItems];
      const currItemIdx = cartItemsCopy.findIndex(
        (item) => item._id === action.payload._id
      );
      if (currItemIdx < 0) {
        cartItemsCopy.push({ ...action.payload });
      } else {
        const currItemCopy = cartItemsCopy[currItemIdx];
        currItemCopy.quantity++;
        cartItemsCopy[currItemIdx] = currItemCopy;
      }
      return { ...state, cartItems: cartItemsCopy };
    }
    case ShoppingCartActionTypes.REMOVE_ITEM_FROM_CART: {
      let cartItemsCopyDel: CartItemType[] = [...state.cartItems];
      cartItemsCopyDel = cartItemsCopyDel.filter(
        (item) => item._id !== action.payload._id
      );
      return { ...state, cartItems: cartItemsCopyDel };
    }
    case ShoppingCartActionTypes.INCREASE_QUANTITY: {
      let cartItemsCopyInc: CartItemType[] = [...state.cartItems];
      const incItemQuant: CartItemType[] = cartItemsCopyInc.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      cartItemsCopyInc = incItemQuant;
      return { ...state, cartItems: cartItemsCopyInc };
    }
    case ShoppingCartActionTypes.DECREASE_QUANTITY: {
      let cartItemsCopyDec: CartItemType[] = [...state.cartItems];
      const decItemQuant: CartItemType[] = cartItemsCopyDec
        .map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity !== 0);
      cartItemsCopyDec = decItemQuant;
      return { ...state, cartItems: cartItemsCopyDec };
    }
    case ShoppingCartActionTypes.GET_TOTALS: {
      let {
        cartTotal,
        itemsTotal,
        shippingPrice,
        taxPrice,
        totalPrice,
        itemsPrice,
      } = state.cartItems.reduce(
        (acc, item) => {
          const cartItemTotal = item.price * item.quantity;
          acc.cartTotal += cartItemTotal;
          acc.itemsTotal += item.quantity;
          return acc;
        },
        {
          cartTotal: 0,
          itemsTotal: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
          itemsPrice: 0,
        }
      );
      cartTotal = Number(cartTotal);
      itemsTotal = Number(itemsTotal);
      shippingPrice = cartTotal * 0.1;
      taxPrice = shippingPrice * 0.15;
      totalPrice = cartTotal + shippingPrice + taxPrice;
      itemsPrice = cartTotal;
      return {
        ...state,
        cartTotal,
        itemsTotal,
        shippingPrice,
        taxPrice,
        totalPrice,
        itemsPrice,
      };
    }
    case ShoppingCartActionTypes.CLEAR_SHOPPING_CART: {
      return { ...state, cartItems: [] };
    }
    case ShoppingCartActionTypes.SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    }
    case ShoppingCartActionTypes.CLEAR_SHIPPING_ADDRESS: {
      return { ...state, shippingAddress: {} };
    }
    case ShoppingCartActionTypes.SAVE_PAYMENT_METHOD: {
      return { ...state, paymentMethod: action.payload };
    }
    default:
      return state;
  }
};
