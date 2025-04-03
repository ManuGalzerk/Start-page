import React from "react";
import { cn } from "@/lib/utils";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassContainer({ children, className }: GlassContainerProps) {
  return (
    <div
      className={cn(
        "bg-opacity-25 backdrop-blur-md border border-white border-opacity-10",
        className
      )}
    >
      {children}
    </div>
  );
}

export function GlassInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "bg-opacity-40 backdrop-blur-sm border border-white border-opacity-10 focus:outline-none focus:ring-2 focus:ring-neon-purple transition-all",
        className
      )}
      {...props}
    />
  );
}

export function GlassSelect({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "bg-opacity-40 backdrop-blur-sm border border-white border-opacity-10 focus:outline-none focus:ring-2 focus:ring-neon-purple transition-all",
        className
      )}
      {...props}
    />
  );
}

export function GlassButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "bg-opacity-25 backdrop-blur-md border border-white border-opacity-10 hover:bg-white hover:bg-opacity-10 transition-all",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
