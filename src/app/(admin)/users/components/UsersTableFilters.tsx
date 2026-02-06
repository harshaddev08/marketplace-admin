import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SearchInput, CommonSelect } from "@/components/common";
import { statusOptions } from "@/utils/constants";
import { useRoles } from "@/hooks/useRoles";

interface UsersTableFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  clearFilters: () => void;
}

export const UsersTableFilters = ({
  searchQuery,
  setSearchQuery,
  status,
  setStatus,
  role,
  setRole,
  clearFilters,
}: UsersTableFiltersProps) => {
  const { data: roles = [] } = useRoles();

  const roleOptions = [
    { value: "all", label: "All Roles" },
    ...roles.map((r) => ({
      value: r,
      label: (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          {r.charAt(0).toUpperCase() + r.slice(1)}
        </div>
      ),
    })),
  ];

  const activeFiltersCount =
    (status !== "all" ? 1 : 0) + (role !== "all" ? 1 : 0);

  return (
    <>
      <div
        className="glass rounded-xl p-4 flex items-center gap-4 opacity-0 animate-fade-in"
        style={{ animationDelay: "100ms" }}
      >
        <SearchInput
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <CommonSelect
          value={status}
          onValueChange={setStatus}
          options={statusOptions}
          placeholder="Status"
        />

        <CommonSelect
          value={role}
          onValueChange={setRole}
          options={roleOptions}
          placeholder="Role"
        />

        {(activeFiltersCount > 0 || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
            Clear filters
          </Button>
        )}
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {status !== "all" && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              Status: {status}
              <button
                onClick={() => setStatus("all")}
                className="ml-0.5 hover:text-primary-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {role !== "all" && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              Role: {role}
              <button
                onClick={() => setRole("all")}
                className="ml-0.5 hover:text-primary-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </>
  );
};
