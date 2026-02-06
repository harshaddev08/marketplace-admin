import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const SearchInput = ({
  className,
  containerClassName,
  ...props
}: SearchInputProps) => {
  return (
    <div className={cn("relative flex-1 max-w-md", containerClassName)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        className={cn("pl-10 bg-secondary/50 border-border/50", className)}
        {...props}
      />
    </div>
  );
};
