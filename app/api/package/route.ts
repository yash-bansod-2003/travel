import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { packageSchema } from "@/lib/validations/package";
import { z } from "zod";
import { City } from "@prisma/client";

const extendedPackageSchema = packageSchema.extend({
  cities: z.array(z.unknown()),
});

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorize" }, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = extendedPackageSchema.parse(body);

    // Create package
    const dbPackage = await db.package.create({
      data: {
        name: payload.name,
        description: payload.description,
        price: Number(payload.price),
        image: payload.image,
        duration: Number(payload.duration),
        cities: {
          connect: (payload.cities as City[]).map((city) => city),
        },
      },
    });

    if (!dbPackage) {
      return NextResponse.json(
        { error: "package not created" },
        { status: 500 },
      );
    }

    return NextResponse.json(dbPackage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

const routeContextSchema = z.object({
  query: z.object({
    q: z.string().optional(),
  }),
});

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const q = searchParams.get("q");
    const limit = searchParams.get("limit");

    const cityNames = q?.split(",");

    if (!cityNames) {
      return NextResponse.json(
        { error: "city names required" },
        { status: 500 },
      );
    }

    const dbPackages = await db.package.findMany({
      where: {
        cities: {
          every: {
            name: {
              in: cityNames,
            },
          },
        },
        duration: {
          lte: Number(limit),
        },
      },
      include: {
        cities: true,
      },
    });

    const filteredPackages = dbPackages.filter((pkg) =>
      cityNames.every((cityName) =>
        pkg.cities.some((city) => city.name === cityName),
      ),
    );

    return NextResponse.json(filteredPackages);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
