import { getModelForClass } from "@typegoose/typegoose";
import { Ganja } from "./ganjaModel";
import { Review } from "./reviewModel";
import { Category } from "./categoryModel";
import { User } from "./userModel";
import { Order } from "./orderModel";

export const GanjaModel = getModelForClass(Ganja);
export const ReviewModel = getModelForClass(Review);
export const CategoryModel = getModelForClass(Category);
export const UserModel = getModelForClass(User);
export const OrderModel = getModelForClass(Order);
