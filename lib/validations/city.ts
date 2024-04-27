import { z } from "zod";

export const citySchema = z.object({
  name: z.string(),
  value: z.string(),
  stateId: z.string(),
});
