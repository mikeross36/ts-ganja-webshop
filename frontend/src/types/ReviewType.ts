import { GanjaType } from "./GanjaTypes";
import { UserType } from "./UserTypes";

export type ReviewType = {
  _id: string;
  content: string;
  rating: number;
  user: UserType;
  ganja: GanjaType;
};
