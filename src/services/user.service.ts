import { apiService } from "./api.service";

export interface User {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface GetUsersResponse {
  users: User[];
  pagination: Pagination;
}

export const userService = {
  getUsers: async (params: {
    page: number;
    limit: number;
    search?: string;
    role?: string;
    isVerified?: boolean;
  }) => {
    const response = await apiService.get<{ data: GetUsersResponse }>(
      "/users",
      { params },
    );
    return response.data.data;
  },

  getRoles: async () => {
    const response = await apiService.get<{ data: string[] }>("/users/roles");
    return response.data.data;
  },
};
