import { Router } from "express";
import reviewRouter from "./reviewRoutes";
import { tokenProtectHandler, isAdmin } from "../controllers/authController";
import {
  createGanjaHandler,
  getAllGanjasHandler,
  getGanjaHandler,
  updateGanjaHandler,
  deleteGanjaHandler,
} from "../controllers/ganjaController";
import validateSchema from "../utils/validateSchema";
import { createGanjaSchema } from "../schemas/ganjaSchema";

const router = Router({ mergeParams: true });

router.use("/:ganjaId/reviews", reviewRouter);

router
  .route("/")
  .get(getAllGanjasHandler)
  .post([
    tokenProtectHandler,
    isAdmin,
    validateSchema(createGanjaSchema),
    createGanjaHandler,
  ]);

router
  .route("/:id")
  .get(getGanjaHandler)
  .patch(tokenProtectHandler, isAdmin, updateGanjaHandler)
  .delete(tokenProtectHandler, isAdmin, deleteGanjaHandler);

export default router;
