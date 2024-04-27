import { create } from "zustand";
import { Hotel } from "@prisma/client";

interface HotelState {
  hotels: Hotel[];
  setHotel: (hotel: Hotel) => void;
  clearHotel: () => void;
}

const useHotelStore = create<HotelState>((set) => ({
  hotels: [],
  setHotel: (hotel: Hotel) =>
    set((state) => ({ hotels: [...state.hotels, hotel] })),
  clearHotel: () => set({ hotels: [] }),
}));

export default useHotelStore;
