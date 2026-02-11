"use client";

import { useEffect, useState } from "react";
import { ProvidersTable } from "@/components/Admin/ProvidersTable";
import {
  ProviderFilters,
  ProviderProfileDialog,
} from "@/components/Admin/Providers";
import { Loader2 } from "lucide-react";
import { Pagination } from "@/components/common/Pagination";
import { useProviders } from "@/hooks/useProviders";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    setSearchQuery: setSearch,
    selectedProvider,
    setSelectedProvider,
    filterStatus,
    setFilterStatus,
    page,
    setPage,
    providers,
    totalPages,
    pendingCount,
    isLoading,
    isError,
    handleApprove,
    handleReject,
  } = useProviders();

  // Sync debounced search query with hook
  useEffect(() => {
    setSearch(debouncedSearchQuery);
    setPage(1); // Reset to first page on search
  }, [debouncedSearchQuery, setSearch, setPage]);

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
      <ProviderFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Table */}
      <div
        className="glass rounded-xl overflow-hidden opacity-0 animate-fade-in"
        style={{ animationDelay: "200ms" }}
      >
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="h-64 flex items-center justify-center text-destructive">
            Failed to load providers.
          </div>
        ) : (
          <ProvidersTable
            data={providers}
            onViewProfile={setSelectedProvider}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      {/* Provider Profile Modal */}
      <ProviderProfileDialog
        provider={selectedProvider}
        open={!!selectedProvider}
        onOpenChange={(open) => !open && setSelectedProvider(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
