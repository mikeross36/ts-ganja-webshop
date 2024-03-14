import { GanjaActionType, GanjaActionTypes } from "../actions/ganja";
import { GanjaType } from "../../types/GanjaTypes";

type StateType = {
  loading: boolean;
  error: string | null;
  ganjas?: GanjaType[];
  ganja?: GanjaType;
};

const initialState = {
  loading: false,
  error: null,
  ganjas: [],
  ganja: undefined,
};

export const getAllGanjasReducer = (
  state: StateType = initialState,
  action: GanjaActionType
): StateType => {
  switch (action.type) {
    case GanjaActionTypes.GET_ALL_GANJAS_REQUEST: {
      return { loading: true, error: null };
    }
    case GanjaActionTypes.GET_ALL_GANJAS_SUCCESS: {
      return { loading: false, error: null, ganjas: action.payload };
    }
    case GanjaActionTypes.GET_ALL_GANJAS_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const getGanjaReducer = (
  state: StateType = initialState,
  action: GanjaActionType
): StateType => {
  switch (action.type) {
    case GanjaActionTypes.GET_GANJA_REQUEST: {
      return { loading: true, error: null };
    }
    case GanjaActionTypes.GET_GANJA_SUCCESS: {
      return { loading: false, error: null, ganja: action.payload };
    }
    case GanjaActionTypes.GET_GANJA_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
