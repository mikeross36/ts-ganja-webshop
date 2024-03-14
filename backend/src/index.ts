import express, { Request, Response, NextFunction } from "express";
import { corsOptions } from "./utils/options";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import rateLimit from "express-rate-limit";
import config from "config";
import connectDb from "./utils/connectDb";
import { logger } from "./utils/logger";

export const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(corsOptions);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

import ganjaRouter from "./routes/ganjaRoutes";
import userRouter from "./routes/userRoutes";
import categoryRouter from "./routes/categoryRoutes";
import reviewRouter from "./routes/reviewRoutes";
import orderRouter from "./routes/orderRoutes";
import keyRouter from "./routes/keyRouter";

app.use("/api/v1/ganjas", ganjaRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/keys", keyRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status).json({ message: err.message, isError: true });
  next();
});

const port = config.get("port");

app.listen(port, async () => {
  logger.info(`App is running on port http://localhost:${port}`);
  await connectDb();
});
