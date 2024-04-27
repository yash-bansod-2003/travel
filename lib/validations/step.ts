import { z } from "zod";

export const stepSchema = z.object({
  hotelId: z.string().optional(),
  trainId: z.string().optional(),
  busId: z.string().optional(),
  days: z.string(),
  packageId: z.string(),
  order: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "Order must be a valid number greater than zero",
    }),
});
