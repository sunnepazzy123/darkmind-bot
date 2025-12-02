import { create } from "zustand"; // ✅ must be exact


interface User {
  picture: string;
  email: string,
  last_name: string,
  first_name: string,
  id: string
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
