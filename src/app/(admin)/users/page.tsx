"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { DataTable, Pagination } from "@/components/common";
import { useUsers } from "@/hooks/useUsers";
import { useDebounce } from "@/hooks/useDebounce";
import { columns } from "./columns";
import { UsersTableFilters } from "./components/UsersTableFilters";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const {
    data,
    isLoading,
    error,
    setPage,
    setSearch,
    role,
    setRole,
    status,
    setStatus,
  } = useUsers();

  const clearFilters = () => {
    setSearch("");
    setSearchQuery("");
    setRole("all");
    setStatus("all");
    setPage(1);
  };

  // Sync debounced search query with hook
  useEffect(() => {
    setSearch(debouncedSearchQuery);
    setPage(1); // Reset to first page on search
  }, [debouncedSearchQuery, setSearch, setPage]);

  const users = data?.users || [];
  const pagination = data?.pagination;

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-destructive">
        Failed to load users.
      </div>
    );
  }

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
      <UsersTableFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        status={status}
        setStatus={setStatus}
        role={role}
        setRole={setRole}
        clearFilters={clearFilters}
      />

      {/* Results Summary */}
      <div
        className="flex items-center justify-between text-sm opacity-0 animate-fade-in"
        style={{ animationDelay: "150ms" }}
      >
        <span className="text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{users.length}</span> of{" "}
          <span className="font-medium text-foreground">
            {pagination?.total || 0}
          </span>{" "}
          users
        </span>
      </div>

      {/* Table */}
      <div
        className="glass rounded-xl overflow-hidden opacity-0 animate-fade-in"
        style={{ animationDelay: "200ms" }}
      >
        <DataTable columns={columns} data={users} />

        {pagination && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
