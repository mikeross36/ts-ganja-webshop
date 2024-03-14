import { Router } from "express";
import { tokenProtectHandler } from "../controllers/authController";
import {
  createOrderHandler,
  deliverOrderHandler,
  getOrderHandler,
  getUserOrdersHandler,
  payOrderHandler,
  stripePaymentIntentHandler,
} from "../controllers/orderController";

const router = Router();

router.use(tokenProtectHandler);

// if place /:id above the /user-orders, then you input the URL with /api/v1/orders/user-orders,
// Route will consider /user-orders as an id, and it is not a type of ObjectId
router.post("/", createOrderHandler);
router.put("/:id/pay-order", payOrderHandler);
router.get("/user-orders", getUserOrdersHandler);
router.get("/:id", getOrderHandler);
router.post("/:id/stripe-payment-intent", stripePaymentIntentHandler);
router.put("/:id/deliver-order", deliverOrderHandler);

export default router;
