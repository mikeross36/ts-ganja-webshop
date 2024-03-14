import { Dispatch } from "redux";
import { OrderActionType, OrderActionTypes } from "../actions/order";
import { RootState } from "../store";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";
import { UserInfoType } from "../../types/UserTypes";
import { OrderType } from "../../types/OrderType";

export const createOrderAction =
  (order: OrderType) => async (dispatch: Dispatch<OrderActionType>) => {
    dispatch({ type: OrderActionTypes.CREATE_ORDER_REQUEST });
    try {
      const { data } = await apiClient.post("api/v1/orders", { order });
      dispatch({ type: OrderActionTypes.CREATE_ORDER_SUCCESS, payload: data });
      if (data.status === "success") {
        toast.success("Order created successfully!");
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: OrderActionTypes.CREATE_ORDER_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };

export const getOrderAction =
  (id: string) => async (dispatch: Dispatch<OrderActionType>) => {
    dispatch({ type: OrderActionTypes.GET_ORDER_REQUEST });
    try {
      const { data } = await apiClient.get(`/api/v1/orders/${id}`);
      dispatch({ type: OrderActionTypes.GET_ORDER_SUCCESS, payload: data });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: OrderActionTypes.GET_ORDER_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };

export const getPaypalClientAction =
  () => async (dispatch: Dispatch<OrderActionType>) => {
    dispatch({ type: OrderActionTypes.GET_PAYPAL_CLIENT_REQUEST });
    try {
      const { data } = await apiClient.get("/api/v1/keys/paypal");
      if (data) {
        dispatch({
          type: OrderActionTypes.GET_PAYPAL_CLIENT_SUCCESS,
          payload: data,
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: OrderActionTypes.GET_PAYPAL_CLIENT_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };

export const payOrderAction =
  (details: { orderId: string }) =>
  async (dispatch: Dispatch<OrderActionType>) => {
    dispatch({ type: OrderActionTypes.PAY_ORDER_REQUEST });
    try {
      const { data } = await apiClient.put(
        `/api/v1/orders/${details.orderId}/pay-order`,
        { details }
      );
      dispatch({ type: OrderActionTypes.PAY_ORDER_SUCCESS, payload: data });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: OrderActionTypes.PAY_ORDER_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };

export const getUserOrdersAction =
  () =>
  async (dispatch: Dispatch<OrderActionType>, getState: () => RootState) => {
    dispatch({ type: OrderActionTypes.GET_USER_ORDERS_REQUEST });
    const { userInfo } = getState().loginUser as UserInfoType;
    try {
      const { data } = await apiClient.post("/api/v1/orders/user-orders", {
        userId: userInfo._id,
      });
      dispatch({
        type: OrderActionTypes.GET_USER_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: OrderActionTypes.GET_USER_ORDERS_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };
