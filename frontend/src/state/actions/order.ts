import { OrderType } from "../../types/OrderType";

export enum OrderActionTypes {
  CREATE_ORDER_REQUEST = "create_order_request",
  CREATE_ORDER_SUCCESS = "create_order_success",
  CREATE_ORDER_FAILED = "create_order_failed",
  GET_ORDER_REQUEST = "get_order_request",
  GET_ORDER_SUCCESS = "get_order_success",
  GET_ORDER_FAILED = "get_order_failed",
  GET_PAYPAL_CLIENT_REQUEST = "get_paypal_client_request",
  GET_PAYPAL_CLIENT_SUCCESS = "get_paypal_client_success",
  GET_PAYPAL_CLIENT_FAILED = "get_paypal_client_failed",
  PAY_ORDER_REQUEST = "pay_order_request",
  PAY_ORDER_SUCCESS = "pay_order_success",
  PAY_ORDER_FAILED = "pay_order_failed",
  GET_USER_ORDERS_REQUEST = "get_user_orders_request",
  GET_USER_ORDERS_SUCCESS = "get_user_orders_success",
  GET_USER_ORDERS_FAILED = "get_user_orders_failed",
}

interface CreateOrederRequest {
  type: OrderActionTypes.CREATE_ORDER_REQUEST;
}

interface CreateOrderSuccess {
  type: OrderActionTypes.CREATE_ORDER_SUCCESS;
  payload: OrderType;
}

interface CreateOrderFailed {
  type: OrderActionTypes.CREATE_ORDER_FAILED;
  payload: string;
}

interface GetOrderRequest {
  type: OrderActionTypes.GET_ORDER_REQUEST;
}

interface GetOrderSuccess {
  type: OrderActionTypes.GET_ORDER_SUCCESS;
  payload: OrderType;
}

interface GetOrderFailed {
  type: OrderActionTypes.GET_ORDER_FAILED;
  payload: string;
}

interface GetPaypalClientRequest {
  type: OrderActionTypes.GET_PAYPAL_CLIENT_REQUEST;
}

interface GetPaypalClientSuccess {
  type: OrderActionTypes.GET_PAYPAL_CLIENT_SUCCESS;
  payload: string;
}

interface GetPaypalClientFailed {
  type: OrderActionTypes.GET_PAYPAL_CLIENT_FAILED;
  payload: string;
}

interface PayOrderRequest {
  type: OrderActionTypes.PAY_ORDER_REQUEST;
}

interface PayOrderSuccess {
  type: OrderActionTypes.PAY_ORDER_SUCCESS;
  payload: OrderType;
}

interface PayOrderFailed {
  type: OrderActionTypes.PAY_ORDER_FAILED;
  payload: string;
}
interface GetUserOrdersRequest {
  type: OrderActionTypes.GET_USER_ORDERS_REQUEST;
}

interface GetUserOrdersSuccess {
  type: OrderActionTypes.GET_USER_ORDERS_SUCCESS;
  payload: OrderType[];
}

interface GetUserOrdersFailed {
  type: OrderActionTypes.GET_USER_ORDERS_FAILED;
  payload: string;
}

export type OrderActionType =
  | CreateOrederRequest
  | CreateOrderSuccess
  | CreateOrderFailed
  | GetUserOrdersRequest
  | GetUserOrdersSuccess
  | GetUserOrdersFailed
  | PayOrderRequest
  | PayOrderSuccess
  | PayOrderFailed
  | GetOrderRequest
  | GetOrderSuccess
  | GetOrderFailed
  | GetPaypalClientRequest
  | GetPaypalClientSuccess
  | GetPaypalClientFailed;
