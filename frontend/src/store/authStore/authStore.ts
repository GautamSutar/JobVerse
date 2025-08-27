// store/authStore.ts or .js
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  role: string | null;
  first_name: string | null;
  last_name: string | null;
  isAuthenticated: boolean;
  login: (userData: Partial<AuthState>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      email: null,
      role: null,
      first_name: null,
      last_name: null,
      isAuthenticated: false,

      login: (userData) => {
        set({
          accessToken: userData.accessToken || null,
          refreshToken: userData.refreshToken || null,
          email: userData.email || null,
          role: userData.role || null,
          first_name: userData.first_name || null,
          last_name: userData.last_name || null,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          email: null,
          role: null,
          first_name: null,
          last_name: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage", 
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) =>
            [
              "accessToken",
              "refreshToken",
              "email",
              "role",
              "first_name",
              "last_name",
              "isAuthenticated",
            ].includes(key)
          )
        ),
    }
  )
);
