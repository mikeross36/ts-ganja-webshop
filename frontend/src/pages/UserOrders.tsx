import { Helmet } from "react-helmet-async";
import cannabisLogo from "../assets/cannabis-logo-2.svg";
import { useGetUserOrdersQuery } from "../hooks/useOrderQueries";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import { formatCurrency, formatDate } from "../hooks/useFormater";
import Button from "../components/Button";

const UserOrders = () => {
  const { data: orders, isPending, error } = useGetUserOrdersQuery();
  const navigate = useNavigate();

  return (
    <section className="orders section container">
      <Helmet>
        <title>Users Orders</title>
      </Helmet>
      {!orders ? (
        <h2 className="section__title">No Orders</h2>
      ) : (
        <>
          <h2 className="section__title">Users Orders</h2>
          {isPending ? (
            <Loader />
          ) : error ? (
            <Message>{getError(error as unknown as ApiError)}</Message>
          ) : (
            <ul className="orders__list">
              {orders?.map((order) => {
                return (
                  <li key={order._id} className="order__item">
                    <img src={cannabisLogo} alt="cannabis logo" width="32" />
                    <p>order id: {order._id}</p>
                    <p>
                      created: {formatDate(order?.createdAt as unknown as Date)}
                    </p>
                    <p>total price: {formatCurrency(order.totalPrice)}</p>
                    <p>
                      order paid:{" "}
                      {order.isPaid && order.paidAt
                        ? order.paidAt.substring(0, 10)
                        : "NO"}
                    </p>
                    <p>
                      order deliverd:{" "}
                      {order.isDelivered
                        ? order.deliveredAt?.substring(0, 10)
                        : "NO"}
                    </p>
                    <Button
                      onClick={() => navigate(`/order/${order._id}`)}
                      type="button"
                      className="button button--XSmall"
                    >
                      details
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </section>
  );
};

export default UserOrders;
