import type { User } from "./user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;

  user: User;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}