import React from "react";
import { ShieldCheck } from "lucide-react";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const AuthCard = ({
  children,
  title,
  description,
  icon = <ShieldCheck className="w-8 h-8 text-primary" />,
}: AuthCardProps) => {
  return (
    <div className="w-full max-w-md bg-card/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8 text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center rotate-3 hover:rotate-6 transition-transform duration-300 ring-1 ring-primary/20">
          {icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm mt-2">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};
