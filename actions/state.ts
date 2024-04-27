import { db } from "@/lib/db";
import { State } from "@prisma/client";

export async function searchStates(): Promise<State[]> {
  const states = await db.state.findMany();
  return states;
}
