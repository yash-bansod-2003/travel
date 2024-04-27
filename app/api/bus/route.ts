import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { busSchema } from "@/lib/validations/bus";

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorize" }, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = busSchema.parse(body);

    // Create train
    const dbBus = await db.bus.create({
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

    if (!dbBus) {
      return NextResponse.json({ error: "bus not created" }, { status: 500 });
    }

    return NextResponse.json(dbBus, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dbBuses = await db.bus.findMany();

    return NextResponse.json(dbBuses);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
