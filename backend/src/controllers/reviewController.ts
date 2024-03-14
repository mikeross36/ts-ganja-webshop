import { RequestHandler, Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
  createReview,
  findAllReviews,
  findReviewAndDelete,
  findReviewAndUpdate,
  findReviewById,
} from "../services/reviewService";

export const setGanjaUserIds = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.ganja) req.body.ganja = req.params.ganjaId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

export const createReviewHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const body = req.body;

    const review = await createReview(body);

    if (!review) {
      res.status(400).json({ message: "Unable to create review!" });
      return;
    }

    res.status(201).json({ status: "success", review });
  }
);

export const getReviewHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const review = await findReviewById(req.params.id);

    if (!review) {
      res.status(404).json("Review not found!");
      return;
    }

    res.status(200).json(review);
  }
);

export const getAllReviewsHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const reviews = await findAllReviews();

    if (!reviews) {
      res.status(404).json({ message: "Reviews not found!" });
      return;
    }

    res.status(200).json(reviews);
  }
);

export const updateReviewHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const review = await findReviewAndUpdate(req.params.id, req.body);

    if (!review) {
      res.status(400).json({ message: "Unable to update review!" });
      return;
    }

    res.status(200).json({ status: "success", review: review });
  }
);

export const deleteReviewHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const review = await findReviewAndDelete(req.params.id);

    if (!review) {
      res.status(400).json({ message: "Unable to delete review!" });
      return;
    }

    res.status(200).json(null);
  }
);
