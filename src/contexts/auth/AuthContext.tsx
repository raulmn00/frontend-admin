import { createContext } from "react";
import { UserModel } from "../../types/models/userModel.ts";

export type AuthContextType = {
  user: UserModel | null;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
