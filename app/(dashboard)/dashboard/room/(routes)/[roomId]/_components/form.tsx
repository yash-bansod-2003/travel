"use client";
import * as React from "react";
import { Hotel, Room, Train } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { roomSchema } from "@/lib/validations/room";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";

interface RoomFormProps {
  room: Room | null;
  hotels: Hotel[];
}

type Inputes = z.infer<typeof roomSchema>;

export function RoomForm({ room, hotels }: RoomFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<Inputes>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      capacity: room?.capacity ? String(room.capacity) : "",
      hotelId: room?.hotelId ? room.hotelId : "",
      price: room?.price ? String(room.price) : "",
      roomNumber: room?.roomNumber ? room.roomNumber : "",
      name: room?.name || "",
    },
  });

  const endpoint = room ? `/api/room/${room.id}` : "/api/room";
  const method = room ? "PATCH" : "POST";
  const message = room ? "update" : "create";

  async function onSubmit(values: Inputes) {
    setIsLoading(true);

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast.error("Something went wrong.", {
        description: `Your post was not ${message}. Please try again.`,
      });
    }

    const room = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    form.reset();

    router.push("/dashboard/room");

    return toast.success(`room ${message} Successfully.`, {
      description: `Your room was ${message} , refer dashboard for furthur updates`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <FormField
            control={form.control}
            name="roomNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Number</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter room number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter room name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter source station"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter destination station"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hotelId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Hotel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hotels.map((hotel, index) => (
                      <SelectItem key={index} value={hotel.id}>
                        {hotel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.bus className="mr-2 h-4 w-4" />
          )}
          {message} room
        </Button>
      </form>
    </Form>
  );
}
