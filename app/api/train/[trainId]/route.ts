import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { trainSchema } from "@/lib/validations/train";

const routeContextSchema = z.object({
  params: z.object({
    trainId: z.string(),
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

    // Get the unique train.
    const dbTrain = await db.train.findUnique({
      where: {
        id: params.trainId,
      },
    });

    if (!dbTrain) {
      return NextResponse.json({ error: "train not found" }, { status: 404 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = trainSchema.parse(body);

    // Update the unique train.
    const dbUpdatedTrain = await db.train.update({
      where: {
        id: params.trainId,
      },
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

    if (!dbUpdatedTrain) {
      return NextResponse.json({ error: "train not updated" }, { status: 500 });
    }

    return NextResponse.json(dbUpdatedTrain, { status: 200 });
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

    // Get the unique train.
    const dbTrain = await db.train.findUnique({
      where: {
        id: params.trainId,
      },
    });

    if (!dbTrain) {
      return NextResponse.json({ error: "train not found" }, { status: 404 });
    }

    // delete the unique train.
    const dbDeletedTrain = await db.train.delete({
      where: {
        id: params.trainId,
      },
    });

    if (!dbDeletedTrain) {
      return NextResponse.json({ error: "train not deleted" }, { status: 500 });
    }

    return NextResponse.json(dbDeletedTrain, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
