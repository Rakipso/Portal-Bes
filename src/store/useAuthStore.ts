import { create } from 'zustand';

export interface UserInfo {
  rut: string;
  fullName: string;
  age: number;
  rshPercentage: number;
  isStudent: boolean;
}

interface AuthState {
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  login: (user: UserInfo) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userInfo: null,
  isAuthenticated: false,
  login: (user) => set({ userInfo: user, isAuthenticated: true }),
  logout: () => set({ userInfo: null, isAuthenticated: false }),
}));
