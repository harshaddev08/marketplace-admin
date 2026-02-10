"use client";

import {
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  LucideIcon,
} from "lucide-react";
import { StatsCard } from "@/components/Admin/StatsCard";
import { RecentActivity } from "@/components/Admin/RecentActivity";
import { Loader } from "@/components/common";
import { useQuery } from "@tanstack/react-query";
import { dashboardService, DashboardStats } from "@/services/dashboard.service";
import { BookingsChart, RevenueChart } from "@/components";

const iconMap: Record<string, LucideIcon> = {
  Users,
  UserCheck,
  Calendar,
  DollarSign,
};

export default function DashboardPage() {
  const { data: dashboardStats, isLoading } = useQuery<DashboardStats[]>({
    queryKey: ["dashboard", "stats"],
    queryFn: dashboardService.getStats,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="opacity-0 animate-fade-in">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Here&apos;s existing content...</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats?.map((stat, index) => {
          const IconComponent = iconMap[stat.icon] || Users; // Fallback to Users icon
          return (
            <StatsCard
              key={stat.title}
              {...stat}
              icon={IconComponent}
              delay={index * 100}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />{" "}
        </div>
        <BookingsChart />
      </div>
      {/* Recent activity */}
      <RecentActivity />
    </div>
  );
}
