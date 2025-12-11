import { create } from "zustand"; // ✅ must be exact
import { IUser } from "@/interfaces/user.interface";


interface UserState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
