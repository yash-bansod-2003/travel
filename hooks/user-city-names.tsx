import { create } from "zustand";
import { City } from "@prisma/client";

interface HotelState {
  cities: Set<City>;
  setCity: (city: City) => void;
  removeCity: (id: string) => void;
  setCities: (cities: Set<City>) => void;
  clear: () => void;
}

const useCityNameStore = create<HotelState>((set) => ({
  cities: new Set<City>(),
  setCity: (city: City) =>
    set((state) => {
      const newCities = new Set(state.cities);
      newCities.add(city);
      return { cities: newCities };
    }),
  setCities: (cities: Set<City>) => set({ cities }),
  removeCity: (id: string) =>
    set((state) => {
      const newCities = new Set(state.cities);
      newCities.forEach((city) => {
        if (city.id === id) {
          newCities.delete(city);
        }
      });
      return { cities: newCities };
    }),
  clear: () => set({ cities: new Set() }),
}));

export { useCityNameStore };
