"use client";

import { SearchInput } from "@/components/common";
import { Button } from "@/components/ui/Button";

interface ProviderFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: "all" | "pending" | "approved";
  setFilterStatus: (status: "all" | "pending" | "approved") => void;
}

export function ProviderFilters({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}: ProviderFiltersProps) {
  return (
    <div
      className="glass rounded-xl p-4 flex items-center gap-4 opacity-0 animate-fade-in"
      style={{ animationDelay: "100ms" }}
    >
      <SearchInput
        placeholder="Search providers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
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
          variant={filterStatus === "approved" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterStatus("approved")}
          className={
            filterStatus === "approved"
              ? "bg-success text-success-foreground"
              : ""
          }
        >
          Approved
        </Button>
      </div>
    </div>
  );
}
