import { pre, prop, modelOptions, Ref } from "@typegoose/typegoose";
import { User } from "./userModel";
import { Ganja } from "./ganjaModel";

export type ReviewInput = {
  content: string;
  rating: number;
  user: User["_id"];
  ganja: Ganja["_id"];
};

@pre<Review>(/^find/, function (next) {
  this.populate({ path: "user", select: "name photo" });
  next();
})
@pre<Ganja>(/^find/, function (next) {
  this.populate({ path: "ganja", select: "name coverImage" });
  next();
})
@modelOptions({ schemaOptions: { timestamps: true } })
export class Review {
  public _id?: string;

  @prop({ required: true, trim: true, maxLength: 60 })
  public content: string;

  @prop({ required: true, default: 0 })
  public rating: number;

  @prop({ required: true, ref: () => User, type: () => User })
  public user: Ref<User>;

  @prop({ required: true, ref: () => Ganja, type: () => Ganja })
  public ganja: Ref<Ganja>;
}
