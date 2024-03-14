import { RequestHandler, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
  findUserById,
  findAllUsers,
  findUserAndUpdate,
  findUserAndDelete,
} from "../services/userService";
import { UserInput } from "../models/userModel";

export const getAllUsersHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const users = await findAllUsers();

    if (!users) {
      res.status(404).json({ message: "Users not found!" });
      return;
    }
    res.status(200).json({ results: users!.length, users });
  }
);

export const getUserHandler: RequestHandler = asyncHandler(async (req, res) => {
  const user = await findUserById(req.params.id);

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    return;
  }
  res.status(200).json(user);
});

export const updateUserHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const user = await findUserAndUpdate(req.params.id, req.body);

    if (!user) {
      res.status(400).json({ message: "Unable to update user!" });
      return;
    }
    res.status(200).json({ status: "success", user: user });
  }
);

export const deleteUserHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const user = await findUserAndDelete(req.params.id);
    if (!user) {
      res.status(400).json({ message: "Unable to delete user!" });
      return;
    }
    res.status(204).json(null);
  }
);

export const deleteMe: RequestHandler = asyncHandler(async (req, res) => {
  await findUserAndUpdate(req.params.id, { active: false } as UserInput);
  res.status(204).json(null);
});

export const getUserProfileHandler: RequestHandler = asyncHandler(
  async (req, res, next: NextFunction) => {
    req.params.id = req.user._id;
    next();
  }
);

export const updateUserAccountHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const updatedUser = await findUserAndUpdate(req.user._id, req.body);

    if (!updatedUser) {
      res.status(400).json({ message: "User update failed!" });
      return;
    } else {
      res.status(200).json({ status: "success", updatedUser });
    }
  }
);
