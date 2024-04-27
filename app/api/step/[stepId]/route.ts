import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { stepSchema } from "@/lib/validations/step";

const routeContextSchema = z.object({
  params: z.object({
    stepId: z.string(),
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

    // Get the unique step.
    const dbStep = await db.step.findUnique({
      where: {
        id: params.stepId,
      },
    });

    if (!dbStep) {
      return NextResponse.json({ error: "step not found" }, { status: 404 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = stepSchema.parse(body);

    // Update the unique step.
    const dbUpdatedStep = await db.step.update({
      where: {
        id: params.stepId,
      },
      data: {
        order: Number(payload.order),
        busId: payload.busId,
        hotelId: payload.hotelId,
        trainId: payload.trainId,
        packageId: payload.packageId,
        days: payload.days,
      },
    });

    if (!dbUpdatedStep) {
      return NextResponse.json({ error: "step not updated" }, { status: 500 });
    }

    return NextResponse.json(dbUpdatedStep, { status: 200 });
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

    // Get the unique step.
    const dbStep = await db.step.findUnique({
      where: {
        id: params.stepId,
      },
    });

    if (!dbStep) {
      return NextResponse.json({ error: "step not found" }, { status: 404 });
    }

    // delete the unique step.
    const dbDeletedStep = await db.step.delete({
      where: {
        id: params.stepId,
      },
    });

    if (!dbDeletedStep) {
      return NextResponse.json({ error: "step not deleted" }, { status: 500 });
    }

    return NextResponse.json(dbDeletedStep, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
