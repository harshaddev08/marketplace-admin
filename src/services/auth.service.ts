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
};
