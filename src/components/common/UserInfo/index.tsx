import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

interface UserInfoProps {
  name: string;
  email: string;
  avatarUrl?: string;
  showEmail?: boolean;
  className?: string;
}

export const UserInfo = ({
  name,
  email,
  avatarUrl,
  showEmail = true,
  className,
}: UserInfoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={
            avatarUrl ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
          }
          alt={name}
        />
        <AvatarFallback className="bg-primary/10 text-primary">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium text-foreground">{name}</p>
        {showEmail && <p className="text-sm text-muted-foreground">{email}</p>}
      </div>
    </div>
  );
};
