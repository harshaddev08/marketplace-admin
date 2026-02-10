"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const getBreadcrumbs = (pathname: string) => {
  const paths = pathname.split("/").filter(Boolean);
  return paths.map((path, index) => ({
    label: path.charAt(0).toUpperCase() + path.slice(1),
    isLast: index === paths.length - 1,
  }));
};

export const AdminHeader = () => {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="glass-subtle sticky top-0 z-40 px-8 py-4 flex items-center justify-between">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className={
                crumb.isLast
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }
            >
              {crumb.label}
            </span>
            {!crumb.isLast && (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-64 pl-10 bg-secondary/50 border-border/50 focus:border-primary/50"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>

        {/* Profile & Logout */}
        <div className="flex items-center gap-3 pl-4 border-l border-border/50">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@market.com</p>
          </div>
          <Avatar className="w-10 h-10 border-2 border-primary/20">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
            <AvatarFallback className="bg-primary/10 text-primary">
              AU
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
