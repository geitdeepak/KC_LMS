import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/user";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {

  const [token, setToken] =
    useState<string | null>(null);

  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {

    const storedToken =
      localStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user");

    if (storedToken && storedUser) {

      setToken(storedToken);

      setUser(
        JSON.parse(storedUser)
      );

    }

  }, []);

  const login = (
    jwtToken: string,
    user: User
  ) => {

    localStorage.setItem(
      "token",
      jwtToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    // NEW
    localStorage.setItem(
      "userId",
      user.id
    );

    // NEW
    localStorage.setItem(
      "role",
      user.role
    );

    setToken(jwtToken);

    setUser(user);

  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");

    setToken(null);
    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};