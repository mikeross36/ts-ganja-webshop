import { CartItemType } from "../types/CartTypes";
import { GanjaType } from "../types/GanjaTypes";

export const convertProductToCartItem = (ganja: GanjaType) => {
  const cartItem: CartItemType = {
    _id: ganja._id,
    name: ganja.name,
    thc: ganja.thc,
    image: ganja.coverImage,
    price: ganja.price,
    quantity: 1,
    coverImage: ganja.coverImage,
  };
  return cartItem;
};
