import { modelOptions, prop, pre, Ref } from "@typegoose/typegoose";
import slugify from "slugify";
import { Ganja } from "./ganjaModel";

@modelOptions({
  schemaOptions: { timestamps: true },
})
@pre<Category>("save", async function () {
  this.slug = slugify(this.name, { lower: true });
})
@pre<Ganja>(/^find/, function () {
  this.populate({ path: "ganjas", select: "-slug" });
})
export class Category {
  public id: string;

  @prop({ required: true, unique: true, trim: true })
  public name!: string;

  @prop()
  public slug!: string;

  @prop({ required: true })
  public origin: string;

  @prop({ required: true, maxLength: 80 })
  public description: string;

  @prop({ required: true })
  public cbdToThcRatio: string;

  @prop({ required: true })
  public effectsOfUse: string;

  @prop({ reqired: true })
  public periodOfUse: string;

  @prop({ required: true })
  public coverImage: string;

  @prop({ required: true, ref: () => Ganja, type: () => Ganja })
  public ganjas: Ref<Ganja>[];
}
