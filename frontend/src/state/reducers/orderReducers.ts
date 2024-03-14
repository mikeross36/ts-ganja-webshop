import { OrderType } from "../../types/OrderType";
import { OrderActionType, OrderActionTypes } from "../actions/order";

type StateType = {
  loading: boolean;
  error: string | null;
  success?: boolean;
  order?: OrderType;
  userOrders?: OrderType[];
  clientId?: string;
};

const initialState = {
  loading: false,
  error: null,
  success: false,
  order: undefined,
  userOrders: [],
  clientId: "",
};

export const createOrderReducer = (
  state: StateType = initialState,
  action: OrderActionType
) => {
  switch (action.type) {
    case OrderActionTypes.CREATE_ORDER_REQUEST: {
      return { loading: true, error: null };
    }
    case OrderActionTypes.CREATE_ORDER_SUCCESS: {
      return { loading: false, error: null, order: action.payload };
    }
    case OrderActionTypes.CREATE_ORDER_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const getOrderReducer = (
  state: StateType = initialState,
  action: OrderActionType
) => {
  switch (action.type) {
    case OrderActionTypes.GET_ORDER_REQUEST: {
      return { loading: true, error: null };
    }
    case OrderActionTypes.GET_ORDER_SUCCESS: {
      return { loading: false, error: null, order: action.payload };
    }
    case OrderActionTypes.GET_ORDER_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const getPaypalClientReducer = (
  state: StateType = initialState,
  action: OrderActionType
) => {
  switch (action.type) {
    case OrderActionTypes.GET_PAYPAL_CLIENT_REQUEST: {
      return { loading: true, error: null };
    }
    case OrderActionTypes.GET_PAYPAL_CLIENT_SUCCESS: {
      return { loading: false, error: null, clientId: action.payload };
    }
    case OrderActionTypes.GET_PAYPAL_CLIENT_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const payOrderReducer = (
  state: StateType = initialState,
  action: OrderActionType
) => {
  switch (action.type) {
    case OrderActionTypes.PAY_ORDER_REQUEST: {
      return { loading: true, error: null };
    }
    case OrderActionTypes.PAY_ORDER_SUCCESS: {
      return { loading: false, error: null, success: true };
    }
    case OrderActionTypes.PAY_ORDER_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const getUserOrdersReducer = (
  state: StateType = initialState,
  action: OrderActionType
) => {
  switch (action.type) {
    case OrderActionTypes.GET_USER_ORDERS_REQUEST: {
      return { loading: true, error: null };
    }
    case OrderActionTypes.GET_USER_ORDERS_SUCCESS: {
      return { loading: false, error: null, userOrders: action.payload };
    }
    case OrderActionTypes.GET_USER_ORDERS_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
