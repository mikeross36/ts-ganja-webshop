import { CartItemType } from "../../types/CartTypes";
import { formatCurrency } from "../../hooks/useFormater";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import {
  removeItemFromCartAction,
  increaseQuantityAction,
  decreaseQuantityAction,
} from "../../state/action-creators/shoppingCartActions";
import { ShoppingCartActionType } from "../../state/actions/shopping-cart";
import { GanjaType } from "../../types/GanjaTypes";
import { useShoppingCartDispatch } from "../../hooks/useShoppingCartDispatch";

const apiUrl = import.meta.env.VITE_API_URL;

const CartItem = ({ item }: { item: CartItemType }): JSX.Element => {
  const { name, image, category, price, quantity } = item;

  const dispatch = useShoppingCartDispatch();

  const subtotal = price * quantity;

  return (
    <li className="cart__item">
      <img src={`${apiUrl}/images/ganjas/${image}`} alt="cart item pic" />
      <p className="cart__item-name">{name}</p>
      <p className="cart__item-name">{category}</p>
      <p>{formatCurrency(price)}</p>
      <div className="cart__item-quantity-btns">
        <button
          className="quantity__button"
          onClick={() =>
            dispatch(
              decreaseQuantityAction(
                item as unknown as GanjaType
              ) as unknown as ShoppingCartActionType
            )
          }
        >
          <FaMinusCircle size={20} />
        </button>
        <span className="cart__item-quantity">{item.quantity}</span>
        <button
          className="quantity__button"
          onClick={() =>
            dispatch(
              increaseQuantityAction(
                item as unknown as GanjaType
              ) as unknown as ShoppingCartActionType
            )
          }
        >
          <FaPlusCircle size={20} />
        </button>
      </div>
      <p>total: {formatCurrency(subtotal)}</p>
      <button
        onClick={() =>
          dispatch(
            removeItemFromCartAction(
              item as unknown as GanjaType
            ) as unknown as ShoppingCartActionType
          )
        }
        className="cart__item-remove"
      >
        ❌
      </button>
    </li>
  );
};

export default CartItem;
