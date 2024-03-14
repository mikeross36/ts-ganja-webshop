import { object, string, TypeOf } from "zod";

export const registerUserSchema = object({
  body: object({
    name: string({ required_error: "User name is required!" }),
    email: string({ required_error: "Email is required" }).email(
      "Email is not valid!"
    ),
    password: string({ required_error: "Password is required!" }).min(
      8,
      "Password must be at least 8 chars long!"
    ),
    confirmPassword: string({
      required_error: "Password confirmation iz required!",
    }),
  }).refine((data) => data.password === data.confirmPassword),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Email is not valid!"
    ),
    password: string({ required_error: "Password is required!" }).min(
      8,
      "Password must be at least 8 chars long!"
    ),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({ required_error: "Email is required!" }).email(
      "Email is not valid!"
    ),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    resetToken: string(),
  }),
  body: object({
    password: string({ required_error: "Password is required!" }).min(
      8,
      "Password must be at least 8 chars long!"
    ),
    confirmPassword: string({
      required_error: "Password confirmation iz required!",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  }),
});

export const updatePasswordSchema = object({
  body: object({
    loginPassword: string({ required_error: "Password is required" }).min(
      8,
      "Password must be at least 8 chars long!"
    ),
    password: string({ required_error: "New password is required" }).min(
      8,
      "Password must be at least 8 chars long!"
    ),
    confirmPassword: string({
      required_error: "Password confirmation iz required!",
    }),
  }).refine((data) => data.password === data.confirmPassword),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>["body"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>["params"];
export type UpdatePasswordInput = TypeOf<typeof updatePasswordSchema>["body"];
