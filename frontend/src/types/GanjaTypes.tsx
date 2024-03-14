import { ReviewType } from "./ReviewType";

export type GanjaType = {
  _id: string;
  name: string;
  category: string;
  dataTested?: Date;
  thca?: string;
  thc?: string;
  cbda?: string;
  cbd?: string;
  summary?: string;
  description?: string;
  slug?: string;
  price: number;
  coverImage: string;
  rating?: number;
  reviews: ReviewType[] | undefined;
};
