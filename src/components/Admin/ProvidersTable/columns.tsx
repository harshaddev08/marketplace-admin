"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/Admin/StatusBadge";
import { UserInfo, Rating } from "@/components/common";
import { ProviderActions } from "@/components/Admin/Providers";

export type Service = {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isPrimary?: boolean;
};

export interface Provider {
  id: string;
  name: string;
  email?: string;
  avatar?: string | null;
  category: string;
  status?: "approved" | "pending" | "rejected";
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
  joinedAt?: string;
  hourlyRate: number;
  experience: number;
  location: string;
  bio?: string;
  services: Service[];
}

interface ProvidersTableActions {
  onViewProfile: (provider: Provider) => void;
  onApprove?: (provider: Provider) => void;
  onReject?: (provider: Provider) => void;
}

export const getColumns = ({
  onViewProfile,
  onApprove,
  onReject,
}: ProvidersTableActions): ColumnDef<Provider>[] => [
  {
    accessorKey: "name",
    header: "Provider",
    cell: ({ row }) => {
      const provider = row.original;
      return (
        <UserInfo
          name={provider.name}
          email={provider.email}
          avatarUrl={provider.avatar}
          subtext={provider.location}
        />
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary">
        {row.getValue("category")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as "approved" | "pending" | "rejected";
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      const reviews = row.original.reviewsCount;
      return <Rating rating={rating} reviewsCount={reviews} />;
    },
  },
  {
    accessorKey: "hourlyRate",
    header: "Hourly Rate",
    cell: ({ row }) => {
      const rate = row.getValue("hourlyRate");
      return rate ? (
        <span className="font-medium">{`$${rate}/hr`}</span>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: "experience",
    header: "Experience",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue("experience")} years
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <ProviderActions
        provider={row.original}
        onViewProfile={onViewProfile}
        onApprove={onApprove}
        onReject={onReject}
      />
    ),
  },
];
