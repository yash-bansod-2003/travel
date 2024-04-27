import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { Hotel } from "@prisma/client";

const bookingSchema = z.object({
  packageId: z.string(),
  total: z.number(),
  hotels: z.array(z.any()),
  users: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorize" }, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = bookingSchema.parse(body);
    let total = 5000;

    const dbPackage = await db.package.findFirst({
      where: { id: payload.packageId },
      include: {
        steps: {
          include: {
            train: true,
            bus: true,
            hotel: {
              include: {
                rooms: true,
              },
            },
          },
        },
      },
    });

    if (!dbPackage) {
      return NextResponse.json({ error: "no package found" }, { status: 404 });
    }

    dbPackage?.steps.forEach((step) => {
      if (step.bus) {
        total += step.bus?.price * payload.users.length || 1000;
      } else if (step.train) {
        total += step.train?.price * payload.users.length || 1000;
      } else if (step.hotel && payload.hotels.length === 0) {
        total += step.hotel.rooms[0]?.price || 2000;
      }
    });

    payload.hotels.forEach(async (hotel: Hotel) => {
      const dbHotel = await db.hotel.findFirst({
        where: { id: hotel.id },
        include: { rooms: true },
      });
      total += dbHotel?.rooms[0]?.price || 2000;
    });

    // Create train
    const dbBooking = await db.booking.create({
      data: {
        total: total,
        userId: user.id,
        packageId: payload.packageId,
        users: payload.users,
        startDate: payload.startDate,
      },
    });

    if (!dbBooking) {
      return NextResponse.json(
        { error: "booking not created" },
        { status: 500 },
      );
    }

    // Update hotels
    payload.hotels.forEach(async (hotel: Hotel) => {
      const dbHotel = await db.hotel.update({
        where: { id: hotel.id },
        data: {
          bookingId: dbBooking.id,
        },
      });
    });

    return NextResponse.json(dbBooking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const dbBookings = await db.booking.findMany();

    return NextResponse.json(dbBookings);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
