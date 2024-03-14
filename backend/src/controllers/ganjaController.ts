import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import {
  createGanja,
  findAllGanjas,
  findGanjaAndDelete,
  findGanjaAndUpdate,
  findGanjaById,
} from "../services/ganjaService";

export const createGanjaHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const ganja = await createGanja(req.body);

    if (!ganja) {
      res.status(400).json({ message: "Create failed! invalid data passed" });
      return;
    }
    res.status(201).json(ganja);
  }
);

export const getAllGanjasHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const ganjas = await findAllGanjas();

    if (!ganjas) {
      res.status(404).json({ message: "Unable to find ganjas!" });
      return;
    }
    res.status(200).json(ganjas);
  }
);

export const getGanjaHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const ganja = await findGanjaById(req.params.id);

    if (!ganja) {
      res.status(404).json({ message: "Ganja not found!" });
      return;
    }
    res.status(200).json(ganja);
  }
);

export const updateGanjaHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const ganja = await findGanjaAndUpdate(req.params.id, req.body);

    if (!ganja) {
      res.status(400).json({ message: "Unable to udpate ganja!" });
      return;
    }
    res.status(200).json(ganja);
  }
);

export const deleteGanjaHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    const ganja = await findGanjaAndDelete(req.params.id);

    if (!ganja) {
      res.status(400).json({ message: "Unable to delete ganja!" });
      return;
    }
    res.status(200).json(null);
  }
);
