import { z } from "zod";

export const stateSchema = z.object({
  name: z.string(),
  value: z.string(),
});
