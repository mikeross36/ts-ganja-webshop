import { GanjaType } from "../../types/GanjaTypes";

export enum GanjaActionTypes {
  GET_ALL_GANJAS_REQUEST = "get_all_ganjas_request",
  GET_ALL_GANJAS_SUCCESS = "get_all_ganjas_success",
  GET_ALL_GANJAS_FAILED = "get_all_ganjas_failed",
  GET_GANJA_REQUEST = "get_ganja_request",
  GET_GANJA_SUCCESS = "get_ganja_success",
  GET_GANJA_FAILED = "get_ganja_failed",
}

interface GetAllGanjasRequest {
  type: GanjaActionTypes.GET_ALL_GANJAS_REQUEST;
}

interface GetAllGanjasSuccess {
  type: GanjaActionTypes.GET_ALL_GANJAS_SUCCESS;
  payload: GanjaType[];
}

interface GetAllGanjasFailed {
  type: GanjaActionTypes.GET_ALL_GANJAS_FAILED;
  payload: string;
}

interface GetGanjaRequest {
  type: GanjaActionTypes.GET_GANJA_REQUEST;
}

interface GetGanjaSuccess {
  type: GanjaActionTypes.GET_GANJA_SUCCESS;
  payload: GanjaType;
}

interface GetGanjaFailed {
  type: GanjaActionTypes.GET_GANJA_FAILED;
  payload: string;
}

export type GanjaActionType =
  | GetAllGanjasRequest
  | GetAllGanjasSuccess
  | GetAllGanjasFailed
  | GetGanjaRequest
  | GetGanjaSuccess
  | GetGanjaFailed;
