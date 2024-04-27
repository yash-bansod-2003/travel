"use client";

import * as React from "react";
import { Icons } from "@/components/icons";
import { Hotel, Step } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useHotelStore from "@/hooks/use-hotel";

interface HotelBoxProps {
  hotel: Hotel;
  step: Step;
}

export function HotelBox({ hotel, step }: HotelBoxProps) {
  const { setHotel, clearHotel, hotels } = useHotelStore();
  const [data, setData] = React.useState<Hotel[]>([]);
  const [q, setQ] = React.useState<string>("");

  async function handleSubmit() {
    if (q === "") {
      return;
    }
    const response = await axios.get(`/api/hotel?q=${q}`);
    if (response.data) {
      setData(response.data);
    }
  }

  return (
    <div className="w-full my-2 border p-4 flex">
      <div className="w-12">
        <Icons.hotel className="text-orange-500" />
      </div>
      <div className="flex-1 flex flex-col">
        <p className="mb-4 text-orange-400">{step.days}</p>
        <p>
          Name <strong>{hotel.name}</strong>
        </p>
        <p>
          Address : <strong>{hotel.address}</strong>
        </p>
        <p>
          Price :{" "}
          <span className="text-red-400">
            Price calculated based on the room you select or allocated. Please
            contact us to know more details.
          </span>
        </p>
      </div>
      <div className="flex flex-col justify-between">
        <Dialog>
          <DialogTrigger>
            <Icons.edit className="text-red-500" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Hotel?</DialogTitle>
              <div className="p-4">
                <div className="flex gap-4">
                  <Input value={q} onChange={(e) => setQ(e.target.value)} />
                  <Button onClick={() => handleSubmit()}>
                    <Icons.search />
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  {data.length &&
                    data.map((hotel, index) => {
                      return (
                        <div
                          onClick={() => setHotel(hotel)}
                          className="border p-2 cursor-pointer"
                          key={index}
                        >
                          <p>Name : {hotel.name}</p>
                          <p>Address : {hotel.address} </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button onClick={() => clearHotel()}>Reset</Button>
      </div>
    </div>
  );
}
