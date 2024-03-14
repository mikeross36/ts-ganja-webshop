import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import {
  findAllCategories,
  findCategoryById,
} from "../services/categoryService";

export const getAllCategories: RequestHandler = asyncHandler(
  async (req, res) => {
    const categories = await findAllCategories();
    if (!categories) {
      res.status(404).json({ message: "Categories not found!" });
      return;
    }
    res.status(200).json(categories);
  }
);

export const getCategory: RequestHandler = asyncHandler(async (req, res) => {
  const category = await findCategoryById(req.params.id);
  if (!category) {
    res.status(404).json({ message: "Category not found!" });
    return;
  }
  res.status(200).json(category);
});
