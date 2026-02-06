"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

const mockServices = [
  {
    id: "1",
    name: "Plumbing",
    description: "Water systems, pipes, and fixtures repair and installation",
    providers: 45,
    bookings: 1234,
    revenue: 185100,
    icon: "🔧",
  },
  {
    id: "2",
    name: "Electrical",
    description: "Electrical wiring, outlets, and appliance installation",
    providers: 38,
    bookings: 987,
    revenue: 147750,
    icon: "⚡",
  },
  {
    id: "3",
    name: "Cleaning",
    description: "House cleaning, deep cleaning, and organization services",
    providers: 82,
    bookings: 2456,
    revenue: 122800,
    icon: "🧹",
  },
  {
    id: "4",
    name: "HVAC",
    description: "Heating, ventilation, and air conditioning services",
    providers: 28,
    bookings: 567,
    revenue: 141750,
    icon: "❄️",
  },
  {
    id: "5",
    name: "Landscaping",
    description: "Garden design, lawn care, and outdoor maintenance",
    providers: 35,
    bookings: 789,
    revenue: 78900,
    icon: "🌿",
  },
  {
    id: "6",
    name: "Painting",
    description: "Interior and exterior painting and wall treatments",
    providers: 42,
    bookings: 654,
    revenue: 98100,
    icon: "🎨",
  },
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = mockServices.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground mt-1">
            Manage service categories and offerings.
          </p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      {/* Search */}
      <div
        className="glass rounded-xl p-4 opacity-0 animate-fade-in"
        style={{ animationDelay: "100ms" }}
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <div
            key={service.id}
            className="glass rounded-xl p-6 card-glow opacity-0 animate-fade-in"
            style={{ animationDelay: `${200 + index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.providers} providers
                  </p>
                </div>
              </div>
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
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {service.description}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
              <div>
                <p className="text-2xl font-bold">
                  {service.bookings.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Total Bookings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  ${(service.revenue / 1000).toFixed(1)}k
                </p>
                <p className="text-xs text-muted-foreground">Revenue</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
