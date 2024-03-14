import { Helmet } from "react-helmet-async";
import Checkout from "../components/Checkout";
import { useAppSelector } from "../hooks/useAppSelector";
import { RootState, ShoppingCartStateType } from "../state";
import { Link, useNavigate } from "react-router-dom";
import { CartItemType } from "../types/CartTypes";
import { formatCurrency } from "../hooks/useFormater";
import { useAppContext } from "../contexts/AppContextProvider";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useCreateOrderMutation } from "../hooks/useOrderQueries";
import { clearShoppingCartAction } from "../state/action-creators/shoppingCartActions";
import { useShoppingCartDispatch } from "../hooks/useShoppingCartDispatch";
import { ShoppingCartActionType } from "../state/actions/shopping-cart";

const apiUrl = import.meta.env.VITE_API_URL;

const PlaceOrder = () => {
  const {
    shippingAddress,
    paymentMethod,
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useAppSelector(
    (state: RootState) => state.shoppingCart as ShoppingCartStateType
  );

  const { setIsCartOpen } = useAppContext();
  const dispatch = useShoppingCartDispatch();
  const navigate = useNavigate();

  const { mutateAsync: createOrderAction, isPending } =
    useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    try {
      const data = await createOrderAction({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: +itemsPrice.toFixed(2),
        shippingPrice: +shippingPrice.toFixed(2),
        taxPrice: +taxPrice.toFixed(2),
        totalPrice: +totalPrice.toFixed(2),
      });
      dispatch(clearShoppingCartAction() as unknown as ShoppingCartActionType);
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    if (!paymentMethod) navigate("/payment");
  }, [paymentMethod, navigate]);

  return (
    <>
      <Checkout step1 step2 step3 step4 />
      <Helmet>
        <title>Order Preview</title>
      </Helmet>
      <section className="place__order section container">
        <h2 className="section__title">order preview</h2>
        <div className="place__order-wrapper">
          <div className="shipping__data">
            <div className="shipping__data-card">
              <h4 className="card__title">shipping</h4>
              <article className="card__data">
                <p>name: {shippingAddress.fullName}</p>
                <p>address: {shippingAddress.address},</p>
                <p> postal code: {shippingAddress.postalCode}</p>
                <p>city: {shippingAddress.city}</p>
                <p>country: {shippingAddress.country}</p>
              </article>
              <Link to="/shipping">edit</Link>
            </div>

            <div className="shipping__data-card">
              <h4 className="card__title">payment</h4>
              <article className="card__data">
                <p>method: {paymentMethod}</p>
              </article>
              <Link to="/payment">edit</Link>
            </div>

            <div className="shipping__data-card">
              <h4 className="card__title">shipping items</h4>
              <ul className="shipping__items">
                {cartItems.map((item: CartItemType) => {
                  return (
                    <li key={item._id} className="shipping__item">
                      <p>{item.name}</p>
                      <img
                        src={`${apiUrl}/images/ganjas/${item.image}`}
                        alt="shipping item pic"
                      />

                      <span>quantity: {item.quantity}</span>
                      <span>price: {formatCurrency(item.price)}</span>
                      <span>
                        subtotal: {formatCurrency(item.price * item.quantity)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <Link to="" onClick={() => setIsCartOpen(true)}>
                edit
              </Link>
            </div>
          </div>
          <div className="summary__data">
            <div className="summary__data-card">
              <h4 className="card__title">order summary</h4>
              <ul className="summary__items">
                <li className="summary__item">
                  <p>items</p>
                  <span>{formatCurrency(itemsPrice)}</span>
                </li>
                <li className="summary__item">
                  <p>shipping</p>
                  <span>{formatCurrency(shippingPrice)}</span>
                </li>
                <li className="summary__item">
                  <p>tax</p>
                  <span>{formatCurrency(taxPrice)}</span>
                </li>
                <li className="summary__item">
                  <p>total</p>
                  <span>{formatCurrency(totalPrice)}</span>
                </li>
                <Button
                  onClick={handlePlaceOrder}
                  type="button"
                  className="button button--mid"
                  disabled={cartItems.length === 0 || isPending}
                >
                  place oder
                </Button>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlaceOrder;
