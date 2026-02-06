import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal, Mail, Ban, Trash2 } from "lucide-react";
import { User } from "@/services/user.service";

interface UserActionsProps {
  user: User;
}

export const UserActions = ({ user }: UserActionsProps) => {
  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border">
          <DropdownMenuItem
            className="gap-2"
            onClick={() => console.log("Send email to", user.email)}
          >
            <Mail className="w-4 h-4" />
            Send Email
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 text-warning"
            onClick={() => console.log("Ban user", user._id)}
          >
            <Ban className="w-4 h-4" />
            Ban User
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 text-destructive"
            onClick={() => console.log("Delete user", user._id)}
          >
            <Trash2 className="w-4 h-4" />
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
