import { create } from "zustand";
import { Hotel } from "@prisma/client";

interface UserState {
  users: string[];
  setUsers: (users: string[]) => void;
  clearUsers: () => void;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users: string[]) => set((state) => ({ users: [...users] })),
  clearUsers: () => set({ users: [] }),
}));

export { useUserStore };
