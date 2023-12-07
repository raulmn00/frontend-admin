import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3002/",
});

export const useApi = () => ({
  signin: async (email: string, password: string) => {
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
  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
});
