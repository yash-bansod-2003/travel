import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { hotelSchema } from "@/lib/validations/hotel";

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorize" }, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = hotelSchema.parse(body);

    // Create train
    const dbHotel = await db.hotel.create({
      data: {
        name: payload.name,
        cityId: payload.cityId,
        description: payload.description,
        address: payload.address,
        stars: Number(payload.stars),
        checkIn: payload.checkIn,
        checkOut: payload.checkOut,
      },
    });

    if (!dbHotel) {
      return NextResponse.json({ error: "hotel not created" }, { status: 500 });
    }

    return NextResponse.json(dbHotel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const q = searchParams.get("q");

    const dbHotels = await db.hotel.findMany({
      where: {
        city: {
          name: {
            contains: q || "",
            mode: "insensitive",
          },
        },
      },
    });

    return NextResponse.json(dbHotels);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
