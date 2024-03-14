import { Router } from "express";
import { tokenProtectHandler } from "../controllers/authController";
import {
  getAllReviewsHandler,
  createReviewHandler,
  setGanjaUserIds,
  getReviewHandler,
  updateReviewHandler,
  deleteReviewHandler,
} from "../controllers/reviewController";
import validateSchema from "../utils/validateSchema";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../schemas/reviewSchema";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviewsHandler)
  .post(
    tokenProtectHandler,
    setGanjaUserIds,
    validateSchema(createReviewSchema),
    createReviewHandler
  );

router.use(tokenProtectHandler);

router
  .route("/:id")
  .get(getReviewHandler)
  .patch(validateSchema(updateReviewSchema), updateReviewHandler)
  .delete(deleteReviewHandler);

export default router;
