import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { roomSchema } from "@/lib/validations/room";

const routeContextSchema = z.object({
  params: z.object({
    roomId: z.string(),
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

    // Get the unique room.
    const dbRoom = await db.room.findUnique({
      where: {
        id: params.roomId,
      },
    });

    if (!dbRoom) {
      return NextResponse.json({ error: "room not found" }, { status: 404 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = roomSchema.parse(body);

    // Update the unique room.
    const dbUpdatedRoom = await db.room.update({
      where: {
        id: params.roomId,
      },
      data: {
        capacity: Number(payload.capacity),
        price: Number(payload.price),
        roomNumber: payload.roomNumber,
        hotelId: payload.hotelId,
        name: payload.name,
      },
    });

    if (!dbUpdatedRoom) {
      return NextResponse.json({ error: "room not updated" }, { status: 500 });
    }

    return NextResponse.json(dbUpdatedRoom, { status: 200 });
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

    // Get the unique room.
    const dbRoom = await db.room.findUnique({
      where: {
        id: params.roomId,
      },
    });

    if (!dbRoom) {
      return NextResponse.json({ error: "room not found" }, { status: 404 });
    }

    // delete the unique room.
    const dbDeletedRoom = await db.room.delete({
      where: {
        id: params.roomId,
      },
    });

    if (!dbDeletedRoom) {
      return NextResponse.json({ error: "room not deleted" }, { status: 500 });
    }

    return NextResponse.json(dbDeletedRoom, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
