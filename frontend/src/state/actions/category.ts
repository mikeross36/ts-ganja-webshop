import { CategoryType } from "../../types/CategoryTypes";

export enum CategoryActionTypes {
  GET_ALL_CATEGORIES_REQUEST = "get_all_categories_request",
  GET_ALL_CATEGORIES_SUCCESS = "get_all_categories_success",
  GET_ALL_CATEGORIES_FAILED = "get_all_categories_failed",
  GET_CATEGORY_REQUEST = "get_category_request",
  GET_CATEGORY_SUCCESS = "get_category_success",
  GET_CATEGORY_FAILED = "get_category_failed",
}

interface GetAllCategoriesRequest {
  type: CategoryActionTypes.GET_ALL_CATEGORIES_REQUEST;
}

interface GetAllCategoriesSuccess {
  type: CategoryActionTypes.GET_ALL_CATEGORIES_SUCCESS;
  payload: CategoryType[];
}

interface GetAllCategoriesFailed {
  type: CategoryActionTypes.GET_ALL_CATEGORIES_FAILED;
  payload: string;
}

interface GetCategoryRequest {
  type: CategoryActionTypes.GET_CATEGORY_REQUEST;
}

interface GetCategorySuccess {
  type: CategoryActionTypes.GET_CATEGORY_SUCCESS;
  payload: CategoryType;
}

interface GetCategoryFailed {
  type: CategoryActionTypes.GET_CATEGORY_FAILED;
  payload: string;
}

export type CategoryActionType =
  | GetAllCategoriesRequest
  | GetAllCategoriesSuccess
  | GetAllCategoriesFailed
  | GetCategoryRequest
  | GetCategorySuccess
  | GetCategoryFailed;
