import { z } from "zod";

export const trainSchema = z.object({
  trainNumber: z.string(),
  name: z.string(),
  sourceId: z.string(),
  destinationId: z.string(),
  departureTime: z.string(),
  arrivalTime: z.string(),
  price: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "Price must be a valid number greater than zero",
    }),
});
