import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { roomSchema } from "@/lib/validations/room";

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorize" }, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = roomSchema.parse(body);

    // Create room
    const dbRoom = await db.room.create({
      data: {
        capacity: Number(payload.capacity),
        price: Number(payload.price),
        roomNumber: payload.roomNumber,
        hotelId: payload.hotelId,
        name: payload.name,
      },
    });

    if (!dbRoom) {
      return NextResponse.json({ error: "room not created" }, { status: 500 });
    }

    return NextResponse.json(dbRoom, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dbRooms = await db.room.findMany();

    return NextResponse.json(dbRooms);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
