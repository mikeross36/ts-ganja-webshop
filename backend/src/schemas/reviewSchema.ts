import { string, object, TypeOf } from "zod";

export const createReviewSchema = object({
  body: object({
    content: string({ required_error: "Review content is required!" }).max(
      120,
      "Review content cannot be longer then 120 chars"
    ),
  }),
});

export const updateReviewSchema = object({
  params: object({
    reviewId: string(),
  }),
  body: object({
    content: string({ required_error: "Review content is required!" }).max(
      120,
      "Review content cannot be longer then 120 chars"
    ),
  }),
});

export type CreateReviewInput = TypeOf<typeof createReviewSchema>["body"];
