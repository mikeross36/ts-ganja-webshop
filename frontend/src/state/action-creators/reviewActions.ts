import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";
import { ReviewActionType, ReviewActionTypes } from "../actions/review";
import { Dispatch } from "redux";

export const addReviewAction =
  (id: string, content: string) =>
  async (dispatch: Dispatch<ReviewActionType>) => {
    dispatch({ type: ReviewActionTypes.ADD_REVIEW_REQUEST });
    try {
      const { data } = await apiClient.post(`/api/v1/ganjas/${id}/reviews`, {
        content,
      });
      dispatch({ type: ReviewActionTypes.ADD_REVIEW_SUCCESS, payload: data });
      if (data.status === "success") {
        toast.success("Review added successfully!");
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ReviewActionTypes.ADD_REVIEW_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };
