import { GanjaModel } from "../models";
import { GanjaInput } from "../models/ganjaModel";

export async function createGanja(input: GanjaInput) {
  try {
    const ganja = await GanjaModel.create(input);
    return ganja;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function findAllGanjas() {
  try {
    const ganjas = await GanjaModel.find().lean();
    return ganjas;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function findGanjaById(id: string) {
  try {
    const ganja = await GanjaModel.findById(id).populate([
      {
        path: "reviews",
        strictPopulate: false,
      },
    ]);
    return ganja;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function findGanjaAndUpdate(id: string, input: GanjaInput) {
  try {
    const ganja = await GanjaModel.findByIdAndUpdate(id, input, { new: true });
    return ganja;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function findGanjaAndDelete(id: string) {
  try {
    const ganja = await GanjaModel.findByIdAndDelete(id);
    return ganja;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}
