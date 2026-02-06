"use client";

import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Eye,
  Star,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

const mockProviders = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    category: "Plumbing",
    status: "verified" as const,
    rating: 4.8,
    reviews: 124,
    joinedAt: "Jan 10, 2024",
    hourlyRate: 75,
    experience: "10+ years",
    bio: "Professional plumber with over 10 years of experience in residential and commercial plumbing.",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    category: "Cleaning",
    status: "pending" as const,
    rating: 0,
    reviews: 0,
    joinedAt: "Mar 5, 2024",
    hourlyRate: 45,
    experience: "5 years",
    bio: "Experienced house cleaner specializing in deep cleaning and organization.",
  },
  {
    id: "3",
    name: "David Lee",
    email: "david@example.com",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    category: "Electrical",
    status: "verified" as const,
    rating: 4.9,
    reviews: 89,
    joinedAt: "Dec 15, 2023",
    hourlyRate: 85,
    experience: "15 years",
    bio: "Licensed electrician with expertise in home automation and solar installation.",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@example.com",
    category: "Landscaping",
    status: "pending" as const,
    rating: 0,
    reviews: 0,
    joinedAt: "Mar 12, 2024",
    hourlyRate: 55,
    experience: "3 years",
    bio: "Passionate landscaper with a focus on sustainable garden design.",
  },
  {
    id: "5",
    name: "Robert Brown",
    email: "robert@example.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    category: "HVAC",
    status: "verified" as const,
    rating: 4.7,
    reviews: 56,
    joinedAt: "Feb 8, 2024",
    hourlyRate: 90,
    experience: "12 years",
    bio: "HVAC specialist certified in all major heating and cooling systems.",
  },
];

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<
    (typeof mockProviders)[0] | null
  >(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "verified"
  >("all");

  const filteredProviders = mockProviders.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || provider.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const pendingCount = mockProviders.filter(
    (p) => p.status === "pending",
  ).length;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Providers</h1>
          <p className="text-muted-foreground mt-1">
            Manage service providers and verify applications.
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-warning/10 border border-warning/20">
            <span className="text-warning font-medium">
              {pendingCount} pending
            </span>
            <span className="text-sm text-muted-foreground">applications</span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div
        className="glass rounded-xl p-4 flex items-center gap-4 opacity-0 animate-fade-in"
        style={{ animationDelay: "100ms" }}
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("pending")}
            className={
              filterStatus === "pending"
                ? "bg-warning text-warning-foreground"
                : ""
            }
          >
            Pending
          </Button>
          <Button
            variant={filterStatus === "verified" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("verified")}
            className={
              filterStatus === "verified"
                ? "bg-success text-success-foreground"
                : ""
            }
          >
            Verified
          </Button>
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
              <th>Provider</th>
              <th>Category</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Hourly Rate</th>
              <th>Joined</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProviders.map((provider) => (
              <tr key={provider.id} className="transition-colors">
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={provider.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {provider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {provider.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary">
                    {provider.category}
                  </span>
                </td>
                <td>
                  <StatusBadge status={provider.status} />
                </td>
                <td>
                  {provider.rating > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({provider.reviews})
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No reviews</span>
                  )}
                </td>
                <td className="font-medium">${provider.hourlyRate}/hr</td>
                <td className="text-muted-foreground">{provider.joinedAt}</td>
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
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => setSelectedProvider(provider)}
                      >
                        <Eye className="w-4 h-4" />
                        View Profile
                      </DropdownMenuItem>
                      {provider.status === "pending" && (
                        <>
                          <DropdownMenuItem className="gap-2 text-success">
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <XCircle className="w-4 h-4" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Provider Profile Modal */}
      <Dialog
        open={!!selectedProvider}
        onOpenChange={() => setSelectedProvider(null)}
      >
        <DialogContent className="glass border-border max-w-lg">
          <DialogHeader>
            <DialogTitle>Provider Profile</DialogTitle>
          </DialogHeader>
          {selectedProvider && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedProvider.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {selectedProvider.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedProvider.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedProvider.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{selectedProvider.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Hourly Rate</p>
                  <p className="font-medium">
                    ${selectedProvider.hourlyRate}/hr
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{selectedProvider.experience}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={selectedProvider.status} />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Bio</p>
                <p className="text-sm">{selectedProvider.bio}</p>
              </div>

              {selectedProvider.status === "pending" && (
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button className="flex-1 bg-success hover:bg-success/90 gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button variant="destructive" className="flex-1 gap-2">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
