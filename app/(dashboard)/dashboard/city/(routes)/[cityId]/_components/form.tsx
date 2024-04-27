"use client";
import * as React from "react";
import { City, State } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { citySchema } from "@/lib/validations/city";
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

interface CityFormProps {
  city: City | null;
  states: State[];
}

type Inputes = z.infer<typeof citySchema>;

export function CityForm({ city, states }: CityFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<Inputes>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      name: city?.name || "",
      value: city?.value || "",
      stateId: city?.stateId || "",
    },
  });

  const endpoint = city ? `/api/city/${city.id}` : "/api/city";
  const method = city ? "PATCH" : "POST";
  const message = city ? "update" : "create";

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

    const city = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    form.reset();

    router.push("/dashboard/city");

    return toast.success(`city ${message} Successfully.`, {
      description: `Your city was ${message} , refer dashboard for furthur updates`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter city name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City Value</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter city value"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stateId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state, index) => (
                      <SelectItem key={index} value={state.id}>
                        {state.name}
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
            <Icons.city className="mr-2 h-4 w-4" />
          )}
          {message} city
        </Button>
      </form>
    </Form>
  );
}
