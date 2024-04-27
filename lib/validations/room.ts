import { z } from "zod";

export const roomSchema = z.object({
  hotelId: z.string(),
  name: z.string(),
  roomNumber: z.string(),
  capacity: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "Capacity must be a valid number greater than zero",
    }),
  price: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "Price must be a valid number greater than zero",
    }),
});
