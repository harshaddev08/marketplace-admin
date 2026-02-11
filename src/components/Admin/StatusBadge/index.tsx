import { cn } from "@/lib/utils";

type StatusType =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "verified"
  | "approved"
  | "active"
  | "inactive"
  | "rejected";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  pending: "bg-warning/20 text-warning border-warning/30",
  confirmed: "bg-primary/20 text-primary border-primary/30",
  completed: "bg-success/20 text-success border-success/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
  verified: "bg-success/20 text-success border-success/30",
  approved: "bg-success/20 text-success border-success/30",
  active: "bg-success/20 text-success border-success/30",
  inactive: "bg-muted text-muted-foreground border-border",
  rejected: "bg-destructive/20 text-destructive border-destructive/30",
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status],
        className,
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
