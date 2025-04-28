
import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "default" | "lg";
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = "default", className }) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-primary/30 border-t-primary",
        size === "sm" && "h-4 w-4",
        size === "default" && "h-8 w-8",
        size === "lg" && "h-12 w-12",
        className
      )}
    />
  );
};
