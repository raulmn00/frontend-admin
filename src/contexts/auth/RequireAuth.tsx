import { Navigate } from "react-router-dom";
export const RequireAuth = ({ children }) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("authToken");

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  return children;
};
