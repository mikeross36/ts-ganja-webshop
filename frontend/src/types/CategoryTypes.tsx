import { GanjaType } from "./GanjaTypes";

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  origin: string;
  description: string;
  cbdToThcRatio: string;
  effectsOfUse: string;
  periodOfUse: string;
  coverImage: string;
  ganjas: GanjaType[];
};
