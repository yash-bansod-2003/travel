import { z } from "zod";

export const hotelSchema = z.object({
  name: z.string(),
  description: z.string(),
  cityId: z.string(),
  address: z.string(),
  stars: z
    .string()
    .refine(
      (value) =>
        !isNaN(Number(value)) && Number(value) > 0 && Number(value) < 8,
      {
        message:
          "Stars must be a valid number greater than zero and smaller than 8",
      },
    ),
  checkIn: z.string(),
  checkOut: z.string(),
});
