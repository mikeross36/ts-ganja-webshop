import { UserType } from "../../types/UserTypes";
import { UserActionType, UserActionTypes } from "../actions/user";

export type UserStateType = {
  loading: boolean;
  error: string | null;
  updatedUser: UserType | undefined;
};

const initialState = {
  loading: false,
  error: null,
  updatedUser: undefined,
};

export const updateUserAccountReducer = (
  state: UserStateType = initialState,
  action: UserActionType
) => {
  switch (action.type) {
    case UserActionTypes.UPDATE_ACCOUNT_REQUEST: {
      return { loading: true, error: null };
    }
    case UserActionTypes.UPDATE_ACCOUNT_SUCCESS: {
      return { loading: false, error: null, updatedUser: action.payload };
    }
    case UserActionTypes.UPDATE_ACCOUNT_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
