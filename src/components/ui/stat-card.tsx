
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
        "overflow-hidden transition-all relative border-t-4", 
        onClick && "cursor-pointer hover:shadow-lg hover:-translate-y-1",
        trend === "up" && "border-t-teal-500",
        trend === "down" && "border-t-rose-500",
        !trend && "border-t-primary",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-card to-card/50 opacity-50" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && (
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center",
            trend === "up" && "text-teal-500 bg-teal-50",
            trend === "down" && "text-rose-500 bg-rose-50",
            !trend && "text-primary bg-primary-50"
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="relative z-10">
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
