import { toast } from "react-toastify";
import { Admin } from "../types/models/models.ts";
import api from "../utils/api.ts";

export const useApi = () => ({
  signin: async (
    email: string,
    password: string,
  ): Promise<{ admin: Admin; access_token: string }> => {
    try {
      const response = await api.post("/admin/login", { email, password });
      return response.data;
    } catch (e) {
      toast.error(e.response.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    }
  },
  logout: async (): Promise<void> => {
    const response = await api.post("/logout");
    return response.data;
  },
});
