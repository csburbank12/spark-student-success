
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  onClick?: () => void;
}

export const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
  onClick,
}: StatCardProps) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all", 
        onClick && "cursor-pointer hover:shadow-md card-hover", 
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && trendValue && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium",
                trend === "up" && "text-teal-500",
                trend === "down" && "text-rose-500"
              )}
            >
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trend === "neutral" && "→"}
              {" "}
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
