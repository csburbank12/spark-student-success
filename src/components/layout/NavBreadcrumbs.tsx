
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBreadcrumbLabel } from "@/utils/navigationUtils";

interface BreadcrumbProps {
  path: string;
  className?: string;
}

export const NavBreadcrumbs: React.FC<BreadcrumbProps> = ({ path, className }) => {
  const segments = path.split("/").filter(Boolean);
  
  // Skip rendering if we're on the root path
  if (segments.length === 0) {
    return null;
  }
  
  // Build full paths for each segment
  const breadcrumbs = segments.map((segment, index) => {
    const fullPath = `/${segments.slice(0, index + 1).join("/")}`;
    return { segment, fullPath };
  });

  // Add home as the first breadcrumb
  const allBreadcrumbs = [{ segment: "home", fullPath: "/" }, ...breadcrumbs];

  return (
    <nav
      className={cn(
        "flex items-center text-sm text-muted-foreground",
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {allBreadcrumbs.map((crumb, index) => {
          const isLast = index === allBreadcrumbs.length - 1;
          const label = getBreadcrumbLabel(crumb.segment);
          
          return (
            <React.Fragment key={crumb.fullPath}>
              {index > 0 && (
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4" />
                </li>
              )}
              <li>
                {isLast ? (
                  <span className="font-medium text-foreground">{label}</span>
                ) : (
                  <Link
                    to={crumb.fullPath}
                    className="hover:text-foreground hover:underline transition-colors"
                  >
                    {index === 0 ? <Home className="h-4 w-4" /> : label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
