import { Navigate } from "react-router-dom";
export const RequireAuth = ({ children }) => {
  const user: string = localStorage.getItem("user");
  const token: string = localStorage.getItem("authToken");

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  return children;
};
