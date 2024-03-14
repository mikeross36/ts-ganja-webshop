import { CategoryType } from "../../types/CategoryTypes";
import { CategoryActionType, CategoryActionTypes } from "../actions/category";

type StateType = {
  loading: boolean;
  error: string | null;
  categories?: CategoryType[];
  category?: CategoryType;
};

const initialState = {
  loading: false,
  error: null,
  categories: [],
  category: undefined,
};

export const getAllCategoriesReducer = (
  state: StateType = initialState,
  action: CategoryActionType
) => {
  switch (action.type) {
    case CategoryActionTypes.GET_ALL_CATEGORIES_REQUEST: {
      return { loading: true, error: null };
    }
    case CategoryActionTypes.GET_ALL_CATEGORIES_SUCCESS: {
      return { loading: false, error: null, categories: action.payload };
    }
    case CategoryActionTypes.GET_ALL_CATEGORIES_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const getCategoryReducer = (
  state: StateType = initialState,
  action: CategoryActionType
) => {
  switch (action.type) {
    case CategoryActionTypes.GET_CATEGORY_REQUEST: {
      return { loading: true, error: null };
    }
    case CategoryActionTypes.GET_CATEGORY_SUCCESS: {
      return { loading: false, error: null, category: action.payload };
    }
    case CategoryActionTypes.GET_CATEGORY_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
