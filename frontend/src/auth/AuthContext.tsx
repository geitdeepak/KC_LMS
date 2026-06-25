import { createContext } from "react";
import type { User } from "../types/user";

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;

  login: (
  token: string,
  user: User
) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);