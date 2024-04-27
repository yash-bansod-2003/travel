import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hotelSchema } from "@/lib/validations/hotel";

const routeContextSchema = z.object({
  params: z.object({
    hotelId: z.string(),
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

    // Get the unique hotel.
    const dbHotel = await db.hotel.findUnique({
      where: {
        id: params.hotelId,
      },
    });

    if (!dbHotel) {
      return NextResponse.json({ error: "hotel not found" }, { status: 404 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = hotelSchema.parse(body);

    // Update the unique hotel.
    const dbUpdatedHotel = await db.hotel.update({
      where: {
        id: params.hotelId,
      },
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

    if (!dbUpdatedHotel) {
      return NextResponse.json({ error: "hotel not updated" }, { status: 500 });
    }

    return NextResponse.json(dbUpdatedHotel, { status: 200 });
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

    // Get the unique hotel.
    const dbHotel = await db.hotel.findUnique({
      where: {
        id: params.hotelId,
      },
    });

    if (!dbHotel) {
      return NextResponse.json({ error: "hotel not found" }, { status: 404 });
    }

    // delete the unique hotel.
    const dbDeletedHotel = await db.hotel.delete({
      where: {
        id: params.hotelId,
      },
    });

    if (!dbDeletedHotel) {
      return NextResponse.json({ error: "hotel not deleted" }, { status: 500 });
    }

    return NextResponse.json(dbDeletedHotel, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
