"use client";

import { Users, UserCheck, Calendar, DollarSign } from "lucide-react";
import { StatsCard } from "@/components/Admin/StatsCard";
import { RevenueChart } from "@/components/Admin/Charts/RevenueChart";
import { BookingsChart } from "@/components/Admin/Charts/BookingsChart";
import { RecentActivity } from "@/components/Admin/RecentActivity";

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5% from last month",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Active Providers",
    value: "1,234",
    change: "+8.2% from last month",
    changeType: "positive" as const,
    icon: UserCheck,
  },
  {
    title: "Total Bookings",
    value: "45,678",
    change: "+23.1% from last month",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Total Revenue",
    value: "$892,450",
    change: "+18.7% from last month",
    changeType: "positive" as const,
    icon: DollarSign,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="opacity-0 animate-fade-in">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Here&apos;s existing content...</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} delay={index * 100} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <BookingsChart />
      </div>

      {/* Recent activity */}
      <RecentActivity />
    </div>
  );
}
