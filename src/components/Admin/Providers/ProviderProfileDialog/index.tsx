"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/Admin/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Provider } from "@/components/Admin/ProvidersTable/columns";

interface ProviderProfileDialogProps {
  provider: Provider | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove?: (provider: Provider) => void;
  onReject?: (provider: Provider) => void;
}

export function ProviderProfileDialog({
  provider,
  open,
  onOpenChange,
  onApprove,
  onReject,
}: ProviderProfileDialogProps) {
  if (!provider) return null;

  const isPending = !provider.isVerified && provider.status !== "rejected";
  const status = (provider.status ||
    (provider.isVerified ? "verified" : "pending")) as
    | "verified"
    | "pending"
    | "rejected";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border max-w-lg">
        <DialogHeader>
          <DialogTitle>Provider Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={provider.avatar || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {provider.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{provider.name}</h3>
              {provider.email && (
                <p className="text-muted-foreground">{provider.email}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {provider.location}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium">{provider.category}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Hourly Rate</p>
              <p className="font-medium">
                {provider.hourlyRate ? `$${provider.hourlyRate}/hr` : "-"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Experience</p>
              <p className="font-medium">{provider.experience} years</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <StatusBadge status={status} />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Reviews</p>
              <p className="font-medium">{provider.reviewsCount}</p>
            </div>
          </div>

          {provider.bio && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Bio</p>
              <p className="text-sm">{provider.bio}</p>
            </div>
          )}

          {provider.services && provider.services.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Services</p>
              <div className="flex flex-wrap gap-2">
                {provider.services.map((service) => (
                  <div
                    key={service._id}
                    className="px-2 py-1 bg-secondary rounded text-xs"
                  >
                    {service.name} (${service.price})
                  </div>
                ))}
              </div>
            </div>
          )}

          {isPending && (
            <div className="flex gap-3 pt-4 border-t border-border">
              {onApprove && (
                <Button
                  className="flex-1 bg-success hover:bg-success/90 gap-2"
                  onClick={() => onApprove(provider)}
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </Button>
              )}
              {onReject && (
                <Button
                  variant="destructive"
                  className="flex-1 gap-2"
                  onClick={() => onReject(provider)}
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
