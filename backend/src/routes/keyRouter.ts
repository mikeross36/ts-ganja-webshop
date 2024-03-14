import { Router, Request, Response } from "express";
import config from "config";

const router = Router();

router.get("/paypal", (req: Request, res: Response) => {
  res.json({ clientId: config.get("paypalClientId") } || "sb");
});

router.get("/stripe", (req: Request, res: Response) => {
  res.json({ key: config.get("stripePublishableKey") });
});

export default router;
