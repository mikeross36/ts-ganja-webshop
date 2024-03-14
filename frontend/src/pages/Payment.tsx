import { useState, useEffect } from "react";
import Checkout from "../components/Checkout";
import { Helmet } from "react-helmet-async";
import cannabisLogo from "../assets/cannabis-logo-2.svg";
import { useAppSelector } from "../hooks/useAppSelector";
import { ShoppingCartStateType } from "../state/reducers/shoppingCartReducers";
import { useNavigate } from "react-router-dom";
import { savePaymentMethodAction } from "../state/action-creators/shoppingCartActions";
import { useShoppingCartDispatch } from "../hooks/useShoppingCartDispatch";
import { ShoppingCartActionType } from "../state/actions/shopping-cart";
import Button from "../components/Button";

const Payment = () => {
  const { shippingAddress, paymentMethod } = useAppSelector(
    (state) => state.shoppingCart as ShoppingCartStateType
  );
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "Paypal"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) navigate("/shipping");
  }, [shippingAddress, navigate]);

  const dispatch = useShoppingCartDispatch();

  const submitPaymentForm = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      savePaymentMethodAction(
        paymentMethodName
      ) as unknown as ShoppingCartActionType
    );
    navigate("/place-order");
  };

  return (
    <>
      <Checkout step1 step2 step3 />
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <section className="payment section container">
        <h2 className="section__title">payment</h2>
        <div className="payment__form-bcg">
          <div className="payment__title">
            <img src={cannabisLogo} alt="cannabis logo pic" width={32} />
            <h3>payment method</h3>
          </div>
          <form className="payment__form" onSubmit={submitPaymentForm}>
            <div className="form__control">
              <label htmlFor="PayPal">PayPal</label>
              <input
                type="radio"
                id="PayPal"
                className="form__input"
                value={paymentMethodName || "PayPal"}
                onChange={(e) => setPaymentMethodName(e.target.value)}
              />
            </div>
            <div className="form__control">
              <label htmlFor="Stripe">Stripe</label>
              <input
                type="radio"
                id="Stripe"
                className="form__input"
                value={paymentMethodName || "Stripe"}
                onChange={(e) => setPaymentMethodName(e.target.value)}
              />
            </div>
            <Button type="submit" className="button button--mid">
              continue
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Payment;
