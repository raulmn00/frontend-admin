import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { UserModel } from "../../types/models/userModel.ts";
import { AuthContext } from "./AuthContext";
import { Admin } from "../../types/models/models.ts";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const api = useApi();

  const signin = async (email: string, password: string) => {
    const data: { admin: Admin; access_token: string } = await api.signin(
      email,
      password,
    );
    if (data?.admin && data?.access_token) {
      localStorage.setItem("user", JSON.stringify(data.admin));
      localStorage.setItem("authToken", data.access_token);
      return true;
    }
    return false;
  };

  const signout = async () => {
    console.log("signout está sendo executada.");
    localStorage.setItem("user", "");
    localStorage.setItem("authToken", "");
    await api.logout();
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
