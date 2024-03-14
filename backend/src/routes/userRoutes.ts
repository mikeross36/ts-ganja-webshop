import { Router } from "express";
import {
  forgotPasswordHandler,
  updatePasswordHandler,
} from "../controllers/authController";
import {
  registerUserHandler,
  loginUserHandler,
  logoutUserHandler,
  tokenProtectHandler,
  isAdmin,
  resetPasswordHandler,
} from "../controllers/authController";
import {
  updateUserHandler,
  getAllUsersHandler,
  getUserHandler,
  deleteUserHandler,
  deleteMe,
  getUserProfileHandler,
  updateUserAccountHandler,
} from "../controllers/userController";
import validateSchema from "../utils/validateSchema";
import {
  registerUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginUserSchema,
  updatePasswordSchema,
} from "../schemas/userSchema";

const router = Router();

router.post("/", validateSchema(registerUserSchema), registerUserHandler);
router.post("/login-user", validateSchema(loginUserSchema), loginUserHandler);

router.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  forgotPasswordHandler
);
router.post(
  "/reset-password/:resetToken",
  validateSchema(resetPasswordSchema),
  resetPasswordHandler
);

router.use(tokenProtectHandler);

router.post("/logout-user", logoutUserHandler);
router.post("/update-user-account", updateUserAccountHandler);

router.get("/user-profile", getUserProfileHandler, getUserHandler);
router.patch("/:id", updateUserHandler);
router.delete("/delete-me", deleteMe);
router.put(
  "/update-password",
  validateSchema(updatePasswordSchema),
  updatePasswordHandler
);

router.use(isAdmin);

router.route("/").get(getAllUsersHandler);
router.route("/:id").get(getUserHandler).delete(deleteUserHandler);

export default router;
