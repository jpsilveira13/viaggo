/**
 * Viaggo - Auth Store
 */
import { create } from "zustand";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User) => void;
  completeOnboarding: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isOnboarded: false,
  isLoading: false,

  setUser: (user) => set({ user, isAuthenticated: true }),

  completeOnboarding: () => set({ isOnboarded: true }),

  signOut: () => set({ user: null, isAuthenticated: false }),
}));
