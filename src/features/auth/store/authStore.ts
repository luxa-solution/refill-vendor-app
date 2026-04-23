import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthFlowState = {
  isAuthenticated: boolean;
  vendorProfileComplete: boolean;
  setAuthenticated: (status: boolean) => void;
  setVendorProfileComplete: (status: boolean) => void;
  resetAuthFlow: () => void;
};

export const useAuthStore = create<AuthFlowState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      vendorProfileComplete: false,
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      setVendorProfileComplete: (status) =>
        set({ vendorProfileComplete: status }),
      resetAuthFlow: () =>
        set({ isAuthenticated: false, vendorProfileComplete: false }),
    }),
    {
      name: "auth-flow-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
