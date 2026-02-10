import Cookies from "js-cookie";
import { apiService } from "./api.service";

interface LoginCredentials {
  email: string;
  password: string;
}

export const AuthService = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiService.post("/auth/login", credentials);
    return response.data.data;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  },

  getMe: async () => {
    const response = await apiService.get("/auth/me");
    return response.data.data;
  },
};
