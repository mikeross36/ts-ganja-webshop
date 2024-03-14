import { Dispatch } from "redux";
import { CategoryActionType, CategoryActionTypes } from "../actions/category";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";

export const getAllCategoriesAction =
  () => async (dispatch: Dispatch<CategoryActionType>) => {
    dispatch({ type: CategoryActionTypes.GET_ALL_CATEGORIES_REQUEST });
    try {
      const { data } = await apiClient.get("/api/v1/categories");
      if (data)
        dispatch({
          type: CategoryActionTypes.GET_ALL_CATEGORIES_SUCCESS,
          payload: data,
        });
      // console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: CategoryActionTypes.GET_ALL_CATEGORIES_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };

export const getCategoryAction =
  (id: string) => async (dispatch: Dispatch<CategoryActionType>) => {
    dispatch({ type: CategoryActionTypes.GET_CATEGORY_REQUEST });
    try {
      const { data } = await apiClient.get(`/api/v1/categories/${id}`);
      if (data)
        dispatch({
          type: CategoryActionTypes.GET_CATEGORY_SUCCESS,
          payload: data,
        });
      // console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: CategoryActionTypes.GET_CATEGORY_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };
