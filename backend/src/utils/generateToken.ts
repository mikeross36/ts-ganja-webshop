import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { Response } from "express";
import config from "config";

export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    config.get<string>("jwtSecret"),
    {
      expiresIn: config.get<string>("jwtExpiresIn"),
    }
  );
};

export const generateCookie = (res: Response, token: string): void => {
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    expires: new Date(
      Date.now() +
        Number(config.get("jwtCookieExpiresIn")) * 24 * 60 * 60 * 1000
    ),
  });
};

export const killTheCookie = (res: Response): void => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? true : false,
    expires: new Date(Date.now() + 1 * 1000),
  });
  res.clearCookie("token");
  res.status(200).json({ status: "success", message: "LOGGED OUT!" });
};
