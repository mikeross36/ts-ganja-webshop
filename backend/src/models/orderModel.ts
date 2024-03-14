import { Ref, Severity, modelOptions, prop } from "@typegoose/typegoose";
import { Ganja } from "./ganjaModel";
import { User } from "./userModel";

export class Item {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public quantity: number;

  @prop({ required: true })
  public image: string;

  @prop({ required: true })
  public price: number;

  @prop({ required: true, ref: () => Ganja, type: () => Ganja })
  public ganja: Ref<Ganja>;
}

export class ShippingAddress {
  @prop()
  public fullName?: string;

  @prop()
  public address?: string;

  @prop()
  public city?: string;

  @prop()
  public postalCode?: string;

  @prop()
  public country?: string;

  @prop()
  public lat?: number;

  @prop()
  public lng?: number;
}

class PaymentResult {
  @prop()
  public paymentId: string;

  @prop()
  public status: string;

  @prop()
  public update_time: string;

  @prop()
  public email_address: string;
}

export type OrderInput = {
  orderItems: Item[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: User["_id"];
};

@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
export class Order {
  public _id: string;

  @prop()
  public orderItems: Item[];

  @prop()
  public shippingAddress: ShippingAddress;

  @prop({ required: true, ref: () => User, type: () => User })
  public user: Ref<User>;

  @prop({ required: true })
  public paymentMethod: string;

  @prop()
  public paymentResult?: PaymentResult;

  @prop({ required: true, default: 0 })
  public itemsPrice: number;

  @prop({ required: true, default: 0 })
  public shippingPrice: number;

  @prop({ required: true, default: 0 })
  public taxPrice: number;

  @prop({ required: true, default: 0 })
  public totalPrice: number;

  @prop({ required: true, default: false })
  public isPaid: boolean;

  @prop({ required: true, default: false })
  public isDelivered: boolean;

  @prop()
  public paidAt: Date;

  @prop()
  public deliveredAt: Date;
}
