"use client";
import * as React from "react";
import { State } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { stateSchema } from "@/lib/validations/state";
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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";

interface StateFormProps {
  state: State | null;
}

type Inputes = z.infer<typeof stateSchema>;

export function StateForm({ state }: StateFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<Inputes>({
    resolver: zodResolver(stateSchema),
    defaultValues: {
      name: state?.name || "",
      value: state?.value || "",
    },
  });

  const endpoint = state ? `/api/state/${state.id}` : "/api/state";
  const method = state ? "PATCH" : "POST";
  const message = state ? "update" : "create";

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

    const state = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    form.reset();

    router.push("/dashboard/state");

    return toast.success(`state ${message} Successfully.`, {
      description: `Your state was ${message} , refer dashboard for furthur updates`,
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
                <FormLabel>State Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter state name"
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
                <FormLabel>State Value</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter state value"
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
            <Icons.state className="mr-2 h-4 w-4" />
          )}
          {message} state
        </Button>
      </form>
    </Form>
  );
}
