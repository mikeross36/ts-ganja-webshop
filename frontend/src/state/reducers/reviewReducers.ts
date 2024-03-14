import { ReviewActionType, ReviewActionTypes } from "../actions/review";

type StateType = {
  loading: boolean;
  error: string | null;
  content: string;
};

const initialState = {
  loading: false,
  error: null,
  content: "",
};

export const addReviewReducer = (
  state: StateType = initialState,
  action: ReviewActionType
) => {
  switch (action.type) {
    case ReviewActionTypes.ADD_REVIEW_REQUEST: {
      return { loading: true, error: null, content: "" };
    }
    case ReviewActionTypes.ADD_REVIEW_SUCCESS: {
      return { loading: false, error: null, content: action.payload };
    }
    case ReviewActionTypes.ADD_REVIEW_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
