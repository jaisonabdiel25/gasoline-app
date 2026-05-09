import { create } from "zustand";

type UserStore = {
  userUrl: string | null;
  setImageUrl: (url: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userUrl: null,
  setImageUrl: (url: string) => set({ userUrl: url }),
}));
