import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { packageSchema } from "@/lib/validations/package";
import { City } from "@prisma/client";

const extendedPackageSchema = packageSchema.extend({
  cities: z.array(z.unknown()),
});

const routeContextSchema = z.object({
  params: z.object({
    packageId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Ensure user is authentication and has access to this user.
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorize" }, { status: 403 });
    }

    // Validate the route context.
    const { params } = routeContextSchema.parse(context);

    // Get the unique package.
    const dbPackage = await db.package.findUnique({
      where: {
        id: params.packageId,
      },
    });

    if (!dbPackage) {
      return NextResponse.json({ error: "package not found" }, { status: 404 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = extendedPackageSchema.parse(body);

    // Update the unique package.
    const dbUpdatedPackage = await db.package.update({
      where: {
        id: params.packageId,
      },
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

    if (!dbUpdatedPackage) {
      return NextResponse.json(
        { error: "package not updated" },
        { status: 500 },
      );
    }

    return NextResponse.json(dbUpdatedPackage, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Ensure user is authentication and has access to this user.
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorize" }, { status: 403 });
    }

    // Validate the route context.
    const { params } = routeContextSchema.parse(context);

    // Get the unique package.
    const dbPackage = await db.package.findUnique({
      where: {
        id: params.packageId,
      },
    });

    if (!dbPackage) {
      return NextResponse.json({ error: "package not found" }, { status: 404 });
    }

    // delete the unique package.
    const dbDeletedPackage = await db.package.delete({
      where: {
        id: params.packageId,
      },
    });

    if (!dbDeletedPackage) {
      return NextResponse.json(
        { error: "package not deleted" },
        { status: 500 },
      );
    }

    return NextResponse.json(dbDeletedPackage, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
