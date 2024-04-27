"use client";
import * as React from "react";
import { City, Package, State } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { packageSchema } from "@/lib/validations/package";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { FileUpload } from "@/components/file-uploader";
import { Label } from "@/components/ui/label";
import { useCityStore } from "@/hooks/use-city";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

interface IPackage extends Package {
  cities: City[];
}

interface PackageFormProps {
  package1: IPackage | null;
  cities: City[];
}

type Inputes = z.infer<typeof packageSchema>;

export function PackageForm({ package1 }: PackageFormProps) {
  const {
    cities: storeCities,
    setCities: setStoreCities,
    setCity,
    removeCity,
    clear,
  } = useCityStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState<City[]>([]);

  React.useEffect(() => {
    setStoreCities(new Set(package1?.cities));
    getStates();
  }, []);

  async function getCities(stateId: string) {
    const response = await axios.get(`/api/city?stateId=${stateId}`);

    if (response.data) {
      setCities(response.data);
    }
  }

  async function getStates() {
    const response = await axios.get(`/api/state`);

    if (response.data) {
      setStates(response.data);
    }
  }

  const form = useForm<Inputes>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: package1?.name || "",
      description: package1?.description || "",
      price: package1?.price ? String(package1?.price) : "",
      image: package1?.image || "",
      duration: package1?.price ? String(package1?.duration) : "",
    },
  });

  const endpoint = package1 ? `/api/package/${package1.id}` : "/api/package";
  const method = package1 ? "PATCH" : "POST";
  const message = package1 ? "update" : "create";

  async function onSubmit(values: Inputes) {
    setIsLoading(true);

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, cities: Array.from(storeCities) }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast.error("Something went wrong.", {
        description: `Your package was not ${message}. Please try again.`,
      });
    }

    const package1 = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    form.reset();

    router.push("/dashboard/package");

    return toast.success(`package ${message} Successfully.`, {
      description: `Your package was ${message} , refer dashboard for furthur updates`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileUpload
                    endpoint="imageUploader"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter Package Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter Package Description"
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
                  <FormLabel>Estimated price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (Days)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter Duration"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="message-2">Select State</Label>
            <Select
              onValueChange={async (e) => {
                await getCities(e);
                clear();
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>States</SelectLabel>
                  {states.map((state: State) => (
                    <SelectItem key={state.id} value={state.id}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid w-full gap-4">
              <Label htmlFor="message-2">Select Cities</Label>
              <div className="flex gap-4 min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {cities.map((city) => (
                  <div
                    key={city.id}
                    className={buttonVariants({ variant: "outline" })}
                    onClick={() => setCity(city)}
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid w-full gap-4">
              <Label htmlFor="message-2">Selected Cities</Label>
              <div className="flex gap-4 min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {Array.from(storeCities).map((city) => (
                  <div
                    key={city.id}
                    className={buttonVariants()}
                    onClick={() => removeCity(city.id)}
                  >
                    {city.name}
                    <Icons.close className="ml-2 h-4 w-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.package className="mr-2 h-4 w-4" />
          )}
          {message} package
        </Button>
      </form>
    </Form>
  );
}
