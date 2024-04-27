import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { citySchema } from "@/lib/validations/city";

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorize" }, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = citySchema.parse(body);

    // Create train
    const dbCity = await db.city.create({
      data: {
        name: payload.name,
        value: payload.value,
        stateId: payload.stateId,
      },
    });

    if (!dbCity) {
      return NextResponse.json({ error: "city not created" }, { status: 500 });
    }

    return NextResponse.json(dbCity, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const stateId = searchParams.get("stateId") || "";

  try {
    const dbCityes = await db.city.findMany({
      where: {
        stateId,
      },
    });

    return NextResponse.json(dbCityes);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
