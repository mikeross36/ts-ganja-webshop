import { AuthActionType, AuthActionTypes } from "../actions/auth";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { RootState } from "../store";
import { UserType } from "../../types/UserTypes";

export const registerUserAction =
  (name: string, email: string, password: string, confirmPassword: string) =>
  async (dispatch: Dispatch<AuthActionType>) => {
    dispatch({ type: AuthActionTypes.REGISTER_USER_REQUEST });
    try {
      const { data } = await apiClient.post("/api/v1/users/", {
        name,
        email,
        password,
        confirmPassword,
      });
      if (data) dispatch({ type: AuthActionTypes.REGISTER_USER_SUCCESS });
      if (data.status === "success") {
        toast.success("Registered successfully!");
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: AuthActionTypes.REGISTER_USER_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };

export const loginUserAction =
  (email: string, password: string) =>
  async (dispatch: Dispatch<AuthActionType>) => {
    dispatch({ type: AuthActionTypes.LOGIN_USER_REQUEST });
    try {
      const { data } = await apiClient.post("/api/v1/users/login-user", {
        email,
        password,
      });

      if (data) {
        dispatch({ type: AuthActionTypes.LOGIN_USER_SUCCESS, payload: data });
      }

      if (data.status === "success") {
        toast.success("Logged in successflully!");
      }
      // console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: AuthActionTypes.LOGIN_USER_FAILED,
          payload: err.message,
        });
        toast.error("Invalid email or password!");
      }
    }
  };

export const logoutUserAction =
  () => async (dispatch: Dispatch<AuthActionType>) => {
    dispatch({ type: AuthActionTypes.LOGOUT_USER_REQUEST });
    try {
      const { data } = await apiClient.post("/api/v1/users/logout-user");
      dispatch({ type: AuthActionTypes.LOGOUT_USER_SUCCESS });
      if (data.status === "success") {
        toast.success("Logged out successfully!");
      }
      // window.location.reload();
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: AuthActionTypes.LOGOUT_USER_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };

export const resetPasswordAction =
  (resetToken: string, password: string, confirmPassword: string) =>
  async (dispatch: Dispatch<AuthActionType>) => {
    dispatch({ type: AuthActionTypes.RESET_PASSWORD_REQUEST });
    try {
      const { data } = await apiClient.post(
        `/api/v1/users/reset-password/${resetToken}`,
        { password, confirmPassword }
      );
      dispatch({ type: AuthActionTypes.RESET_PASSWORD_SUCCESS });
      if (data.status === "success")
        toast.success("Password successfully reset! Please login");
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: AuthActionTypes.RESET_PASSWORD_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };

export const updatePasswordAction =
  (loginPassword: string, password: string, confirmPassword: string) =>
  async (dispatch: Dispatch<AuthActionType>, getState: () => RootState) => {
    const userInfo = getState().loginUser as UserType;
    dispatch({ type: AuthActionTypes.UPDATE_PASSWORD_REQUEST });
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await apiClient.put(
        "/api/v1/users/update-password",
        {
          loginPassword,
          password,
          confirmPassword,
        },
        config
      );
      dispatch({ type: AuthActionTypes.UPDATE_PASSWORD_SUCCESS });
      if (data.status === "success") {
        toast.success("Password successfully updated! Please login");
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: AuthActionTypes.UPDATE_PASSWORD_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };
