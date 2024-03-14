import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";
import { GanjaActionType, GanjaActionTypes } from "../actions/ganja";
import { Dispatch } from "redux";

export const getAllGanjasAction =
  () => async (dispatch: Dispatch<GanjaActionType>) => {
    dispatch({ type: GanjaActionTypes.GET_ALL_GANJAS_REQUEST });
    try {
      const { data } = await apiClient.get("api/v1/ganjas");
      if (data)
        dispatch({
          type: GanjaActionTypes.GET_ALL_GANJAS_SUCCESS,
          payload: data,
        });
      // console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: GanjaActionTypes.GET_ALL_GANJAS_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };

export const getGanjaAction =
  (id: string) => async (dispatch: Dispatch<GanjaActionType>) => {
    dispatch({ type: GanjaActionTypes.GET_GANJA_REQUEST });
    try {
      const { data } = await apiClient.get(`api/v1/ganjas/${id}`);
      if (data)
        dispatch({ type: GanjaActionTypes.GET_GANJA_SUCCESS, payload: data });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: GanjaActionTypes.GET_GANJA_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };
