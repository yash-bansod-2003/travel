/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import {
  Package,
  Step,
  Train,
  Bus,
  Hotel,
  Booking,
  City,
} from "@prisma/client";
import { TrainBox } from "./train-box";
import { HotelBox } from "./hotel-box";
import { BusBox } from "./bus-box";
import { toast } from "sonner";
import useHotelStore from "@/hooks/use-hotel";
import { UserDetailsForm } from "./user-details-form";
import { useUserStore } from "@/hooks/use-users";
import { formatCityNames } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDateRange } from "@/hooks/use-date-range";

interface IStep extends Step {
  bus: Bus | null;
  hotel: Hotel | null;
  train: Train | null;
}

interface IPackage extends Package {
  steps: IStep[];
  cities: City[];
}

interface WrapperProps {
  package1: IPackage;
  booking: Booking | null;
}

export function Wrapper({ package1, booking }: WrapperProps) {
  const { date } = useDateRange();
  const { users } = useUserStore();
  const { hotels } = useHotelStore();
  const [isLoading, setIsLoading] = React.useState<boolean>();

  let count = 0;

  async function onSubmit(values: {
    packageId: string;
    total: number;
    hotels: any;
    users: string[];
    startDate: Date;
  }) {
    if (users.length < 1) {
      return toast.error("Please add users.", {
        description: `please add users using a box Enter user details.`,
      });
    }

    setIsLoading(true);

    const response = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast.error("Something went wrong.", {
        description: `Your booking was not created. Please try again.`,
      });
    }

    const step = await response.json();

    return toast.success(`booking created Successfully.`, {
      description: `Your booking was created`,
    });
  }

  return (
    <div className="container mx-auto px-4 flex-grow py-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="w-full md:w-1/2">
          <img
            src={package1.image}
            alt="Package Image"
            className="w-full h-96 object-cover object-center rounded-lg shadow-lg mb-8"
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              {package1.name} ({package1.duration})
            </h2>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Description
            </h2>
            <p className="text-gray-700 mb-6">{package1.description}</p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Details
            </h2>
            <ul className="text-gray-700 mb-6">
              <li>
                <strong>Explore Cities:</strong>{" "}
                {formatCityNames(package1.cities)}
              </li>
              <li>
                <strong>Estimated Price:</strong> {package1.price}
              </li>
            </ul>

            <div className="text-center">
              <Button
                size="lg"
                disabled={isLoading}
                onClick={() =>
                  onSubmit({
                    packageId: package1.id,
                    total: package1.price,
                    hotels,
                    users,
                    startDate: date?.from || new Date(),
                  })
                }
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Parts of the Journey */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Parts of the Journey
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-background rounded-lg shadow-md overflow-hidden p-4">
            {package1.steps.map((step, index) => {
              if (step.train) {
                return <TrainBox key={index} step={step} train={step.train} />;
              } else if (step.hotel) {
                let hotelToRender = step.hotel;
                if (hotels[count]) {
                  hotelToRender = { ...hotels[count] };
                  count++;
                }
                return (
                  <HotelBox key={index} step={step} hotel={hotelToRender} />
                );
              } else if (step.bus) {
                return <BusBox key={index} step={step} bus={step.bus} />;
              }
            })}
          </div>

          <div className="w-full">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Enter User Details
              </h2>
              <UserDetailsForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
