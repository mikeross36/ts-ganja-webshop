import Loader from "../components/Loader";
import Message from "../components/Message";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { CartItemType } from "../types/CartTypes";
import { formatCurrency, formatDate } from "../hooks/useFormater";
import { useEffect } from "react";
import {
  usePayPalScriptReducer,
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import Button from "../components/Button";
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from "../hooks/useOrderQueries";
import { useAppSelector } from "../hooks/useAppSelector";
import { RootState } from "../state";
import { UserInfoType } from "../types/UserTypes";

const apiUrl = import.meta.env.VITE_API_URL;

const Order = () => {
  const params = useParams();
  const { id: orderId } = params;
  // console.log(orderId);

  const { userInfo } = useAppSelector(
    (state: RootState) => state.loginUser
  ) as UserInfoType;

  const {
    isLoading,
    error,
    data: order,
    refetch,
  } = useGetOrderDetailsQuery(orderId!);

  const { mutateAsync: deliverOrder } = useDeliverOrderMutation();

  const handleOrderDelivery = async () => {
    try {
      await deliverOrder(orderId!);
      refetch();
      toast.success("Order is delivered");
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  const { mutateAsync: payOrderAction } = usePayOrderMutation();

  const handleTestPayment = async () => {
    await payOrderAction({ orderId: orderId! });
    refetch();
    toast.success("Order is paid!");
  };

  const { data: paypalConfig } = useGetPaypalClientIdQuery();

  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (paypalConfig && paypalConfig.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypalConfig!.clientId,
            currency: "EUR",
          } as unknown as ReactPayPalScriptOptions,
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      loadPaypalScript();
    }
  }, [paypalConfig, paypalDispatch]);

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    async createOrder(_data, actions) {
      const orderID = await actions.order.create({
        purchase_units: [{ amount: { value: order!.totalPrice.toString() } }],
      });
      return orderID;
    },
    async onApprove(_data, actions) {
      const details = await actions.order!.capture();
      try {
        await payOrderAction({ orderId: orderId!, ...details });
        refetch();
        toast.success("Order is paid successfully!");
      } catch (err) {
        toast.error(getError(err as ApiError));
      }
    },
    onError: (err) => {
      toast.error(getError(err as ApiError));
    },
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message>{getError(error as unknown as ApiError)}</Message>
  ) : !order ? (
    <Message>Oder not found!</Message>
  ) : (
    <>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <section className="order section container">
        <h2 className="section__title">
          Order{" "}
          <p style={{ fontSize: "1rem", paddingTop: "1rem" }}>{orderId}</p>
        </h2>
        <div className="order__wrapper">
          <div className="shipping__data">
            <div className="shipping__data-card">
              <h4 className="card__title">shipping</h4>
              <article className="card__data">
                <p>name: {order.shippingAddress.fullName}</p>
                <p>address: {order.shippingAddress.address},</p>
                <p>postal code: {order.shippingAddress.postalCode}</p>
                <p>city: {order.shippingAddress.city}</p>
                <p>country: {order.shippingAddress.country}</p>
              </article>
              {order.isDelivered ? (
                <Message>Delivered at: {order.deliveredAt}</Message>
              ) : (
                <Message>Not delivered!</Message>
              )}
            </div>
            <div className="shipping__data-card">
              <h4 className="card__title">payment</h4>
              <div className="card__data">
                <p>method: {order.paymentMethod}</p>
              </div>
              {order.isPaid ? (
                <Message>
                  Paid at: {formatDate(order.paidAt as unknown as Date)}
                </Message>
              ) : (
                <Message>Not Paid!</Message>
              )}
            </div>
            <div className="shipping__data-card">
              <h4 className="card__title">Items</h4>
              <ul className="shipping__items">
                {order.orderItems.map((item: CartItemType) => {
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
            </div>
          </div>
          <div className="summary__data">
            <div className="summary__data-card">
              <h4 className="card__title">order summary</h4>
              <ul className="summary__items">
                <li className="summary__item">
                  <p>items</p>
                  <span>{formatCurrency(+order.itemsPrice.toFixed(2))}</span>
                </li>
                <li className="summary__item">
                  <p>shipping</p>
                  <span>{formatCurrency(+order.shippingPrice.toFixed(2))}</span>
                </li>
                <li className="summary__item">
                  <p>tax</p>
                  <span>{formatCurrency(+order.taxPrice.toFixed(2))}</span>
                </li>
                <li className="summary__item">
                  <p>total</p>
                  <span>{formatCurrency(+order.totalPrice.toFixed(2))}</span>
                </li>
                {!order.isPaid && (
                  <li className="summary__item">
                    {isPending ? (
                      <Loader />
                    ) : isRejected ? (
                      <Message>Error connecting PayPal</Message>
                    ) : (
                      <div>
                        <PayPalButtons {...paypalbuttonTransactionProps} />
                        <Button
                          onClick={handleTestPayment}
                          type="button"
                          className="button button--mid"
                        >
                          Pay
                        </Button>
                      </div>
                    )}
                  </li>
                )}
                {userInfo.user && order.isPaid && !order.isDelivered && (
                  <li className="summary__item">
                    <div>
                      <Button
                        onClick={handleOrderDelivery}
                        type="button"
                        className="button button--mid"
                      >
                        deliver order
                      </Button>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;
