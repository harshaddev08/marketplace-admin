import { apiService } from "./api.service";
import { Provider } from "@/components/Admin/ProvidersTable/columns";

export interface GetProvidersParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface ProvidersResponse {
  providers: Provider[];
  total: number;
  page: number;
  totalPages: number;
}

export const providersService = {
  getProviders: async (params: GetProvidersParams) => {
    const response = await apiService.get<any>("/admin/providers", {
      params,
    });
    // Unpack ApiResponse: { success: true, message: "...", data: { providers: [], ... } }
    return response.data.data;
  },

  getProvider: async (id: string) => {
    const response = await apiService.get<any>(`/admin/providers/${id}`);
    return response.data.data as Provider;
  },

  updateProviderStatus: async (
    id: string,
    status: "approved" | "rejected" | "pending",
  ) => {
    const response = await apiService.patch(`/admin/providers/${id}/status`, {
      status,
    });
    return response.data.data;
  },
};
