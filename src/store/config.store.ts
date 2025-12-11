import { create } from "zustand"; // must be exact


interface Config {
    environment: string
}

interface BotStatus {
    status: string,
    last_trade: string
}

interface ConfigState {
  config: Config | null;
  botStatus: BotStatus | null,
  setConfig: (user: Config | null) => void;
  setBotStatus: (bot: BotStatus | null) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  config: null,
  botStatus: null,
  setConfig: (config) => set({ config }),
  setBotStatus: (botStatus) => set({ botStatus }),

}));
