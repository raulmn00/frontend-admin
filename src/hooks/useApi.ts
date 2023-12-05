import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002/",
});

export const useApi = () => ({
  signin: async (email: string, password: string) => {
    try {
      const response = await api.post("/login", { email, password });
      return response.data;
    } catch (e) {}
  },
  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
});
