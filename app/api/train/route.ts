import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { trainSchema } from "@/lib/validations/train";

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorize" }, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = trainSchema.parse(body);

    // Create train
    const dbTrain = await db.train.create({
      data: {
        arrivalTime: payload.arrivalTime,
        departureTime: payload.departureTime,
        destinationId: payload.destinationId,
        price: Number(payload.price),
        sourceId: payload.sourceId,
        trainNumber: payload.trainNumber,
        name: payload.name,
      },
    });

    if (!dbTrain) {
      return NextResponse.json({ error: "train not created" }, { status: 500 });
    }

    return NextResponse.json(dbTrain, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dbTrains = await db.train.findMany();

    return NextResponse.json(dbTrains);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
