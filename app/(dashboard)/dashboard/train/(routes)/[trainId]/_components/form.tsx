"use client";
import * as React from "react";
import { City, Train } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trainSchema } from "@/lib/validations/train";
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

interface TrainFormProps {
  train: Train | null;
  cities: City[];
}

type Inputes = z.infer<typeof trainSchema>;

export function TrainForm({ train, cities }: TrainFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<Inputes>({
    resolver: zodResolver(trainSchema),
    defaultValues: {
      arrivalTime: train?.arrivalTime || "",
      departureTime: train?.departureTime || "",
      destinationId: train?.destinationId || "",
      price: String(train?.price ?? "0") || "0",
      sourceId: train?.sourceId || "",
      trainNumber: train?.trainNumber || "",
      name: train?.name || "",
    },
  });

  const endpoint = train ? `/api/train/${train.id}` : "/api/train";
  const method = train ? "PATCH" : "POST";
  const message = train ? "update" : "create";

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

    const train = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    form.reset();

    router.push("/dashboard/train");

    return toast.success(`train ${message} Successfully.`, {
      description: `Your train was ${message} , refer dashboard for furthur updates`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <FormField
            control={form.control}
            name="trainNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Train Number</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter train number"
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter train name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sourceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>
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
                    {cities.map((city, index) => (
                      <SelectItem key={index} value={city.id}>
                        {city.name}
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
            name="destinationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
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
                    {cities.map((city, index) => (
                      <SelectItem key={index} value={city.id}>
                        {city.name}
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
            name="departureTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure Time</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="HH:MM PM/AM"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrivalTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arrival Time</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="HH:MM PM/AM"
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
                <FormLabel>Price (Per Ticket)</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter train price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.train className="mr-2 h-4 w-4" />
          )}
          {message} train
        </Button>
      </form>
    </Form>
  );
}
