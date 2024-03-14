import { ReviewModel } from "../models/index";
import { ReviewInput } from "../models/reviewModel";

export async function createReview(input: ReviewInput) {
  try {
    const review = await ReviewModel.create(input);
    return review;
  } catch (err) {
    if (err instanceof Error) throw err;
  }
}

export async function findReviewById(id: string) {
  try {
    const review = await ReviewModel.findById(id);
    return review;
  } catch (err) {
    if (err instanceof Error) throw err;
  }
}

export async function findAllReviews() {
  try {
    const reviews = await ReviewModel.find().lean();
    return reviews;
  } catch (err) {
    if (err instanceof Error) throw err;
  }
}

export async function findReviewAndUpdate(id: string, input: ReviewInput) {
  try {
    const review = await ReviewModel.findByIdAndUpdate(id, input);
    return review;
  } catch (err) {
    if (err instanceof Error) throw err;
  }
}

export async function findReviewAndDelete(id: string) {
  try {
    const review = await ReviewModel.findByIdAndDelete(id);
    return review;
  } catch (err) {
    if (err instanceof Error) throw err;
  }
}
