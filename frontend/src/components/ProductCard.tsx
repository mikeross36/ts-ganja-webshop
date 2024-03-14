import { useState } from "react";
import { GanjaType } from "../types/GanjaTypes";
import RatingStars from "./stars/RatingStars";
import Button from "./Button";
import { Link } from "react-router-dom";
import { formatCurrency } from "../hooks/useFormater";
import { useAppContext } from "../contexts/AppContextProvider";
import { RootState } from "../state";
import { addItemToCartAction } from "../state/action-creators/shoppingCartActions";
import { ShoppingCartActionType } from "../state/actions/shopping-cart";
import { useShoppingCartDispatch } from "../hooks/useShoppingCartDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

const apiUrl = import.meta.env.VITE_API_URL;

const ProductCard = ({ ganja }: { ganja: GanjaType }): JSX.Element => {
  const { name, coverImage, rating, category, thc, _id, price } = ganja;
  const [ganjaRating, setGanjaRating] = useState<number | undefined>(rating);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [quantity, _setQuantity] = useState(1);

  const { cartItems } = useAppSelector(
    (state: RootState) => state.shoppingCart
  );

  const inCart: boolean = (cartItems as Array<{ _id: string }>).some(
    (item: { _id: string }) => item._id === ganja._id
  );

  const itemInCart = inCart ? " Item in cart ✔" : null;

  const { setIsCartOpen } = useAppContext();

  const dispatch = useShoppingCartDispatch();

  const handleAddItemToCart = () => {
    dispatch(
      addItemToCartAction(ganja, quantity) as unknown as ShoppingCartActionType
    );
    const timer = setTimeout(() => {
      setIsCartOpen(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <li>
      <div className="product__card">
        <h4>{name}</h4>
        <div className="product__card-image">
          <img
            src={`${apiUrl}/images/ganjas/${coverImage}`}
            alt="single ganja pic"
            className="product__img"
          />
        </div>
        <RatingStars
          maxRating={5}
          color=""
          size={24}
          defaultRating={ganjaRating}
          onSetUserRating={setGanjaRating}
        />
        <p>category: {category}</p>
        <p>thc: {thc}%</p>
        <h5>
          price: <span>{formatCurrency(price)}</span>
          <span className="in-cart">{itemInCart}</span>
        </h5>
        <div className="product__card-buttons">
          <Link to={`/product/${_id}`}>
            <Button type="button" className="button button--mid">
              details
            </Button>
          </Link>
          <Button
            onClick={() => handleAddItemToCart()}
            type="button"
            className="button button--mid"
          >
            add to cart
          </Button>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
