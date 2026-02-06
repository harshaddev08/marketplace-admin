import React from "react";

export const statusOptions = [
  { value: "all", label: "All Status" },
  {
    value: "active",
    label: (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-success" />
        Active
      </div>
    ),
  },
  {
    value: "inactive",
    label: (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-muted-foreground" />
        Inactive
      </div>
    ),
  },
];
