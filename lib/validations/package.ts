import { z } from "zod";

export const packageSchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "duration must be a valid number greater than zero",
    }),
  price: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "Price must be a valid number greater than zero",
    }),
  image: z.string().min(1),
});
