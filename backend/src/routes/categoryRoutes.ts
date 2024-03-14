import { Router } from "express";
import {
  getAllCategories,
  getCategory,
} from "../controllers/categoryController";
import ganjaRouter from "./ganjaRoutes";

const router = Router();

router.use("/:categoryId/ganjas", ganjaRouter);

router.route("/").get(getAllCategories);
router.route("/:id").get(getCategory);

export default router;
