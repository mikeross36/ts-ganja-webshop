import { Dispatch } from "redux";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";
import { UserActionType, UserActionTypes } from "../actions/user";

export const updateUserAccountAction =
  (name: string, email: string) =>
  async (dispatch: Dispatch<UserActionType>) => {
    dispatch({ type: UserActionTypes.UPDATE_ACCOUNT_REQUEST });
    try {
      const { data } = await apiClient.post(
        "/api/v1/users/update-user-account",
        {
          name,
          email,
        }
      );
      dispatch({
        type: UserActionTypes.UPDATE_ACCOUNT_SUCCESS,
        payload: data.updatedUser,
      });
      if (data.status === "success") {
        toast.success(
          "Data updated successfully! Please login again with new data!"
        );
      }
      console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: UserActionTypes.UPDATE_ACCOUNT_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };
