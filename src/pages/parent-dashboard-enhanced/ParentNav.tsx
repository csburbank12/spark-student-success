
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { parentRoutes } from "@/components/layout/routes/parentRoutes";

// Extract a simplified version of the parent routes for the navigation
export const parentNavLinks = [
  { name: "Child Activity", href: "/child-activity" },
  { name: "Messages", href: "/messages" },
  { name: "Resources", href: "/parent-resources" },
  { name: "Privacy Settings", href: "/privacy-settings" }
];

const ParentNav = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
      <div className="text-sm flex items-center text-muted-foreground">
        <span className="font-medium text-foreground">Parent Dashboard</span>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        {parentNavLinks.map((link, index) => (
          <Button 
            key={index} 
            variant="outline" 
            size="sm" 
            className="text-xs md:text-sm"
            onClick={() => navigate(link.href)}
          >
            {link.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ParentNav;
