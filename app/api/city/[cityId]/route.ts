import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { citySchema } from "@/lib/validations/city";

const routeContextSchema = z.object({
  params: z.object({
    cityId: z.string(),
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

    // Get the unique city.
    const dbCity = await db.city.findUnique({
      where: {
        id: params.cityId,
      },
    });

    if (!dbCity) {
      return NextResponse.json({ error: "city not found" }, { status: 404 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = citySchema.parse(body);

    // Update the unique city.
    const dbUpdatedCity = await db.city.update({
      where: {
        id: params.cityId,
      },
      data: {
        name: payload.name,
        value: payload.value,
        stateId: payload.stateId,
      },
    });

    if (!dbUpdatedCity) {
      return NextResponse.json({ error: "city not updated" }, { status: 500 });
    }

    return NextResponse.json(dbUpdatedCity, { status: 200 });
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

    // Get the unique city.
    const dbCity = await db.city.findUnique({
      where: {
        id: params.cityId,
      },
    });

    if (!dbCity) {
      return NextResponse.json({ error: "city not found" }, { status: 404 });
    }

    // delete the unique city.
    const dbDeletedCity = await db.city.delete({
      where: {
        id: params.cityId,
      },
    });

    if (!dbDeletedCity) {
      return NextResponse.json({ error: "city not deleted" }, { status: 500 });
    }

    return NextResponse.json(dbDeletedCity, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
