import { ReviewType } from "../../types/ReviewType";

export enum ReviewActionTypes {
  ADD_REVIEW_REQUEST = "add_review_request",
  ADD_REVIEW_SUCCESS = "add_review_success",
  ADD_REVIEW_FAILED = "add_review_failed",
}

interface AddReviewRequest {
  type: ReviewActionTypes.ADD_REVIEW_REQUEST;
}

interface AddReviewSucces {
  type: ReviewActionTypes.ADD_REVIEW_SUCCESS;
  payload: ReviewType;
}

interface AddReviewFailed {
  type: ReviewActionTypes.ADD_REVIEW_FAILED;
  payload: string;
}

export type ReviewActionType =
  | AddReviewRequest
  | AddReviewSucces
  | AddReviewFailed;
