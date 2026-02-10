"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Layers,
  Settings,
  LogOut,
  ChevronLeft,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AuthService } from "@/services/auth.service";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Users", path: "/users" },
  { icon: UserCheck, label: "Providers", path: "/providers" },
  { icon: Calendar, label: "Bookings", path: "/bookings" },
  { icon: Layers, label: "Services", path: "/services" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "glass fixed left-0 top-0 h-screen z-50 flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-border/50">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg gradient-text">LocalPro</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== "/admin" && pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "sidebar-link group relative overflow-hidden",
                isActive && "active",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {!collapsed && <span className="font-medium">{item.label}</span>}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-4 py-6 border-t border-border/50 space-y-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-link w-full"
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 transition-transform duration-300",
              collapsed && "rotate-180",
            )}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
        <button
          onClick={() => AuthService.logout()}
          className="sidebar-link w-full text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
