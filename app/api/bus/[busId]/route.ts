import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { busSchema } from "@/lib/validations/bus";

const routeContextSchema = z.object({
  params: z.object({
    busId: z.string(),
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

    // Get the unique bus.
    const dbBus = await db.bus.findUnique({
      where: {
        id: params.busId,
      },
    });

    if (!dbBus) {
      return NextResponse.json({ error: "bus not found" }, { status: 404 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = busSchema.parse(body);

    // Update the unique bus.
    const dbUpdatedBus = await db.bus.update({
      where: {
        id: params.busId,
      },
      data: {
        arrivalTime: payload.arrivalTime,
        departureTime: payload.departureTime,
        destinationId: payload.destinationId,
        sourceId: payload.sourceId,
        price: Number(payload.price),
        busNumber: payload.busNumber,
        name: payload.name,
      },
    });

    if (!dbUpdatedBus) {
      return NextResponse.json({ error: "bus not updated" }, { status: 500 });
    }

    return NextResponse.json(dbUpdatedBus, { status: 200 });
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

    // Get the unique bus.
    const dbBus = await db.bus.findUnique({
      where: {
        id: params.busId,
      },
    });

    if (!dbBus) {
      return NextResponse.json({ error: "bus not found" }, { status: 404 });
    }

    // delete the unique bus.
    const dbDeletedBus = await db.bus.delete({
      where: {
        id: params.busId,
      },
    });

    if (!dbDeletedBus) {
      return NextResponse.json({ error: "bus not deleted" }, { status: 500 });
    }

    return NextResponse.json(dbDeletedBus, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
