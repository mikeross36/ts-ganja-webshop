import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { OrderModel } from "../models";
import { Order } from "../models/orderModel";
import Stripe from "stripe";
import config from "config";

export const createOrderHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const { orderItems } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: "Cart is empty!" });
    }
    const order = await OrderModel.create({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    } as unknown as Order);

    res.status(201).json({ status: "success", order: order });
  }
);

export const getOrderHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Order not found!" });
      return;
    }
    res.status(200).json(order);
  }
);

export const payOrderHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Unable to pay order!" });
      return;
    } else {
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      order.paymentResult = {
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const paidOrder = await order.save();
      res
        .status(200)
        .json({ message: "Order paid successfully!", order: paidOrder });
    }
  }
);

export const getUserOrdersHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const orders = await OrderModel.find({ user: req.user._id });
    if (!orders) {
      res.status(404).json({ message: "Orders not found!" });
      return;
    }
    res.status(200).json(orders);
  }
);

export const stripePaymentIntentHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    const stripe = new Stripe(config.get("stripeSecretKey"));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalPrice * 100,
      currency: "EUR",
      payment_method_types: ["card"],
    });

    if (!paymentIntent) {
      res.status(500).json({ message: "Server error!" });
      return;
    }

    res.json({ clientSecret: paymentIntent.client_secret });
  }
);

export const deliverOrderHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    } else {
      order.isDelivered = true;
      order.deliveredAt = new Date(Date.now());

      const deliveredOrder = await order.save();
      res
        .status(200)
        .json({ message: "Order delivered", order: deliveredOrder });
    }
  }
);
