
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';

// Updated parent nav links with active state logic
export const parentNavLinks = [
  { name: "Dashboard", href: "/parent-dashboard-enhanced" },
  { name: "Child Activity", href: "/child-activity" },
  { name: "Messages", href: "/messages" },
  { name: "Resources", href: "/parent-resources" },
  { name: "Privacy Settings", href: "/privacy-settings" }
];

const ParentNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
      <div className="text-sm flex items-center text-muted-foreground">
        <span className="font-medium text-foreground">Parent Dashboard</span>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        {parentNavLinks.map((link, index) => {
          const isActive = location.pathname === link.href;
          return (
            <Button 
              key={index} 
              variant={isActive ? "default" : "outline"} 
              size="sm" 
              className={`text-xs md:text-sm ${isActive ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => navigate(link.href)}
            >
              {link.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ParentNav;
