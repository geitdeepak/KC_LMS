import api from "../api/axios";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../types/auth";

export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {

  const response =
    await api.post<LoginResponse>(
      "/Users/login",
      request
    );

  return response.data;
};

export const register = async (
  request: RegisterRequest
) => {

  const response =
    await api.post(
      "/Users/register",
      request
    );

  return response.data;
};

export const logout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  localStorage.removeItem("role");

  localStorage.removeItem("refreshToken");
};