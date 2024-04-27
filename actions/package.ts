import { db } from "@/lib/db";
import { Package } from "@prisma/client";

export async function searchPackageByCities(
  cityNames: string[],
): Promise<Package[]> {
  const packages = await db.package.findMany({
    where: {
      cities: {
        every: {
          name: {
            in: cityNames,
          },
        },
      },
    },
  });

  return packages;
}
