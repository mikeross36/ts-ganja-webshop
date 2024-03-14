import {
  pre,
  index,
  modelOptions,
  prop,
  DocumentType,
  Severity,
} from "@typegoose/typegoose";
import argon2 from "argon2";
import crypto from "crypto";

export type UserInput = {
  name: string;
  email: string;
  password: string;
  active: boolean;
};

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const hash = await argon2.hash(this.password);
  this.password = hash;
  return;
})
@pre<User>("save", async function () {
  if (!this.isModified("password") || this.isNew) return;
  this.passwordChangedAt = new Date(Date.now() - 1000);
})
@index({ email: 1 })
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
export class User {
  public _id: string;

  @prop({ required: true })
  public name: string;

  @prop({ required: true, unique: true, trim: true })
  public email: string;

  @prop({ required: true, select: false })
  public password: string;

  @prop({ required: true, default: false })
  public isAdmin: boolean;

  @prop({ default: "default.jpg" })
  public photo?: string;

  @prop({ default: true, select: false })
  public active: boolean;

  @prop()
  public passwordChangedAt: Date | undefined;

  @prop()
  public passwordResetToken: string | undefined;

  async matchPasswords(this: DocumentType<User>, loginPassword: string) {
    const isMatch = await argon2.verify(this.password, loginPassword);
    return isMatch;
  }

  createPasswordResetToken(this: DocumentType<User>) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    return resetToken;
  }
}
