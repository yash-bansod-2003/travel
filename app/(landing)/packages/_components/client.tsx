"use client";

import * as React from "react";
import axios from "axios";
import { calculateDateDifference, cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { DisplayCard } from "../../_components/display-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { City, Package, State } from "@prisma/client";
import { useCityNameStore } from "@/hooks/user-city-names";
import { formatCityNames } from "@/lib/utils";
import { useDateRange } from "@/hooks/use-date-range";
import { toast } from "sonner";

interface IPackage extends Package {
  cities: City[];
}

export function PackagesClient() {
  const {
    cities: storeCities,
    clear,
    removeCity,
    setCity,
  } = useCityNameStore();
  const [data, setData] = React.useState<IPackage[]>([]);
  const [cities, setCities] = React.useState<City[]>([]);
  const [states, setStates] = React.useState([]);
  const { date, setDate } = useDateRange();

  async function handleSubmit() {
    if (!date) {
      return toast.error("Please select date range");
    }

    const daysLimit = calculateDateDifference(date);

    if (daysLimit < 3) {
      return toast.error("Date range", {
        description: "no of days must be greater than 3 days",
      });
    }

    if (Array.from(storeCities).length < 2) {
      return toast.error("City election", {
        description: "please select atleast 2 cities to travel",
      });
    }

    const response = await axios.get(
      `/api/package?q=${formatCityNames(Array.from(storeCities))}&limit=${daysLimit}`,
    );
    if (response.data) {
      setData(response.data);
    }
  }

  async function getStates() {
    const response = await axios.get(`/api/state`);

    if (response.data) {
      setStates(response.data);
    }
  }

  async function getCities(stateId: string) {
    const response = await axios.get(`/api/city?stateId=${stateId}`);

    if (response.data) {
      setCities(response.data);
    }
  }

  React.useEffect(() => {
    getStates();
  }, []);

  return (
    <div>
      <div className="w-full">
        <div className="w-full grid md:grid-cols-4">
          <div className="grid gap-4">
            <Label htmlFor="message-2">Explore State</Label>
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
            <p className="text-sm text-muted-foreground">
              Your cities will display based on state you choose
            </p>
          </div>
          <div className="grid gap-4">
            <Label htmlFor="message-2">Pick a date range</Label>
            <div className={cn("grid gap-2")}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <Icons.calendar className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-sm text-muted-foreground">
              Your journy will start from a date you choose
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 my-6">
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
        <Button onClick={handleSubmit} size="lg" className="my-3">
          Search Packages
          <Icons.search className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-10 my-4">
        {data.length > 0 ? (
          data.map((package1, index) => (
            <DisplayCard key={index} package1={package1} />
          ))
        ) : (
          <h1 className="text-3xl font-bold">
            No Package Found , Try to increse no of days to enjoy.
          </h1>
        )}
      </div>
    </div>
  );
}
