import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal, Eye, CheckCircle, XCircle } from "lucide-react";
import { Provider } from "@/components/Admin/ProvidersTable/columns";

interface ProviderActionsProps {
  provider: Provider;
  onViewProfile?: (provider: Provider) => void;
  onApprove?: (provider: Provider) => void;
  onReject?: (provider: Provider) => void;
}

export const ProviderActions = ({
  provider,
  onViewProfile,
  onApprove,
  onReject,
}: ProviderActionsProps) => {
  const isPending = !provider.isVerified && provider.status !== "rejected";

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border">
          {onViewProfile && (
            <DropdownMenuItem
              className="gap-2"
              onClick={() => onViewProfile(provider)}
            >
              <Eye className="w-4 h-4" />
              View Profile
            </DropdownMenuItem>
          )}
          {isPending && (
            <>
              {onApprove && (
                <DropdownMenuItem
                  className="gap-2 text-success"
                  onClick={() => onApprove(provider)}
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </DropdownMenuItem>
              )}
              {onReject && (
                <DropdownMenuItem
                  className="gap-2 text-destructive"
                  onClick={() => onReject(provider)}
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </DropdownMenuItem>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
