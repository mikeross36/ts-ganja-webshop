import { RequestHandler, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import config from "config";
import Email from "../utils/email";
// import {ObjectId} from "bson"
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByResetToken,
} from "../services/userService";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  generateCookie,
  generateToken,
  killTheCookie,
} from "../utils/generateToken";

const devOrigin = config.get<string>("devOrigin");
const prodOrigin = config.get<string>("prodOrigin");

export const registerUserHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const email = req.body.email as string;
    const body = req.body;

    const userExists = await findUserByEmail(email);

    if (userExists) {
      res.status(409).json({ message: "User with this email exists!" });
    } else {
      const user = await createUser(body);

      const url = `${req.protocol}://${req.get("host")}/user-profile`;
      await new Email(user!, url).sendWelcomeEmail();

      res.status(201).json({ status: "success", user: user });
    }
  }
);

export const loginUserHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All the fields are mandatory!" });
      return;
    }

    const user = await findUserByEmail(email);

    if (!user || !(await user.matchPasswords(password))) {
      res.status(401).json({ message: "Invalid email or password!" });
      return;
    } else {
      const token = generateToken(user);
      generateCookie(res, token);

      res.status(200).json({ status: "success", user, token });
    }
  }
);

export const logoutUserHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    killTheCookie(res);
  }
);

export const tokenProtectHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      res.status(401).json({ message: "You are not logged in!" });
      return;
    }
    const verified = jwt.verify(token, config.get<string>("jwtSecret"));
    const currentUser = verified as {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
    if (!currentUser) {
      res.status(404).json({ message: "User is not logged in!" });
      return;
    }
    req.user = currentUser;
    next();
  }
);

export const isAdmin: RequestHandler = asyncHandler(
  async (req, res, next: NextFunction) => {
    if (!req.user || req.user.isAdmin === false) {
      res.status(401).json({
        message: "You do not have permission to perform this action!",
      });
      return;
    }
    next();
  }
);

export const forgotPasswordHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const email = req.body.email;

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "There is not user with this email!" });
      return;
    }

    const resetToken = user!.createPasswordResetToken();
    await user!.save();

    try {
      const resetUrl =
        process.env.NODE_ENV === "development"
          ? `${devOrigin}/reset-password/${resetToken}`
          : `${prodOrigin}/reset-password/${resetToken}`;

      await new Email(user!, resetUrl).sendPasswordReset();

      res.status(200).json({
        status: "success",
        message: "Password reset token send by email!",
      });
    } catch (err) {
      user!.passwordResetToken = undefined as unknown as string;
      await user!.save();

      res.status(500).json({ message: "There was an error sending email!" });
    }
  }
);

export const resetPasswordHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await findUserByResetToken(hashedResetToken);

    if (!user) {
      res.status(400).json({ message: "Reset token is invalid or expired!" });
      return;
    } else {
      user.password = password;
      user.passwordResetToken = undefined;
      await user.save();

      res
        .status(200)
        .json({ status: "success", message: "Password reset successfully!" });
    }
  }
);

export const updatePasswordHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const user = await findUserById(req.user._id);

    if (!user || !(await user.matchPasswords(req.body.loginPassword))) {
      res.status(401).json({ message: "Incorrect password!" });
      return;
    } else {
      user.password = req.body.password;

      await user.save();

      const token = generateToken(user!);
      generateCookie(res, token);

      res.status(200).json({
        status: "success",
        user: user!,
        token,
        message: "Password updated successfully!",
      });
    }
  }
);
