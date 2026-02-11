"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { providersService } from "@/services/providers.service";
import { toast } from "sonner";
import { Provider } from "@/components/Admin/ProvidersTable/columns";

export const useProviders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "approved"
  >("all");
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["providers", searchQuery, filterStatus, page],
    queryFn: () =>
      providersService.getProviders({
        search: searchQuery,
        status: filterStatus === "all" ? undefined : filterStatus,
        page,
        limit: 10,
      }),
  });

  const providers = data?.providers || [];
  const totalPages = data?.totalPages || 1;

  const pendingCount = providers.filter(
    (p: { isVerified: any; status: string }) =>
      !p.isVerified && p.status !== "rejected",
  ).length;

  const updateStatusMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "approved" | "rejected";
    }) => providersService.updateProviderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast.success("Provider status updated successfully");
      setSelectedProvider(null);
    },
    onError: () => {
      toast.error("Failed to update provider status");
    },
  });

  const handleApprove = (provider: Provider) => {
    updateStatusMutation.mutate({ id: provider.id, status: "approved" });
  };

  const handleReject = (provider: Provider) => {
    updateStatusMutation.mutate({ id: provider.id, status: "rejected" });
  };

  return {
    searchQuery,
    setSearchQuery,
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
  };
};
