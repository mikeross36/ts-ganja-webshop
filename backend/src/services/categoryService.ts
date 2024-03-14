import { CategoryModel } from "../models/index";

export async function findAllCategories() {
  try {
    const categories = await CategoryModel.find().lean();
    return categories;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function findCategoryById(id: string) {
  try {
    const category = await CategoryModel.findById(id);
    return category;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}
