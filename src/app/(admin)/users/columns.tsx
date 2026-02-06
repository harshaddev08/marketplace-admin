"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/services/user.service";
import { UserInfo, UserActions } from "@/components/common";
import { StatusBadge } from "@/components/Admin/StatusBadge";
import { Badge } from "@/components/ui/Badge";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return <UserInfo name={user.name} email={user.email} />;
    },
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.roles.map((role) => (
          <Badge
            key={role}
            variant={role === "admin" ? "default" : "secondary"}
            className="capitalize"
          >
            {role}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "isVerified",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.isVerified ? "active" : "inactive"} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
