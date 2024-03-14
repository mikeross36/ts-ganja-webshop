import type { Dispatch } from "redux";
import { ShoppingCartActionType } from "../state/actions/shopping-cart";
import { useDispatch } from "react-redux";

type DispatchFn = () => Dispatch<ShoppingCartActionType>;

export const useShoppingCartDispatch: DispatchFn = useDispatch;
