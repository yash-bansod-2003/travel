"use client";
import * as React from "react";
import { Bus, City, Hotel, Package, Step, Train } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { stepSchema } from "@/lib/validations/step";
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

interface IHotel extends Hotel {
  city: City;
}

interface ITrain extends Train {
  source: City;
  destination: City;
}

interface IBus extends Bus {
  source: City;
  destination: City;
}

interface StepFormProps {
  step: Step | null;
  hotels: IHotel[];
  trains: ITrain[];
  buses: IBus[];
  packages: Package[];
}

type Inputes = z.infer<typeof stepSchema>;

export function StepForm({
  buses,
  hotels,
  step,
  trains,
  packages,
}: StepFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<Inputes>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      hotelId: step?.hotelId ? step?.hotelId : undefined,
      trainId: step?.trainId ? step?.trainId : undefined,
      busId: step?.busId ? step?.busId : undefined,
      order: step?.order ? String(step.order) : "",
      packageId: step?.packageId || "",
      days: step?.days || "",
    },
  });

  const endpoint = step ? `/api/step/${step.id}` : "/api/step";
  const method = step ? "PATCH" : "POST";
  const message = step ? "update" : "create";

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

    const step = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    form.reset();

    router.push("/dashboard/step");

    return toast.success(`step ${message} Successfully.`, {
      description: `Your step was ${message} , refer dashboard for furthur updates`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="grid gap-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter Order number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="packageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Package" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {packages.map((package1, index) => (
                        <SelectItem key={index} value={package1.id}>
                          {`${package1.name}-${package1.duration} (${package1.price})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Days</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter Number of days"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <FormField
              control={form.control}
              name="trainId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Train</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Train" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {trains.map((train, index) => (
                        <SelectItem key={index} value={train.id}>
                          {`${train.name} (${train.source.name} -> ${train.destination.name})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                          {`${hotel.name} (${hotel.city.name})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="busId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bus</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Bus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {buses.map((bus, index) => (
                        <SelectItem key={index} value={bus.id}>
                          {bus.busNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.bus className="mr-2 h-4 w-4" />
          )}
          {message} step
        </Button>
      </form>
    </Form>
  );
}
