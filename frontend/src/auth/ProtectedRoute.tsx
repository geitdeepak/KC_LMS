import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

interface Props {
  children: React.ReactNode;
  role?: string;
}

export const ProtectedRoute = ({
  children,
  role
}: Props) => {
  const auth =
    useContext(AuthContext);

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (
    role &&
    auth.user?.role !== role
  ) {
    return (
      <Navigate
        to="/unauthorized"
      />
    );
  }

  return <>{children}</>;
};