
import React from "react";
import { NavMenu } from "./navigation/NavMenu";

interface Route {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarNavLinksProps {
  routes: Route[];
  includeUniversalRoutes?: boolean;
}

const SidebarNavLinks: React.FC<SidebarNavLinksProps> = ({ 
  routes,
  includeUniversalRoutes = true 
}) => {
  return <NavMenu routes={routes} />;
};

export default SidebarNavLinks;
