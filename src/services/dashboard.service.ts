import { apiService } from "./api.service";

export interface DashboardStats {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats[]> {
    const response = await apiService.get("/admin/stats");
    return response.data.data;
  },
};
