import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Checkout from "../components/Checkout";
import cannabisLogo from "../assets/cannabis-logo-2.svg";
import Button from "../components/Button";
import { useAppSelector } from "../hooks/useAppSelector";
import { ShoppingCartStateType } from "../state";
import { useShoppingCartDispatch } from "../hooks/useShoppingCartDispatch";
import { saveShippingAddressAction } from "../state/action-creators/shoppingCartActions";
import { ShoppingCartActionType } from "../state/actions/shopping-cart";

const Shipping = () => {
  const { shippingAddress } = useAppSelector(
    (state) => state.shoppingCart as ShoppingCartStateType
  );
  const [fullName, setFullName] = useState(shippingAddress?.fullName || "");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigate = useNavigate();
  const dispatch = useShoppingCartDispatch();

  const submitShippingForm = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      saveShippingAddressAction({
        fullName,
        address,
        city,
        postalCode,
        country,
      }) as unknown as ShoppingCartActionType
    );
    navigate("/payment");
  };

  return (
    <>
      <Helmet>
        <title>Shipping</title>
      </Helmet>
      <Checkout step1 step2 />
      <section className="shipping section container">
        <h2 className="section__title">shipping</h2>
        <div className="shipping__form-bcg">
          <div className="shipping__title">
            <img src={cannabisLogo} alt="cannabis logo pic" width={32} />
            <h3>shipping address</h3>
          </div>
          <form className="shipping__form" onSubmit={submitShippingForm}>
            <div className="form__control">
              <input
                type="text"
                name="full-name"
                className="form__input"
                placeholder="full name..."
                autoComplete="off"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form__control">
              <input
                type="text"
                name="full-name"
                className="form__input"
                placeholder="address..."
                autoComplete="off"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form__control">
              <input
                type="text"
                name="full-name"
                className="form__input"
                placeholder="city..."
                autoComplete="off"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form__control">
              <input
                type="text"
                name="full-name"
                className="form__input"
                placeholder="postal code..."
                autoComplete="off"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className="form__control">
              <input
                type="text"
                name="full-name"
                className="form__input"
                placeholder="country..."
                autoComplete="off"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
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

export default Shipping;
