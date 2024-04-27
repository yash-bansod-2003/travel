import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { stateSchema } from "@/lib/validations/state";

const routeContextSchema = z.object({
  params: z.object({
    stateId: z.string(),
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

    // Get the unique state.
    const dbCity = await db.state.findUnique({
      where: {
        id: params.stateId,
      },
    });

    if (!dbCity) {
      return NextResponse.json({ error: "state not found" }, { status: 404 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = stateSchema.parse(body);

    // Update the unique state.
    const dbUpdatedCity = await db.state.update({
      where: {
        id: params.stateId,
      },
      data: {
        name: payload.name,
        value: payload.value,
      },
    });

    if (!dbUpdatedCity) {
      return NextResponse.json({ error: "state not updated" }, { status: 500 });
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

    // Get the unique state.
    const dbCity = await db.state.findUnique({
      where: {
        id: params.stateId,
      },
    });

    if (!dbCity) {
      return NextResponse.json({ error: "state not found" }, { status: 404 });
    }

    // delete the unique state.
    const dbDeletedCity = await db.state.delete({
      where: {
        id: params.stateId,
      },
    });

    if (!dbDeletedCity) {
      return NextResponse.json({ error: "state not deleted" }, { status: 500 });
    }

    return NextResponse.json(dbDeletedCity, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
