
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export const NavBreadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);

  // Skip breadcrumbs on root path
  if (pathnames.length === 0) {
    return null;
  }

  // Format path segments to be more readable
  const formatPathname = (pathname: string) => {
    return pathname
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
        </li>
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={pathname} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              {isLast ? (
                <span className="ml-1 text-sm font-medium text-primary">
                  {formatPathname(pathname)}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="ml-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {formatPathname(pathname)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default NavBreadcrumbs;
