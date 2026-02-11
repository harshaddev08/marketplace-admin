"use client";

import { useMemo } from "react";
import { DataTable } from "@/components/common/DataTable";
import { getColumns, Provider } from "./columns";

interface ProvidersTableProps {
  data: Provider[];
  onViewProfile: (provider: Provider) => void;
  onApprove?: (provider: Provider) => void;
  onReject?: (provider: Provider) => void;
}

export function ProvidersTable({
  data,
  onViewProfile,
  onApprove,
  onReject,
}: ProvidersTableProps) {
  const columns = useMemo(
    () => getColumns({ onViewProfile, onApprove, onReject }),
    [onViewProfile, onApprove, onReject],
  );

  return <DataTable columns={columns} data={data} />;
}
