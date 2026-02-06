"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Ban,
  Trash2,
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

const mockUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    role: "User",
    status: "active" as const,
    joinedAt: "Jan 15, 2024",
    bookings: 12,
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    role: "User",
    status: "active" as const,
    joinedAt: "Feb 3, 2024",
    bookings: 8,
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Admin",
    status: "active" as const,
    joinedAt: "Dec 20, 2023",
    bookings: 0,
  },
  {
    id: "4",
    name: "Alex Thompson",
    email: "alex@example.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    role: "User",
    status: "inactive" as const,
    joinedAt: "Mar 8, 2024",
    bookings: 3,
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    role: "User",
    status: "active" as const,
    joinedAt: "Jan 28, 2024",
    bookings: 15,
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage all registered users on the platform.
          </p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground">
          Export Users
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
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Table */}
      <div
        className="glass rounded-xl overflow-hidden opacity-0 animate-fade-in"
        style={{ animationDelay: "200ms" }}
      >
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Bookings</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="transition-colors">
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={
                      user.role === "Admin" ? "text-primary font-medium" : ""
                    }
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <StatusBadge status={user.status} />
                </td>
                <td className="text-muted-foreground">{user.joinedAt}</td>
                <td>{user.bookings}</td>
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
                        <Mail className="w-4 h-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-warning">
                        <Ban className="w-4 h-4" />
                        Ban User
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Delete User
                      </DropdownMenuItem>
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
