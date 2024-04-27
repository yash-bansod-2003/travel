import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stepSchema } from "@/lib/validations/step";

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorize" }, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = stepSchema.parse(body);

    // Create step
    const dbStep = await db.step.create({
      data: {
        order: Number(payload.order),
        busId: payload.busId,
        hotelId: payload.hotelId,
        trainId: payload.trainId,
        packageId: payload.packageId,
        days: payload.days,
      },
    });

    if (!dbStep) {
      return NextResponse.json({ error: "step not created" }, { status: 500 });
    }

    return NextResponse.json(dbStep, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dbSteps = await db.step.findMany();

    return NextResponse.json(dbSteps);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
