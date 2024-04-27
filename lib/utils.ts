import { City, Package } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatArrayToString(arr: string[]) {
  return arr.join(",");
}

export function formatCityNames(cities: City[]): string {
  return cities.map((city) => city.name).join(",");
}

interface IPackage extends Package {
  cities: City[];
}

export function getUniquePackages(packages: IPackage[]) {
  const uniquePackages: IPackage[] = [];
  const seenNames: Record<string, boolean> = {};

  packages
    .slice()
    .sort((a, b) => b.price - a.price)
    .forEach((package1) => {
      if (!seenNames[package1.name]) {
        uniquePackages.push(package1);
        seenNames[package1.name] = true;
      }
    });

  return uniquePackages;
}

export function calculateDateDifference({ to, from }: DateRange): number {
  if (!to || !from) {
    return 0;
  }
  const timeDifference: number = to.getTime() - from.getTime();
  const differenceInDays: number = Math.ceil(
    timeDifference / (1000 * 60 * 60 * 24),
  );
  return differenceInDays;
}
