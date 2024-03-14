import { modelOptions, prop, Severity, pre, Ref } from "@typegoose/typegoose";
import slugify from "slugify";
import { Review } from "./reviewModel";

export type GanjaInput = {
  name: string;
  category: string;
  thca: string;
  thc: string;
  cbda: string;
  cbd: string;
  summary: string;
  price: number;
  coverImage: string;
};

@pre<Ganja>("save", async function () {
  this.slug = slugify(this.name, { lower: true });
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  options: { allowMixed: Severity.ALLOW },
})
export class Ganja {
  public _id?: string;

  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public category: string;

  @prop({ default: Date.now() })
  public dataTested: Date;

  @prop({ required: true })
  public thca: string;

  @prop({ required: true })
  public thc: string;

  @prop({ required: true })
  public cbda: string;

  @prop({ required: true })
  public cbd: string;

  @prop({ required: true })
  public summary: string;

  @prop()
  public description?: string;

  @prop()
  public slug: string;

  @prop({ required: true, default: 0 })
  public price: number;

  @prop({ required: true })
  public coverImage: string;

  @prop({ required: true, default: 0 })
  public rating: number;
  // virtuals
  @prop({
    ref: Review,
    foreignField: "ganja",
    localField: "_id",
    justOne: false,
  })
  public reviews!: Ref<Review>[];
}
