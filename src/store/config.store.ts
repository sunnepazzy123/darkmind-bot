import { create } from "zustand"; // ✅ must be exact


interface Config {
    environment: string
}

interface ConfigState {
  config: Config | null;
  setConfig: (user: Config | null) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  config: null,
  setConfig: (config) => set({ config }),
}));
