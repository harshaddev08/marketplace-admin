"use client";

import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  Eye,
  XCircle,
  Calendar,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/Admin/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

const mockBookings = [
  {
    id: "BK-001",
    customer: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    provider: {
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    },
    service: "Plumbing Repair",
    date: "Mar 15, 2024",
    time: "10:00 AM",
    status: "pending" as BookingStatus,
    price: 150,
  },
  {
    id: "BK-002",
    customer: {
      name: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    provider: {
      name: "Maria Garcia",
    },
    service: "House Cleaning",
    date: "Mar 14, 2024",
    time: "2:00 PM",
    status: "confirmed" as BookingStatus,
    price: 90,
  },
  {
    id: "BK-003",
    customer: {
      name: "Emily Davis",
    },
    provider: {
      name: "David Lee",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    },
    service: "Electrical Work",
    date: "Mar 13, 2024",
    time: "9:00 AM",
    status: "completed" as BookingStatus,
    price: 255,
  },
  {
    id: "BK-004",
    customer: {
      name: "Alex Thompson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    },
    provider: {
      name: "Emma Wilson",
    },
    service: "Garden Maintenance",
    date: "Mar 12, 2024",
    time: "11:00 AM",
    status: "cancelled" as BookingStatus,
    price: 110,
  },
  {
    id: "BK-005",
    customer: {
      name: "Lisa Wang",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
    provider: {
      name: "Robert Brown",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    },
    service: "HVAC Maintenance",
    date: "Mar 16, 2024",
    time: "3:00 PM",
    status: "confirmed" as BookingStatus,
    price: 180,
  },
];

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | BookingStatus>(
    "all",
  );

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || booking.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all platform bookings.
          </p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground">
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <div
        className="glass rounded-xl p-4 flex items-center gap-4 opacity-0 animate-fade-in"
        style={{ animationDelay: "100ms" }}
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
        <div className="flex items-center gap-2">
          {(
            ["all", "pending", "confirmed", "completed", "cancelled"] as const
          ).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="glass rounded-xl overflow-hidden opacity-0 animate-fade-in"
        style={{ animationDelay: "200ms" }}
      >
        <table className="data-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Provider</th>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Price</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="transition-colors">
                <td className="font-mono text-sm text-primary">{booking.id}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={booking.customer.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {booking.customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{booking.customer.name}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={booking.provider.avatar} />
                      <AvatarFallback className="bg-secondary text-xs">
                        {booking.provider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{booking.provider.name}</span>
                  </div>
                </td>
                <td>{booking.service}</td>
                <td>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {booking.time}
                    </span>
                  </div>
                </td>
                <td>
                  <StatusBadge status={booking.status} />
                </td>
                <td className="font-semibold">${booking.price}</td>
                <td className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-card border-border"
                    >
                      <DropdownMenuItem className="gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </DropdownMenuItem>
                      {booking.status !== "completed" &&
                        booking.status !== "cancelled" && (
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <XCircle className="w-4 h-4" />
                            Cancel Booking
                          </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
