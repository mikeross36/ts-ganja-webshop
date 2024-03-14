import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getError } from "../../utils/getError";
import { ApiError } from "../../types/ApiError";
import { useState } from "react";
import thcSymbol from "../../assets/thc-symbol.jpg";
import { formatDate } from "../../hooks/useFormater";
import RatingStars from "../../components/stars/RatingStars";
import Button from "../../components/Button";
import { RootState } from "../../state";
import { GanjaType } from "../../types/GanjaTypes";
import { useAppContext } from "../../contexts/AppContextProvider";
import { ShoppingCartActionType } from "../../state/actions/shopping-cart";
import { addItemToCartAction } from "../../state/action-creators/shoppingCartActions";
import { UserInfoType } from "../../types/UserTypes";
import AddReview from "../../components/AddReview";
import { Reviews } from "../../components/Reviews";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useShoppingCartDispatch } from "../../hooks/useShoppingCartDispatch";

const apiUrl = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { ganjaId } = useParams();
  const { ganjas, loading, error } = useAppSelector(
    (state: RootState) => state.getAllGanjas
  );
  const ganja = ganjas?.find((ganja: GanjaType) => ganja._id === ganjaId);
  // console.log(ganja);
  const {
    _id,
    name,
    coverImage,
    category,
    dataTested,
    thca,
    thc,
    cbda,
    cbd,
    summary,
  } = ganja!;

  const rating = ganja ? ganja.rating : undefined;
  const [ganjaRating, setGanjaRating] = useState<number | undefined>(rating);
  const [quantity] = useState(1);

  const { userInfo } = useAppSelector(
    (state: RootState) => state.loginUser as UserInfoType
  );
  // console.log(userInfo);
  const { setShowModalLogin, setIsCartOpen } = useAppContext();
  const dispatch = useShoppingCartDispatch();
  const navigate = useNavigate();

  const handleAddItemToCart = () => {
    dispatch(
      addItemToCartAction(
        ganja as GanjaType,
        quantity
      ) as unknown as ShoppingCartActionType
    );
    const timer = setTimeout(() => {
      setIsCartOpen(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      {loading && <Loader />}
      {error && <Message>{getError(error as unknown as ApiError)}</Message>}
      {!loading && !error && (
        <section className="product section container">
          <header className="product__header">
            <h3 className="product__name">{name}</h3>
          </header>
          <button className="product__image" onClick={() => navigate(-1)}>
            <img
              src={`${apiUrl}/images/ganjas/${coverImage}`}
              alt={`image of ${name}`}
            />
          </button>
          <article className="product__details">
            <img src={thcSymbol} alt="thc symbol icon" />
            <p>category: {category}</p>
            <p>tested: dataTested{formatDate(dataTested as Date)}</p>
            <p>thca: {thca}</p>
            <p>thc: {thc}</p>
            <p>cbda: {cbda}</p>
            <p>cbd: {cbd}</p>
            <div className="product__rating">
              <p>rating:</p>
              <RatingStars
                maxRating={5}
                color=""
                size={24}
                defaultRating={ganjaRating}
                onSetUserRating={setGanjaRating}
              />
            </div>
            <p className="product__summary">
              <em>{summary}</em>
            </p>
            <div className="product__details-btns">
              <Button
                onClick={handleAddItemToCart}
                type="button"
                className="button button--mid"
              >
                add to cart
              </Button>
              {!userInfo ? (
                <div className="product__login">
                  <Button
                    type="button"
                    className="button button--mid"
                    onClick={() => setShowModalLogin(true)}
                  >
                    login to add review
                  </Button>
                </div>
              ) : (
                <AddReview id={_id} />
              )}
            </div>
          </article>
          <Reviews id={_id} />
        </section>
      )}
    </>
  );
};

export default ProductDetails;
