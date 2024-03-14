import { UserType } from "../../types/UserTypes";

export enum UserActionTypes {
  UPDATE_ACCOUNT_REQUEST = "update_account_request",
  UPDATE_ACCOUNT_SUCCESS = "update_account_success",
  UPDATE_ACCOUNT_FAILED = "update_account_failed",
}

interface UpdateAccountRequest {
  type: UserActionTypes.UPDATE_ACCOUNT_REQUEST;
}

interface UpdateAccountSuccess {
  type: UserActionTypes.UPDATE_ACCOUNT_SUCCESS;
  payload: UserType;
}

interface UpdateAccountFailed {
  type: UserActionTypes.UPDATE_ACCOUNT_FAILED;
  payload: string;
}

export type UserActionType =
  | UpdateAccountRequest
  | UpdateAccountSuccess
  | UpdateAccountFailed;
