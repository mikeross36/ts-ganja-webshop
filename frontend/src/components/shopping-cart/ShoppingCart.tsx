import { FaWindowClose } from "react-icons/fa";
import CartItem from "./CartItem";
import { useAppContext } from "../../contexts/AppContextProvider";
import Button from "../Button";
import { RootState } from "../../state";
import { UserInfoType } from "../../types/UserTypes";
import { ShoppingCartStateType } from "../../state/reducers/shoppingCartReducers";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  getTotalsAction,
  clearShoppingCartAction,
} from "../../state/action-creators/shoppingCartActions";
import { ShoppingCartActionType } from "../../state/actions/shopping-cart";
import { formatCurrency } from "../../hooks/useFormater";
import { useShoppingCartDispatch } from "../../hooks/useShoppingCartDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

const ShoppingCart = (): JSX.Element => {
  const { isCartOpen, setIsCartOpen, setShowModalLogin } = useAppContext();
  const { cartItems, cartTotal } = useAppSelector(
    (state: RootState) => state.shoppingCart as ShoppingCartStateType
  );
  const { userInfo } = useAppSelector(
    (state: RootState) => state.loginUser as UserInfoType
  );
  // console.log(userInfo);

  const dispatch = useShoppingCartDispatch();

  useEffect(() => {
    dispatch(getTotalsAction() as unknown as ShoppingCartActionType);
  }, [cartItems, dispatch]);

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/shipping");
    setIsCartOpen(false);
  };

  const handleClearShoppingCart = () => {
    if (window.confirm("Are you sure you want to clear shopping cart?")) {
      dispatch(clearShoppingCartAction() as unknown as ShoppingCartActionType);
    }
  };

  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <section className="shopping__cart">
        <div
          className={`sidebar__overlay ${isCartOpen ? "expand" : "shrink"} `}
        >
          <button className="close__cart" onClick={() => setIsCartOpen(false)}>
            <FaWindowClose size={35} color="#000000" />
          </button>
          {cartItems.length === 0 ? (
            <aside className="sidebar-empty">
              <h1 className="sidebar__title">cart is empty</h1>
            </aside>
          ) : (
            <aside className="sidebar">
              <h3 className="sidebar__title">your cart</h3>
              <ul>
                {cartItems.map((item) => {
                  return <CartItem key={item._id} item={item} />;
                })}
              </ul>
              <footer className="sidebar__footer">
                {cartItems.length !== 0 && (
                  <>
                    <div className="cart__total">
                      {!userInfo ? (
                        <Button
                          onClick={() => {
                            setShowModalLogin(true);
                            setIsCartOpen(false);
                          }}
                          type="button"
                          className="button button--XSmall"
                          disabled={cartItems.length === 0}
                        >
                          login to purchase
                        </Button>
                      ) : (
                        <Button
                          onClick={handleCheckout}
                          type="button"
                          className="button button--XSmall"
                          disabled={cartItems.length === 0}
                        >
                          Checkout
                        </Button>
                      )}
                      <h4>Total: {formatCurrency(cartTotal)}</h4>
                    </div>
                    <span onClick={handleClearShoppingCart}>
                      <Button
                        type="button"
                        className="button button--XSmall button--clear"
                      >
                        clear cart
                      </Button>
                    </span>
                  </>
                )}
              </footer>
            </aside>
          )}
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
