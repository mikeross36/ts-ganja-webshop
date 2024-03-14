import { object, string, number, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({ required_error: "Name is required" }),
    category: string({ required_error: "Category is required" }),
    thca: string({ required_error: "Thca is required" }),
    thc: string({ required_error: "Thc is required" }),
    cbda: string({ required_error: "Cbda is required" }),
    cbd: string({ required_error: "Cbd is required" }),
    summary: string({ required_error: "Summary is required" }).max(
      200,
      "Summary cannot be longer then 200 chars!"
    ),
    price: number({ required_error: "Price is required" }),
    coverImage: string({ required_error: "Cover image is required" }),
  }),
};

const params = {
  params: object({
    productId: string({ required_error: "Product is is required! " }),
  }),
};

export const createGanjaSchema = object({
  ...payload,
});

export const getGanjaSchema = object({
  ...params,
});

export const updateGanjaSchema = object({
  ...payload,
  ...params,
});

export const deleteGanjaSchema = object({
  ...params,
});

export type CreateGanjaInput = TypeOf<typeof createGanjaSchema>["body"];
export type GetGanjaInput = TypeOf<typeof getGanjaSchema>["params"];
export type UpdateGanjaInput = TypeOf<typeof updateGanjaSchema>;
export type DeleteGanjaInput = TypeOf<typeof deleteGanjaSchema>["params"];
